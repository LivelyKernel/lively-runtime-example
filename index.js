var isNodeJs = typeof module !== "undefined" && module.require && typeof process !== "undefined";

if (isNodeJs) module.exports = {};
else window["lively-runtime-example"] = {};
