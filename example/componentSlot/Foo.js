import { h, renderSlots } from '../../lib/guide-mini-vue.esm.js'

export const Foo = {
    name: 'Foo',
    setup () {
        return {}
    },
    render () {
        const foo = h('p', {}, 'foo')
        console.log('this.$slot: ', this.$slots)
        // 渲染单个子节点
        // return h('div', {}, [foo, this.$slots])
        // 渲染多个子节点
        // return h('div', {}, [foo, h('p', {}, this.$slots)])
        // 渲染多个子节点
        // return h('div', {}, [foo, renderSlots(this.$slots)])

        // 命名插槽
        // 1. 获取到要渲染的元素
        // 2. 获取到要渲染的位置
        // return h('div1', {}, [
        //     renderSlots(this.$slots, 'header'),
        //     foo,
        //     renderSlots(this.$slots, 'footer')
        // ])

        const age = 18
        // 作用域插槽
        return h('div', {}, [
            renderSlots(this.$slots, 'header', { age }),
            foo,
            renderSlots(this.$slots, 'footer')
        ])
    }
}