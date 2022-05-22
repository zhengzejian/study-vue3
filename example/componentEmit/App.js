import { h } from '../../lib/guide-mini-vue.esm.js'
import { Foo } from './Foo.js'

export const App = {
    name: 'App',
    setup (props) {

    },
    render () {
        // emit
        return h('div', {}, [h('div', {}, 'App'), h(Foo, {
            onAdd (a, b) {
                console.log('onAdd', a, b)
            },
            onAddFoo (a, b) {
                console.log('add-foo', a, b)
            }
        })])
    }
}