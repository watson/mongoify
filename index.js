'use strict'

var binary = function (val) {
  return {
    $binary: val.buffer.toString('base64'),
    $type: val.sub_type.toString(16)
  }
}

var timestamp = function (val) {
  return { $timestamp: {
    $t: val.low_,
    $i: val.high_
  } }
}

var oid = function (val) {
  return { $oid: val.toString() }
}

var dbref = function (val) {
  return {
    $ref: val.namespace,
    $id: val.oid.toString()
  }
}

var minkey = function (val) {
  return { $minKey: 1 }
}

var maxkey = function (val) {
  return { $maxKey: 1 }
}

var long = function (val) {
  return { $numberLong: val.toString() }
}

var date = function (val) {
  return { $date: val.toISOString() }
}

var regex = function (val) {
  var options = ''
  if (val.global) options += 'g'
  if (val.ignoreCase) options += 'i'
  if (val.multiline) options += 'm'
  if (val.sticky) options += 'y'
  return { $regex: val.source, $options: options }
}

var undef = function () {
  return { $undefined: true }
}

var traverse = module.exports = function (obj) {
  var key, val
  for (key in obj) {
    if (!obj.hasOwnProperty(key)) continue
    val = obj[key]
    var bsontype = val && val._bsontype
    if (val instanceof Date) obj[key] = date(val)
    else if (val instanceof RegExp) obj[key] = regex(val)
    else if (val === undefined) obj[key] = undef()
    else if (bsontype) {
      switch (bsontype) {
        case 'Binary': obj[key] = binary(val); break
        case 'Timestamp': obj[key] = timestamp(val); break
        case 'ObjectID': obj[key] = oid(val); break
        case 'DBRef': obj[key] = dbref(val); break
        case 'MinKey': obj[key] = minkey(val); break
        case 'MaxKey': obj[key] = maxkey(val); break
        case 'Long': obj[key] = long(val); break
      }
    } else if (typeof val === 'object') traverse(val)
  }
}
