import { isObject } from '../shared'
import { ShapeFlags } from '../shared/ShapeFlags'
import { createComponentInstance, setupComponent } from './component'
import { Fragment, Text } from './vnode'

export function render(vnode, container) {
    //
    patch(vnode, container, null)
}

function patch(vnode, container, parentComponent) {
    // debugger
    // 判断是不是 element
    // vnode.type 为字符串 则是元素。 为对象 则是 组件
    const { type, shapeFlag } = vnode

    // Fragment -> 只渲染 children

    switch (type) {
        case Fragment:
            processFragment(vnode, container, parentComponent)
            break;
        case Text:
            processText(vnode, container)
            break;
        default:
            if (shapeFlag & ShapeFlags.ELEMENT) {
                processElement(vnode, container, parentComponent)
            } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
                processComponent(vnode, container, parentComponent)
            }
            break;
    }

}

function processFragment(vnode, container, parentComponent) {
    mountChildren(vnode, container, parentComponent)
}

function processText(vnode, container) {
    const { children } = vnode
    const textNode = (vnode.el = document.createTextNode(children))
    container.append(textNode)
}

function processElement(vnode, container, parentComponent) {
    mountElement(vnode, container, parentComponent)
}

function mountElement(vnode, container, parentComponent) {
    let { type, props, children, shapeFlag } = vnode
    const el = (vnode.el = document.createElement(type))

    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
        el.textContent = children
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        // vnode
        mountChildren(vnode, el, parentComponent)
    }
    let isOn = (str: string) => /^on[A-Z]/.test(str)
    for (const key in props) {
        const val = props[key]
        if (isOn(key)) {
            let event = key.slice(2).toLocaleLowerCase()
            el.addEventListener(event, val)
        } else {
            el.setAttribute(key, val)
        }
    }

    container.append(el)
}

function mountChildren(vnode, container, parentComponent) {

    vnode.children.forEach(vnode => patch(vnode, container, parentComponent))
}

function processComponent(vnode, container, parentComponent) {
    mountComponent(vnode, container, parentComponent)
}

function mountComponent(initialVNode, container, parentComponent) {
    const instance = createComponentInstance(initialVNode, parentComponent)
    setupComponent(instance)

    setupRenderEffect(instance, initialVNode, container)
}

function setupRenderEffect(instance: any, initialVNode, container) {
    const { proxy } = instance
    const subTree = instance.render.call(proxy)

    // vnode -> patch
    // vnode -> element -> mountElement

    patch(subTree, container, instance)
    initialVNode.el = subTree.el
}