/**
* Creates a final dependency preset to be used
* in the host/mini-apps by doing the following:
* - adds depenendencies from dependencies.json and devDependencies.j
son
* - adds the SDK as a dev dependency
* - adds the `super-app` as a capability
*/
const addSdkCapabilities = (dependencies, devDependencies) => {
    const path = require("path");
    const sdkPackagePath = path.resolve(__dirname,"..", "package.json");
    const sdkPackageJson = require(sdkPackagePath);

    const profile = {
        ...dependencies,
        ...devDependencies,
        "@emilioborjas/super-app-showcase-sdk": {
            name: "@emilioborjas/super-app-showcase-sdk",
            version: sdkPackageJson.version,
            devOnly: true,
        },
    };

    return Object.assign(profile, {
        "super-app": {
        name: "#meta",
        apabilities: Object.keys(profile),
        },
    });
};

module.exports = {
    main: addSdkCapabilities(
        require("./dependencies.json"),
        require("./devDependencies.json")
    ),
};