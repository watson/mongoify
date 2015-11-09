'use strict'

var date = function (val) {
  return { $date: val.toISOString() }
}

var regex = function (val) {
  var options = ''
  if (val.global)     options += 'g'
  if (val.ignoreCase) options += 'i'
  if (val.multiline)  options += 'm'
  if (val.sticky)     options += 'y'
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
    if (val instanceof Date)        obj[key] = date(val)
    else if (val instanceof RegExp) obj[key] = regex(val)
    else if (val === undefined)     obj[key] = undef()
    else if (typeof val === 'object') traverse(val)
  }
}
