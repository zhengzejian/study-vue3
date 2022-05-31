import { h, createTextVNode } from '../../lib/guide-mini-vue.esm.js'
import { Foo } from './foo.js'

export const App = {
    name: 'App',
    render () {
        const app = h('div', {}, 'App')
        // const foo = h(Foo, {}, [h('p', {}, 'slots1'), h('p', {}, 'slots2')])

        // 具名插槽
        // object key
        const foo = h(Foo, {}, {
            // scopedSlot
            // header: ({ age }) => h('p', {}, 'header' + age),
            header: ({ age }) => [h('p', {}, 'header' + age), createTextVNode('你好啊')],
            footer: () => h('p', {}, 'footer')
        })

        return h('div', {}, [app, foo])
    },
    setup (props) {
        return {}
    }
}