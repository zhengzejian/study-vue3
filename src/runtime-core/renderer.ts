import { isObject } from '../shared'
import { createComponentInstance, setupComponent } from './component'

export function render(vnode, container) {
    //
    patch(vnode, container)
}

function patch(vnode, container) {
    // debugger
    // 判断是不是 element
    // vnode.type 为字符串 则是元素。 为对象 则是 组件
    if (typeof vnode.type === 'string') {
        processElement(vnode, container)
    } else if (isObject(vnode.type)) {
        processComponent(vnode, container)
    }

}

function processElement(vnode, container) {
    mountElement(vnode, container)
}

function mountElement(vnode, container) {
    let { type, props, children } = vnode
    const el = document.createElement(type)

    if (typeof children === 'string') {
        el.textContent = children
    } else if (Array.isArray(children)) {
        // vnode
        mountChildren(vnode, el)
    }

    for (const key in props) {
        const val = props[key]
        el.setAttribute(key, val)
    }

    container.append(el)
}

function mountChildren(vnode, container) {

    vnode.children.forEach(vnode => patch(vnode, container))
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