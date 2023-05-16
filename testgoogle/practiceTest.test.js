const { By, Builder, Browser, until, Key } = require("selenium-webdriver");
//const {Builder} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const service = new chrome.ServiceBuilder('/path/to/chromedriver');
const driver = new Builder().forBrowser('chrome').setChromeService(service).build();


// Build a new driver for each test
beforeEach(async () => {
  driver = await new Builder().forBrowser(Browser.CHROME).build();
});

// Quit a driver after each test
afterEach(async () => {
  await driver.quit();
});

describe("Test the Google homepage", () => {
  test("can search Google for 'Selenium'", async () => {
    // Navigate to google.com
    await driver.get("https://www.google.com/");

    // Locate the search bar and send the search term to it
    await driver.findElement(By.name("q")).sendKeys("selenium", Key.RETURN);
    // Wait until the title of the page changes to include the search term
    await driver.wait(until.titleIs("selenium - Google Search"), 1000);
  });

  test("can search Google for images of puppies", async () => {
 //Navigate to google.com
    await driver.get("https://www.google.com")
  //Find the search bar
  let searchbar = await driver.findElement(By.name('q'))
  //Type in puppies and hit 'enter' or 'return' based on OS
  await searchbar.sendKeys('puppies', Key.ENTER)
  //Wait until title is "puppies - Google Search"
  await driver.wait(until.titleIs('puppies - Google Search'), 1000)
  // Find and click on the images button
  await driver.findElement(By.linkText('Images')).click()
  // Verify that page is Images page
  let currentPage = await driver.wait(until.elementLocated(By.css('span[aria-current="page"]')))
    
  expect(await currentPage.getText()).toBe("Images")

})
 
});
