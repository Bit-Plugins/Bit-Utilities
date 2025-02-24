const core = require("bit/core");

module.exports = {
    startFunction: function startFunction() {
        // Sends a message to the Bit Core plugin and asks it to run the logging function!
        core.log(0, "Example Plugin", true, "Example Plugin for example stuffs")
    }
};