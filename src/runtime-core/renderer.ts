import { createComponentInstance, setupComponent } from './component'

export function render(vnode, container) {
    //
    patch(vnode, container)
}

function patch(vnode, container) {
    // 判断是不是 element
    // processElement()

    processComponent(vnode, container)
}

function processComponent(vnode, container) {
    mountComponent(vnode, container)
}

function mountComponent(vnode, container) {
    const instance = createComponentInstance(vnode)
    setupComponent(instance)

    setupRenderEffect(instance, container)
}

function setupRenderEffect(instance: any, container) {
    const subTree = instance.render()

    // vnode -> patch
    // vnode -> element -> mountElement

    patch(subTree, container)
}