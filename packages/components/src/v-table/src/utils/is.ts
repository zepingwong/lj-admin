export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`
}
export function isFunction(val: unknown): val is Function {
  return typeof val === 'function'
}
export function isString(val: unknown): val is string {
  return is(val, 'String')
}
