;(function(exports) {


// Note that we can use lively.lang in here b/c lively-runtime injected it
var arr = lively.lang.arr,
    num = lively.lang.num;

// just some fun...
var someNumbers = lively.lang.arr.batchify(
  lively.lang.arr.range(0, 100),
  function(batch) {
    return batch.length == 1
        || num.between(num.average(batch), 30, 50);
  });

exports.foo = someNumbers;

})(typeof module !== "undefined" && module.require && typeof process !== "undefined" ?
  require('./index') : // when we are in nodejs
  window["lively-runtime-example"]);
