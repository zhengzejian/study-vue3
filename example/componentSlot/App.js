import { h } from '../../lib/guide-mini-vue.esm.js'
import { Foo } from './foo.js'

export const App = {
    name: 'App',
    render () {
        const app = h('div', {}, 'App')
        // const foo = h(Foo, {}, [h('p', {}, 'slots1'), h('p', {}, 'slots2')])

        // 具名插槽
        // object key
        const foo = h(Foo, {}, {
            header: ({ age }) => h('p', {}, 'header' + age),
            footer: () => h('p', {}, 'footer')
        })

        return h('div', {}, [app, foo])
    },
    setup (props) {
        return {}
    }
}