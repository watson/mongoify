# mongoify

Converts:

```js
{
  foo: { bar: 1 },
  date: new Date('2014-01-01T00:00:00Z'),
  regex: /foo/i,
  bla: undefined
}
```

To this:

```js
{
  foo: { bar: 1 },
  date: { $date: '2014-01-01T00:00:00Z' },
  regex: { $regex: 'foo', $options: 'i' },
  bla: { $undefined: true }
}
```

[![browser support](https://ci.testling.com/watson/mongoify.png) ](https://ci.testling.com/watson/mongoify)

[![Build status](https://travis-ci.org/watson/mongoify.svg?branch=master)](https://travis-ci.org/watson/mongoify)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

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

```js
var mongoify = require('mongoify');

var obj = { date: new Date('2014-01-01T00:00:00Z') };

mongoify(obj);

console.log(JSON.stringify(obj));
```

## License

MIT
