'use strict';

var test = require('tape');
var vm = require('vm');

test('htmlescape', function(t) {

  var htmlescape = require('../');

  t.test('with angle brackets should escape', function(t) {
    var evilObj = {evil: '<script></script>'};
    t.equal(htmlescape(evilObj), '{"evil":"\\u003cscript\\u003e\\u003c/script\\u003e"}');
    t.end();
  });

  t.test('with angle brackets should parse back', function(t) {
    var evilObj = {evil: '<script></script>'};
    t.looseEqual(JSON.parse(htmlescape(evilObj)), evilObj);
    t.end();
  });

  t.test('with ampersands should escape', function(t) {
    var evilObj = {evil: '&'};
    t.equal(htmlescape(evilObj), '{"evil":"\\u0026"}');
    t.end();
  });

  t.test('with ampersands should parse back', function(t) {
    var evilObj = {evil: '&'};
    t.looseEqual(JSON.parse(htmlescape(evilObj)), evilObj);
    t.end();
  });

  t.test('with "LINE SEPARATOR" and "PARAGRAPH SEPARATOR" should escape', function(t) {
    var evilObj = {evil: '\u2028\u2029'};
    t.equal(htmlescape(evilObj), '{"evil":"\\u2028\\u2029"}');
    t.end();
  });

  t.test('with "LINE SEPARATOR" and "PARAGRAPH SEPARATOR" should parse back', function(t) {
    var evilObj = {evil: '\u2028\u2029'};
    t.looseEqual(JSON.parse(htmlescape(evilObj)), evilObj);
    t.end();
  });

  t.test('escaped line terminators should work', function(t) {
    t.doesNotThrow(function() {
      vm.runInNewContext('(' + htmlescape({evil: '\u2028\u2029'}) + ')');
    });
    t.end();
  });

  t.test('unescaped line terminators should not work', function(t) {
    t.throws(function() {
      vm.runInNewContext('(' + JSON.stringify({evil: '\u2028\u2029'}) + ')');
    });
    t.end();
  });

  t.test('sanitized terminators should work', function(t) {
    t.doesNotThrow(function() {
      vm.runInNewContext(htmlescape.sanitize('("\u2028\u2029")'));
    });
    t.end();
  });

  t.test('unsanitized terminators should not work', function(t) {
    t.throws(function() {
      vm.runInNewContext('("\u2028\u2029")');
    });
    t.end();
  });

});
