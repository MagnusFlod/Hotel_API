const { By, Builder, until } = require("selenium-webdriver");
require("chromedriver");

async function test()
{
  let driver = await new Builder().forBrowser("chrome").build();

  try
  {
    // 1. Login
    await driver.get("http://localhost:3000/login");

    await driver.findElement(By.name("username")).sendKeys("sjef");
    await driver.findElement(By.name("password")).sendKeys("Velkommen12");

    const loginBtn = await driver.wait(
      until.elementLocated(By.css('button[type="submit"]')),
      10000
    );
    await loginBtn.click();

    // liten pause for session
    await driver.sleep(1000);

    // 2. Gå til hotels
    await driver.get("http://localhost:3000/hotels");

    // 3. Tell rader før
    const rows = await driver.findElements(By.className("row"));
    console.log("Rows before:", rows.length);

    // 4. Finn siste rad
    const lastRow = rows[rows.length - 1];

    // 5. Klikk delete-knappen i den raden
    const deleteButton = await lastRow.findElement(By.css("button.btn-danger"));
    await deleteButton.click();

    // 6. Vent litt på reload
    await driver.sleep(1000);

    // 7. Tell rader etter
    const rows2 = await driver.findElements(By.className("row"));
    console.log("Rows after:", rows2.length);

    // 8. Sjekk resultat
    if (rows2.length === rows.length - 1)
    {
      console.log("Delete test passed ✅");
    }
    else
    {
      console.log("Delete test failed ❌");
    }

  }
  finally
  {
    await driver.quit();
  }
}

test();