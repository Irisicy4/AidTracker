class EventEmitter {
  data = {}

  on(key, callback) {
    if (!this.data[key]) {
      this.data[key] = []
    }
    this.data[key].push(callback)
  }

  emit(key) {
    if (!this.data[key]) {
      console.error(`this ${key} event is not have`)
      return
    }
    const array = this.data[key]
    array.forEach(item => {
      item()
    })
  }
}

export default new EventEmitter()
