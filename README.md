# mongoify

Converts:

```javascript
{
  foo: { bar: 1 },
  date: new Date('2014-01-01T00:00:00Z'),
  regex: /foo/i,
  bla: undefined
}
```

To this:

```javascript
{
  foo: { bar: 1 },
  date: { $date: '2014-01-01T00:00:00Z' },
  regex: { $regex: 'foo', $options: 'i' },
  bla: { $undefined: true }
}
```

[![browser support](https://ci.testling.com/watson/mongoify.png) ](https://ci.testling.com/watson/mongoify)

[![build status](https://secure.travis-ci.org/watson/mongoify.png)](http://travis-ci.org/watson/mongoify)

## What?

This is called [MongoDB Extended
JSON](http://docs.mongodb.org/manual/reference/mongodb-extended-json/).

## Why?

So that you can `JSON.stringify` the object for easy storage or
transport.

## Installation

```
npm install mongoify
```

## Usage

```javascript
var mongoify = require('mongoify');

var obj = { date: new Date('2014-01-01T00:00:00Z') };

mongoify(obj);

console.log(JSON.stringify(obj));
```

## License

MIT
