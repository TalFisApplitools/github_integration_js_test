"use strict";

const { Builder, By } = require("selenium-webdriver");
const { Eyes, ClassicRunner, Target, RectangleSize, Configuration, BatchInfo, BrowserType, DeviceName, ScreenOrientation } = require('@applitools/eyes-selenium');


//Main method
describe('NodeJS UFG Test', function() {
    let runner, eyes, driver;

    before(async() => {
        // Create a new chrome web driver
        driver = await new Builder()
            .forBrowser('chrome')
            .build();

        // Create a runner with concurrency of 10
        runner = new ClassicRunner();

        // Create Eyes object with the runner, meaning it'll be a Visual Grid eyes.
        eyes = new Eyes(runner);

        //Initialize the eyes configuration.
        let conf = new Configuration();

        // You can get your api key from the Applitools dashboard
        conf.setApiKey(process.env.APPLITOOLS_API_KEY);

        // create a new batch info instance and set it to the configuration
        // obtain the ID from the environment variables - the name should be specified as null
        let batchId = process.env.APPLITOOLS_BATCH_ID;

        //  set the batch
        conf.setBatch(null, batchId);

        // set the configuration to eyes
        eyes.setConfiguration(conf)

    });

    it('UFG Test', async() => {
        // Navigate the browser to the "ACME" demo app.
        // ⭐️ Note to see visual bugs, run the test using the above URL for the 1st run.
        // but then change the above URL to https://demo.applitools.com/index_v2.html
        // (for the 2nd run)
        await driver.get("https://demo.applitools.com");

        // Call Open on eyes to initialize a test session
        await eyes.open(driver, 'Demo App', 'Ultrafast grid demo', new RectangleSize(800, 600));

        // check the login page with fluent api, see more info here
        // https://applitools.com/docs/topics/sdk/the-eyes-sdk-check-fluent-api.html
        await eyes.check("Login Window", Target.window().fully());

        // This will create a test with two test steps.
        await driver.findElement(By.id("log-in")).click();

        // Check the app page
        await eyes.check("App Window", Target.window().fully());

        // Call Close on eyes to let the server know it should display the results
        await eyes.closeAsync();
    });

    after(async() => {
        // Close the browser.
        await driver.quit();

        // If the test was aborted before eyes.close was called, ends the test as aborted.
        await eyes.abortAsync();

        // we pass false to this method to suppress the exception that is thrown if we
        // find visual differences
        const allTestResults = await runner.getAllTestResults();
        console.log(allTestResults);

    });
});