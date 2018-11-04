export function BaseURL (url: string) {
  return (target: any) => {
    Object.defineProperty(target, '$name', {
      value: url,
      writable: false
    })
  }
}

export function ReadOnly (target, propertyKey: string, descriptor: PropertyDescriptor) {
  descriptor.writable = false
  return descriptor
}

export function Memorize (timeOut: number = 3600000, cache: object = {}) {
  return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
    const f = descriptor.value
    descriptor.value = function () {
      const argStr = JSON.stringify(arguments)
      const arg = arguments
      return new Promise((resolve, reject) => {
        if (!Reflect.has(cache, argStr)) {
          f.apply(target, arg).then(res => {
            cache[argStr] = res
            setTimeout(() => { Reflect.deleteProperty(cache, argStr) }, timeOut)
            resolve(res)
          })
        } else {
          resolve(cache[argStr])
        }
      })
    }
  }
}
