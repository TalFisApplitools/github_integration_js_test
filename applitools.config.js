module.exports = {
    browser: [
        // Add browsers with different viewports
        { width: 800, height: 600, name: 'chrome' }
    ],

    // set batch name to the configuration
    batchName: null,
    batchId: process.env.APPLITOOLS_BATCH_ID
}