const { alias } = require("react-app-rewire-alias");

module.exports = function override(config) {
  alias({
    "@assets": "src/assets",
    "@components": "src/components",
    "@contexts": "src/contexts",
    "@customHooks": "src/customHooks",
    "@helpers": "src/helpers",
    "@hooks": "src/hooks",
    "@locales": "src/locales",
    "@routes": "src/routes",
    "@pages": "src/pages",
    "@scripts": "src/scripts",
    "@redux": "src/redux",
    "@static": "src/static",
    "@styles": "src/styles",
    "@utils": "src/utils",
    "@validate": "src/validate"
  })(config);

  return config;
};
