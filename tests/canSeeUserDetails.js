const { By, Key, Builder, until } = require("selenium-webdriver");
require("chromedriver");

async function test()
{
  let driver = await new Builder().forBrowser("chrome").build();

  try
  {
    // 1. Gå til login
    await driver.get("http://localhost:3000/login");

    // 2. Finn username
    const usernameField = await driver.wait(
      until.elementLocated(By.name("username")),
      10000
    );
    await usernameField.sendKeys("sjef");

    // 3. Finn password
    const passwordField = await driver.wait(
      until.elementLocated(By.name("password")),
      10000
    );
    await passwordField.sendKeys("Velkommen12");

    console.log("Login info skrevet");

    // 4. Finn submit-knapp
    const submitButton = await driver.wait(
      until.elementLocated(By.css('button[type="submit"]')),
      10000
    );

    await submitButton.click();
    console.log("Klikket login");

    // Gå direkte videre (session er allerede satt)
    await driver.get("http://localhost:3000/users/2");

    // Vent på det du faktisk bryr deg om
    const nameElement = await driver.wait(
    until.elementLocated(By.name("user")),
    10000
    );

    const name = await nameElement.getText();

    console.log("User name is:", name);

  }
  finally
  {
    await driver.quit();
  }
}

test();