
export const toCamelCase = (str) => str.replace(/_(.)/g, (_, c) => c.toUpperCase())

export function objToCamelCase (obj) {
  return Object.entries(obj).reduce((o, [k, v]) => {
    const key = toCamelCase(k)
    o[key] = (v && typeof v === 'object')
      ? objToCamelCase(v)
      : v
    return o
  }, {})
}
