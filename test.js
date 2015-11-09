'use strict'

var assert = require('assert')
var bson = require('bson')
var mongo2json = require('./')

var date = new Date()

var cases = [
  [ {}, {} ],
  [ [{}], [{}] ],
  [ { foo: bson.Binary('foo') }, { foo: { $binary: 'Zm9v', $type: 0 } } ],
  [ { foo: bson.Timestamp() }, { foo: { $timestamp: { $t: 0, $i: 0 } } } ],
  [ { foo: bson.ObjectId('000000000000000000000000') }, { foo: { $oid: '000000000000000000000000' } } ],
  [ { foo: bson.DBRef('foo', 'bar') }, { foo: { $ref: 'foo', $id: 'bar' } } ],
  [ { foo: bson.MinKey() }, { foo: { $minKey: 1 } } ],
  [ { foo: bson.MaxKey() }, { foo: { $maxKey: 1 } } ],
  [ { foo: bson.Long(0) }, { foo: { $numberLong: 0 } } ],
  [ { foo: 1, bar: true, baz: [1, 2, 3] }, { foo: 1, bar: true, baz: [1, 2, 3] } ],
  [ { foo: date }, { foo: { $date: date.toISOString() } } ],
  [ { foo: undefined }, { foo: { $undefined: true } } ],
  [ { foo: /foo/gi }, { foo: { $regex: 'foo', $options: 'gi' } } ],
  [
    { foo: { bar: undefined }, bar: { date: date }, baz: { pattern: /foo/gi } },
    { foo: { bar: { $undefined: true } }, bar: { date: { $date: date.toISOString() } }, baz: { pattern: { $regex: 'foo', $options: 'gi' } } }
  ],
  [ [{ foo: 1 }, { bar: undefined }], [{ foo: 1 }, { bar: { $undefined: true } }] ]
]

assert(typeof mongo2json === 'function', 'The module should expose a function')

cases.forEach(function (testCase) {
  mongo2json(testCase[0])
  assert.deepEqual(testCase[0], testCase[1])
})
