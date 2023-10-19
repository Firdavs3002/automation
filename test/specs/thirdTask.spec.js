const { expect } = require("@wdio/globals");

describe("The-Internet Site Functional Tests", () => {
  
  // Existing test cases should be here ...
  // ... [rest of your test cases]

  // 1. Using execute() command to change the style of an element
  it("should change the background color of an element using execute()", async () => {
    await browser.url("https://the-internet.herokuapp.com");
    const header = await $("h1");
    await browser.execute((element) => {
      element.style.backgroundColor = "red";
    }, header);

    const bgColor = await header.getCSSProperty("background-color");
    expect(bgColor.parsed.hex).toEqual("#ff0000");
  });
  it("should scroll the footer into view using execute()", async () => {
    await browser.url("https://the-internet.herokuapp.com/large");
    const footer = await $("#page-footer"); // assuming the footer has an id of "page-footer"
    
    await browser.execute((element) => {
      element.scrollIntoView();
    }, footer);
    
    const isFooterInView = await footer.isDisplayedInViewport();
    expect(isFooterInView).toEqual(true);
});

  // 2. Using waitUntil() command to wait for a condition to be true
  it("should wait until the title contains 'The Internet'", async () => {
    await browser.url("https://the-internet.herokuapp.com");
    await browser.waitUntil(async () => {
      return (await browser.getTitle()) === "The Internet";
    }, {
      timeout: 5000,
      timeoutMsg: "Expected title to be 'The Internet' after 5s"
    });
    const title = await browser.getTitle();
    expect(title).toEqual("The Internet");
  });

  // 3. Using browser actions to navigate back and forth
  it("should navigate back and forth using browser actions", async () => {
    await browser.url("https://the-internet.herokuapp.com");
    await browser.url("https://the-internet.herokuapp.com/login");
    await browser.back();
    const title = await browser.getTitle();
    expect(title).toEqual("The Internet");
    await browser.forward();
    const loginPageHeader = await $("h2").getText();
    expect(loginPageHeader).toEqual("Login Page");
  });

  it("should wait until the error message appears after a failed login", async () => {
    await browser.url("https://the-internet.herokuapp.com/login");

    const loginButton = await $("#login button");  // assuming the login button's selector
    const errorMessage = await $("#flash");  // usually, the error messages on this site have an id of "flash"

    await loginButton.click();

    await browser.waitUntil(async () => {
        return (await errorMessage.isDisplayed());
    }, {
        timeout: 5000,
        timeoutMsg: "Expected error message to be displayed after 5s"
    });

    expect(await errorMessage.isDisplayed()).toEqual(true);
  });

  // BONUS: Working with cookies
  it("should set, retrieve, and delete a cookie", async () => {
    await browser.url("https://the-internet.herokuapp.com");
    const cookieName = "customCookie";
    const cookieValue = "webdriverioTest";

    // Set a cookie
    await browser.setCookies([{ name: cookieName, value: cookieValue }]);

    // Retrieve the cookie
    const cookie = await browser.getCookies([cookieName]);
    expect(cookie[0].value).toEqual(cookieValue);

    // Delete the cookie
    await browser.deleteCookies([cookieName]);
    const deletedCookie = await browser.getCookies([cookieName]);
    expect(deletedCookie.length).toEqual(0);
  });

  it("should wait until the text content of an element changes to 'Hello World!'", async () => {
    await browser.url("https://the-internet.herokuapp.com/dynamic_loading/2");
    const startButton = await $("#start button");
    await startButton.click();
    const resultElement = await $("#finish h4");
    await browser.waitUntil(async () => {
        return (await resultElement.getText()) === "Hello World!";
    }, {
      timeout: 10000,
      timeoutMsg: "Expected text to change to 'Hello World!' within 10 seconds"
    });
    expect(await resultElement.getText()).toEqual("Hello World!");
  });
});
