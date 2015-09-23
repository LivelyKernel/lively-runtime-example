/*global beforeEach, afterEach, describe, it*/

var expect = this.expect || module.require('expect.js');

describe('lively-runtime-example', function() {

  it("is loaded", function() {
    expect(window).to.have.property('lively-runtime-example');
  });

  it("has foo", function() {
    expect(window['lively-runtime-example'])
      .to.have.property('foo');
  });

  it("has bar", function() {
    expect(window['lively-runtime-example'].bar)
      .to.equal(23);
  });
});
