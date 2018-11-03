export const orderTypes = [{ id: '1', name: '普通' }, { id: '2', name: '午餐' }, { id: '3', name: '晚餐' }]

export const orderTypeMap = new Proxy(orderTypes, {
  get (target, prop) {
    const item = target.find(_ => _.id === prop)
    if (item) return item.name
    return item[prop]
  }
})