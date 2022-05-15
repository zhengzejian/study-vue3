import { trackEffects, triggerEffects, isTracking } from './effect'
import { hasChanged, isObject } from '../shared'
import { reactive } from './reactive'

class RefImpl {
    private _value: any
    public dep
    private _rawValue: any
    constructor(value) {
        this._rawValue = value
        // 如果 value 是对象 用 reactive 调用
        this._value = convert(value)
        this.dep = new Set()
    }
    get value() {
        trackRefValue(this)
        return this._value
    }
    set value(newValue) {
        // 设置为同样的值 直接返回 不做处理
        if (hasChanged(newValue, this._rawValue)) {
            this._rawValue = newValue
            this._value = convert(newValue)
            triggerEffects(this.dep)
        }

    }
}

function convert(value) {
    return isObject(value) ? reactive(value) : value
}

function trackRefValue(ref) {
    if (isTracking()) {
        trackEffects(ref.dep)
    }
}

export function ref(value) {
    return new RefImpl(value)
}