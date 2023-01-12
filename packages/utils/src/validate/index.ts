/**
 * @description:  Set ui mount node
 */
export function getPopupContainer(node?: HTMLElement): HTMLElement {
  return (node?.parentNode as HTMLElement) ?? document.body
}

export function isFunction(val: unknown): val is Function {
  return typeof val === 'function'
}

export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`
}

export function isString(val: unknown): val is string {
  return is(val, 'String')
}

export function isBoolean(val: unknown): val is boolean {
  return is(val, 'Boolean')
}
