const { expect } = require("@wdio/globals");

// Extend the Element class to include custom click
browser.addCommand(
  "customClick",
  async function () {
    await this.waitForDisplayed({ timeout: 5000 });
    await this.click();
  },
  true
);

describe("The-Internet Site Functional Tests", () => {
  it("should validate homepage title", async () => {
    await browser.url("https://the-internet.herokuapp.com");
    const title = await browser.getTitle();
    expect(title).toEqual("The Internet");
  });

  it("should select an option from the dropdown", async () => {
    await browser.url("https://the-internet.herokuapp.com/dropdown");
    const dropdown = await $("#dropdown");
    await dropdown.selectByVisibleText("Option 2");
    const selectedOption = await dropdown.getValue();
    expect(selectedOption).toEqual("2");
  });

  it("should check the checkbox", async () => {
    await browser.url("https://the-internet.herokuapp.com/checkboxes");
    const firstCheckbox = await $("#checkboxes > input:nth-child(1)");
    await firstCheckbox.customClick();
    expect(await firstCheckbox.isSelected()).toEqual(true);
  });

  it("should login with valid credentials", async () => {
    await browser.url("https://the-internet.herokuapp.com/login");
    const usernameField = await $("#username");
    const passwordField = await $("#password");
    const loginButton = await $(".radius");

    await usernameField.setValue("tomsmith");
    await passwordField.setValue("SuperSecretPassword!");
    await loginButton.customClick();

    const flashMessage = await $("#flash").getText();
    expect(flashMessage).toContain("You logged into a secure area!");
  });

  it("should show error with invalid credentials", async () => {
    await browser.url("https://the-internet.herokuapp.com/login");
    const usernameField = await $("#username");
    const passwordField = await $("#password");
    const loginButton = await $(".radius");

    await usernameField.setValue("invalidUser");
    await passwordField.setValue("invalidPass");
    await loginButton.customClick();

    const errorMessage = await $("#flash").getText();
    expect(errorMessage).toContain("Your username is invalid!");
  });

  it("should logout from the application", async () => {
    await browser.url("https://the-internet.herokuapp.com/login");
    const usernameField = await $("#username");
    const passwordField = await $("#password");
    const loginButton = await $(".radius");
    const logoutButton = await $(".button.secondary.radius");

    await usernameField.setValue("tomsmith");
    await passwordField.setValue("SuperSecretPassword!");
    await loginButton.customClick();
    await logoutButton.customClick();

    const logoutMessage = await $("#flash").getText();
    expect(logoutMessage).toContain("You logged out of the secure area!");
  });

  it("should redirect to forgot password page", async () => {
    await browser.url("https://the-internet.herokuapp.com/forgot_password");
    const header = await $("h2").getText();
    expect(header).toEqual("Forgot Password");
  });

  it("should infinitely scroll and load new paragraphs", async () => {
    await browser.url("https://the-internet.herokuapp.com/infinite_scroll");
    
    // Get count of paragraphs initially present
    const initialParagraphs = await $$('.jscroll-added');
    const initialCount = initialParagraphs.length;

    // Scroll five times
    for (let i = 0; i < 5; i++) {
        await browser.execute("window.scrollBy(0, document.body.scrollHeight)");
        await browser.pause(2000); // Increase wait time
    }

    const finalParagraphs = await $$('.jscroll-added');
    const finalCount = finalParagraphs.length;

    // Assert that new paragraphs are loaded after scrolling
    expect(finalCount).toBeGreaterThan(initialCount);
});


  it("should drag and drop", async () => {
    await browser.url("https://the-internet.herokuapp.com/drag_and_drop");
    const source = await $("#column-a");
    const target = await $("#column-b");

    await source.dragAndDrop(target);

    const headerA = await $("#column-a header").getText();
    expect(headerA).toEqual("B");
  });

  it("should open a new window and validate its title", async () => {
    await browser.url("https://the-internet.herokuapp.com/windows");
    const clickHereLink = await $("=Click Here");

    await clickHereLink.customClick();

    const allHandles = await browser.getWindowHandles();
    await browser.switchToWindow(allHandles[1]);

    const title = await browser.getTitle();
    expect(title).toEqual("New Window");
  });
});
