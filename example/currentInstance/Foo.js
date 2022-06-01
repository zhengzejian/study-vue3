import { h, getCurrentInstance } from '../../lib/guide-mini-vue.esm.js'

export let Foo = {
    name: 'Foo',
    setup () {
        let instance = getCurrentInstance()
        console.log('foo instance: ', instance)
    },
    render () {
        return h('foo')
    }
}