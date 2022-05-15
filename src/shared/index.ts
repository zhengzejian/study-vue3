export const extend = Object.assign

export const isObject = val => val !== null && typeof val === 'object'

export const hasChanged = (val, newValue) => !Object.is(val, newValue)