import { toHandlerKey, camelize } from '../shared/index'

export function emit(instance, event, ...args) {
    console.log('emit: ', event)

    // instance.props -> event
    const { props } = instance



    const handlerName = toHandlerKey(event)
    const handler = props[camelize(handlerName)]

    handler && handler(...args)

}