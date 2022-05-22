export const extend = Object.assign

export const isObject = val => val !== null && typeof val === 'object'

export const hasChanged = (val, newValue) => !Object.is(val, newValue)

export const hasOwn = (val, key) => Object.prototype.hasOwnProperty.call(val, key)

export const camelize = (str: string) => {
    return str.replace(/-(\w)/g, (_, c: string) => {
        return c ? c.toUpperCase() : ''
    })
}

export const capitalize = (str: string) => {
    return str.charAt(0).toLocaleUpperCase() + str.slice(1)
}

export const toHandlerKey = (str: string) => {
    return str ? 'on' + capitalize(str) : ''
}