class Store {
  constructor(options) {
    let { state, mutations } = options
    this._vm = state
    this._mutations = mutations

  }

  get state() {
    return this._vm
  }

  commit(type, payload) {
    const entry = this._vm[type]
    if(!entry) return
    entry(this.state, payload)
  }

}

