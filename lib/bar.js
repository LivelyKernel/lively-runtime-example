;(function(exports) {

exports.bar = 23;

})(typeof module !== "undefined" && module.require && typeof process !== "undefined" ?
  require('./index') : // when we are in nodejs
  window["lively-runtime-example"]);
