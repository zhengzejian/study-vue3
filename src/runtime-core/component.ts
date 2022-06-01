import { PublicInstanceProxyHandlers } from "./componentPublicInstance"
import { initProps } from './componentProps'
import { shallowReadonly } from "../reactivity/reactive"
import { emit } from "./componentEmit"
import { initSlots } from "./componentSlots"

export function createComponentInstance(vnode) {
    const component = {
        vnode,
        type: vnode.type,
        setupState: {},
        props: {},
        slots: {},
        emit: (event) => { }
    }

    component.emit = emit.bind(null, component) as any

    return component
}

export function setupComponent(instance) {
    initProps(instance, instance.vnode.props)
    initSlots(instance, instance.vnode.children)

    setupStatefulComponent(instance)
}
function setupStatefulComponent(instance) {
    const Component = instance.type
    instance.proxy = new Proxy({ _: instance }, PublicInstanceProxyHandlers)

    const { setup } = Component

    if (setup) {
        setCurrentInstance(instance)
        // function || Object
        const setupResult = setup(shallowReadonly(instance.props), {
            emit: instance.emit
        })

        handleSetupResult(instance, setupResult)
    }
    setCurrentInstance(null)
}

function handleSetupResult(instance, setupResult) {
    // function || Object
    // TODO function

    if (typeof setupResult === 'object') {
        instance.setupState = setupResult
    }

    finishComponentSetup(instance)
}

function finishComponentSetup(instance: any) {
    const Component = instance.type

    if (Component.render) {
        instance.render = Component.render
    }
}

let currentInstance = null

export function getCurrentInstance() {
    return currentInstance
}

export function setCurrentInstance(instance) {
    currentInstance = instance
}