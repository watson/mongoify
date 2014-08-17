'use strict';

var assert = require('assert');
var mongo2json = require('./');

var date = new Date();

var cases = [
  [ {}, {} ],
  [ [{}], [{}] ],
  [ { foo: 1, bar: true, baz: [1, 2, 3] }, { foo: 1, bar: true, baz: [1, 2, 3] } ],
  [ { foo: date }, { foo: { $date: date.toISOString() } } ],
  [ { foo: undefined }, { foo: { $undefined: true } } ],
  [ { foo: /foo/gi }, { foo: { $regex: 'foo', $options: 'gi' } } ],
  [
    { foo: { bar: undefined }, bar: { date: date }, baz: { pattern: /foo/gi } },
    { foo: { bar: { $undefined: true } }, bar: { date: { $date: date.toISOString() } }, baz: { pattern: { $regex: 'foo', $options: 'gi' } } }
  ],
  [ [{ foo: 1 }, { bar: undefined }], [{ foo: 1 }, { bar: { $undefined: true } }] ]
];

assert(typeof mongo2json === 'function', 'The module should expose a function');

cases.forEach(function (testCase) {
  mongo2json(testCase[0]);
  assert.deepEqual(testCase[0], testCase[1]);
});
