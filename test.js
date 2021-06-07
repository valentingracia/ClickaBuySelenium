const { Builder, By, Key, until, Capabilities } = require("selenium-webdriver");
const addContext = require("mochawesome/addContext");
const util = require("util");
const fsp = require("fs").promises;
const assert = require("assert");
/* const {describe,it} = require('selenium-webdriver/testing') */

const caps = new Capabilities();
caps.setPageLoadStrategy("eager");

async function test() {
  console.log("waiting keypress..");
  await waitingKeypress();
  console.log("good job!");
}

function miTest() {
  describe("ClickaBuyWeb Selenium Test *FILTERS*", function () {
    this.timeout(80000);

    it("First Test: Filter located @ Home 🏠 in search input place a ('t character') give as results something different than *No products*, wich means that the website is reaching the data source", async () => {
      let webDriver = new Builder().forBrowser("chrome").build();
      webDriver.manage().window().maximize();
      await webDriver.get("http://clickabuyapp.herokuapp.com/");
      /*  await webDriver.sleep(3000); */

      const searchInput = await webDriver.findElement(By.className("filtroHome")).sendKeys("t");
      await webDriver.sleep(5000);
      const searchInputButton = await webDriver
        .findElement(By.css("#root > div.contenedorHome > header > div.contenedorSearch > div.contenedorFiltro > a"))
        .click();
      /* Codigo para preloaders, esto tiene 3 parametros el elemento, el tiempo maximo de espera y ... */
      webDriver.wait(until.elementLocated(By.className("containerCards")));

      /* Codigo para preloaders */
      const texto = await webDriver.findElement(By.className("containerCards")).getText();
      assert.notStrictEqual(texto, "No products");

      /* console.log("cadena", cadena); */
      webDriver.takeScreenshot().then(function (image, err) {
        require("fs").writeFile("ScreenshootTest1.png", image, "base64", function (err) {
          console.log(err);
        });
      });
      /*   webDriver.quit(); */
    }),
      /*2 Test*/
      it("Second Test: Navigate into a store page and set filter at the top with a 't' character and then in the ratings stars filter, pick five ⭐ stars, and look for no coincidences with string (no product), if no product is found this test will be rejected", async () => {
        let webDriver = new Builder().forBrowser("chrome").build();
        webDriver.manage().window().maximize();
        await webDriver.get("https://clickabuyapp.herokuapp.com/");

        /* Codigo para preloaders, esto tiene 3 parametros el elemento, el tiempo maximo de espera y ... */
        await webDriver.sleep(10000);
        /* Navegacion1 */
        webDriver.wait(until.elementLocated(By.id("dropdown-basic")));
        const botonCategry = await webDriver.findElement(By.id("dropdown-basic")).click();

        this.timeout(40000);
        /*  console.log("transicion1"); */
        /* Navegacion2 */

        webDriver.wait(until.elementLocated(By.className("nameCategory")));
        const sportsBoton = await webDriver.findElement(By.className("nameCategory")).click();
        await webDriver.sleep(5000);
        /*    console.log("transicion2"); */

        /* Navegacion3 */
        webDriver.wait(
          until.elementLocated(
            By.css(
              "#root > div.categoryContainer > div.categoryStoresContainer > div > a:nth-child(1) > div > span.nameStoresCards"
            )
          )
        );
        const sportsBoton2 = await webDriver
          .findElement(
            By.css(
              "#root > div.categoryContainer > div.categoryStoresContainer > div > a:nth-child(1) > div > span.nameStoresCards"
            )
          )
          .click();

        await webDriver.sleep(5000);

        /* filtro1 geneal*/
        const filtroStore = await webDriver.findElement(By.className("inputSearchStore")).sendKeys("t");

        /* filtro2 estrellas*/
        await webDriver.sleep(5000);
        const filtroStar = await webDriver.findElement(By.id("Z")).click();
        await webDriver.sleep(10000);
        webDriver.takeScreenshot().then(function (image, err) {
          require("fs").writeFile("ScreenshootTest2.png", image, "base64", function (err) {
            /*  console.log(err); */
          });
        });

        const texto = await (
          await webDriver.findElement(
            By.css("#root > div.contenedorStore > div.buscador > div > div.containerCards > div > h2")
          )
        ).getText();

        /*  console.log("soy el text, del test 2", texto); */
        assert.notStrictEqual(texto, "No products");

        /* console.log("cadena", cadena); */
        /*    webDriver.quit()
         */
      });
  });
}

miTest();
