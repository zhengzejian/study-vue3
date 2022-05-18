import { h } from '../../lib/guide-mini-vue.esm.js'
window.self = null
export const App = {
    render () {
        window.self = this
        return h(
            'div',
            {
                id: 'root',
                class: 'root'
            },
            'hello ' + this.msg
            // [h('p', { class: 'red' }, 'hahaha'), h('p', { class: 'blue' }, 'hello world')]
        )
    },
    setup () {
        return {
            msg: 'world hahaha '
        }
    }
}