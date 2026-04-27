const {By, until, Builder} = require("selenium-webdriver");
require("chromedriver");

async function test()
{
    let driver = await new Builder().forBrowser("chrome").build();

    try
    {
        // 🔥 1. Login først
        await driver.get("http://localhost:3000/login");

        await driver.findElement(By.name("username")).sendKeys("sjef");
        await driver.findElement(By.name("password")).sendKeys("Velkommen12");

        const loginBtn = await driver.wait(
            until.elementLocated(By.css('button[type="submit"]')),
            10000
        );

        await loginBtn.click();

        await driver.sleep(1000);

        // 🔥 2. Gå til rooms
        await driver.get("http://localhost:3000/rooms");

        // 🔥 3. Tell før
        const rows = await driver.findElements(By.className("row"));
        console.log("Before:", rows.length);

        // 🔥 4. Klikk add room
        await driver.findElement(By.id("addRoom")).click();

        // 🔥 5. Alerts
        await driver.wait(until.alertIsPresent());

        let alert1 = await driver.switchTo().alert();
        await alert1.sendKeys("4");
        await alert1.accept();

        let alert2 = await driver.switchTo().alert();
        await alert2.sendKeys("300");
        await alert2.accept();

        let alert3 = await driver.switchTo().alert();
        await alert3.sendKeys("5");
        await alert3.accept();

        await driver.wait(until.alertIsPresent(), 5000);
        let successAlert = await driver.switchTo().alert();
        await successAlert.accept();

        // 🔥 6. Reload
        await driver.wait(async () =>
        {
            const newRows = await driver.findElements(By.className("row"));
            return newRows.length > rows.length;
        }, 10000);

        // 🔥 7. Tell etter
        const rows2 = await driver.findElements(By.className("row"));
        console.log("After:", rows2.length);

    }
    finally
    {
        await driver.quit();
    }
}

test();