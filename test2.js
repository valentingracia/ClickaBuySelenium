const { Builder, By, Key, until } = require("selenium-webdriver");
const util = require("util");
const fsp = require("fs").promises;
const assert = require("assert");

function miTest() {
  describe("ClickaBuyWeb Selenium Test *FILTERS*", function () {
    this.timeout(80000);
    it("First Test: Filter located @ Home 🏠 in default search (empty stringtext) give as results something different than *No products*, wich means that the website is reaching the source data", async () => {
      let webDriver = new Builder().forBrowser("chrome").build();
      webDriver.manage().window().maximize();
      await webDriver.get("http://clickabuyapp.herokuapp.com/");
      /*  await webDriver.sleep(3000); */
      const searchInputButton = await webDriver
        .findElement(By.css("#root > div.contenedorHome > header > div.contenedorSearch > div.contenedorFiltro > a"))
        .click();
      /* Codigo para preloaders, esto tiene 3 parametros el elemento, el tiempo maximo de espera y ... */
      webDriver.wait(until.elementLocated(By.className("containerCards")));

      /* Codigo para preloaders */
      const texto = await webDriver.findElement(By.className("containerCards")).getText();
      assert.notStrictEqual(texto, "No products");

      console.log("T E X T O ****", texto);

      /* console.log("cadena", cadena); */
      webDriver.takeScreenshot().then(function (image, err) {
        require("fs").writeFile("ScreenshootTest1.png", image, "base64", function (err) {
          console.log(err);
        });
      });
      /*    webDriver.quit()
       */
    });
  });
}

miTest();
