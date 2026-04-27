const {By, Key, until, Builder} = require("selenium-webdriver");
require("chromedriver");

async function test()
{
    let driver = await new Builder().forBrowser("chrome").build();

    try
    {
        await driver.get("http://localhost:3000/login");

        await driver.findElement(By.name("username")).sendKeys("sjef");
        await driver.findElement(By.name("password")).sendKeys("Velkommen12");
        const loginButton = await driver.wait
        (
            until.elementLocated(By.css('button[type="submit"]')),
            10000
        );

        await loginButton.click();

        await driver.sleep(1000);

        await driver.get("http://localhost:3000/hotels");
        
        const rows = await driver.findElements(By.className("row"));
        console.log(rows.length);

        await driver.findElement(By.name("addHotel")).click();

        await driver.wait(until.alertIsPresent());

        let alert1 = await driver.switchTo().alert();

        await alert1.sendKeys("Clarion Hotel");

        await alert1.accept();

        let alert2 = await driver.switchTo().alert();

        await alert2.sendKeys("Gardermoen");

        await alert2.accept();

        await driver.get("http://localhost:3000/hotels");
        const rows2 = await driver.findElements(By.className("row"));
        console.log(rows2.length);
    }
    finally
    {
        await driver.quit();
    }
}

test()