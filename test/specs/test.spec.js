const { expect } = require("@wdio/globals");

describe("The-Internet Site Functional Tests", () => {
  
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
    const footer = await $("#page-footer"); 
    await browser.execute((element) => {
      element.scrollIntoView();
    }, footer);
    const isFooterInView = await footer.isDisplayedInViewport();
    expect(isFooterInView).toEqual(true);
  });

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
    const loginButton = await $("#login button");  
    const errorMessage = await $("#flash");  
    await loginButton.click();
    await browser.waitUntil(async () => {
        return (await errorMessage.isDisplayed());
    }, {
        timeout: 5000,
        timeoutMsg: "Expected error message to be displayed after 5s"
    });
    expect(await errorMessage.isDisplayed()).toEqual(true);
  });

  it("should set, retrieve, and delete a cookie", async () => {
    await browser.url("https://the-internet.herokuapp.com");
    const cookieName = "customCookie";
    const cookieValue = "webdriverioTest";
    await browser.setCookies([{ name: cookieName, value: cookieValue }]);
    const cookie = await browser.getCookies([cookieName]);
    expect(cookie[0].value).toEqual(cookieValue);
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

  it("should switch between windows or tabs", async () => {
    await browser.url("https://the-internet.herokuapp.com/windows");
    const clickHereLink = await $("#content a");
    await clickHereLink.click();
    const allWindows = await browser.getWindowHandles();
    await browser.switchToWindow(allWindows[1]);
    const newWindowHeader = await $("h3");
    expect(await newWindowHeader.getText()).toEqual("New Window");
    await browser.closeWindow();
    await browser.switchToWindow(allWindows[0]);
    const originalWindowHeader = await $("h3");
    expect(await originalWindowHeader.getText()).toEqual("Opening a new window");
  });

  it("should drag and drop an element", async () => {
    await browser.url("https://the-internet.herokuapp.com/drag_and_drop");
    const boxA = await $("#column-a");
    const boxB = await $("#column-b");
    await boxA.dragAndDrop(boxB);
    expect(await boxA.getText()).toEqual("B");
    expect(await boxB.getText()).toEqual("A");
  });

  it("should accept the JavaScript alert", async () => {
    await browser.url("https://the-internet.herokuapp.com/javascript_alerts");
    const jsAlertButton = await $("button[onclick='jsAlert()']");
    await jsAlertButton.click();
    await browser.acceptAlert();
    const result = await $("#result");
    expect(await result.getText()).toEqual("You successfully clicked an alert");
  });

});