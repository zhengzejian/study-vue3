import { readonly, isReadonly, isProxy } from '../reactive'
describe('readonly', () => {
    it('happy path', () => {
        const original = { foo: 1, bar: { baz: 2 } }
        const wrapper = readonly(original)
        expect(wrapper).not.toBe(original)
        expect(isReadonly(wrapper)).toBe(true)
        expect(isReadonly(original)).toBe(false)
        expect(isReadonly(wrapper.bar)).toBe(true)
        expect(isReadonly(original.bar)).toBe(false)
        expect(isProxy(wrapper)).toBe(true)

        expect(wrapper.foo).toBe(1)
    })

    it('warn then call set', () => {
        console.warn = jest.fn()

        const user = readonly({
            age: 10
        })
        user.age = 11

        expect(console.warn).toBeCalled()
    })
})