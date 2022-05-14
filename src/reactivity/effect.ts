import { extend } from '../shared'

let activeEffect
let shouldTrack
class ReactiveEffect {
    deps = []
    active = true // 判断是否已经被 stop 过了
    onStop?: () => void
    constructor(public fn, public scheduler?) {

    }
    run() {
        if (!this.active) {
            // 被 stop 了会走到这里，然后调用完后就跳出，不会再被 track
            return this.fn()
        }
        activeEffect = this
        // 只有通过 effect 调用的，才会被 track 收集
        shouldTrack = true

        const result = this.fn()
        // reset 
        shouldTrack = false

        return result
    }
    stop() {
        if (this.active) {
            cleanupEffect(this)
            this.onStop && this.onStop()
            this.active = false
        }
    }
}

function cleanupEffect(effect) {
    effect.deps.forEach((dep: any) => {
        dep.delete(effect)
    });
    effect.deps.length = 0
}

const targetMap = new Map()
export function track(target, key) {
    if (!isTracking()) return
    // target -> key -> dep
    let depsMap = targetMap.get(target)
    if (!depsMap) {
        depsMap = new Map()
        targetMap.set(target, depsMap)
    }

    let dep = depsMap.get(key)
    if (!dep) {
        dep = new Set()
        depsMap.set(key, dep)
    }
    // 被收集过了 就直接返回 不做重复收集
    if (dep.has(activeEffect)) return
    dep.add(activeEffect);
    activeEffect.deps.push(dep)
}

function isTracking() {
    return shouldTrack && activeEffect !== undefined
}

export function trigger(target, key) {
    let depsMap = targetMap.get(target)
    let dep = depsMap.get(key)

    for (const effect of dep) {
        if (effect.scheduler) {
            effect.scheduler()
        } else {
            effect.run()
        }
    }
}

export function effect(fn, options: any = {}) {
    const _effect = new ReactiveEffect(fn, options.scheduler)
    extend(_effect, options)
    _effect.run()

    const runner: any = _effect.run.bind(_effect)
    runner.effect = _effect
    return runner
}

export function stop(runner) {
    runner.effect.stop()
}