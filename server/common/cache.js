var clone = require('lodash/lang/clone')

export default class Cache {

  constructor() {
    this._cache = {}
  }

  at(key) {
    if (this._cache[key])
      return clone(this._cache[key])
  }

  put(key, val) {
    this._cache[key] = val
    return this
  }

}
