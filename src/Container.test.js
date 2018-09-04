import {Container} from './Container'

test('without dependency', () => {
    let c = new Container()
    let called = false
    let callback = () => {
        called = true
        return 'myservice'
    }
    c.share('MyService', callback)
    let myService = c.get('MyService')
    expect(called).toBe(true)
    expect(myService).toBe('myservice')
});

test('ordered dependency', () => {
    let container = new Container()
    let called1 = false
    let called2 = false

    let Class1 = class {
        constructor(myservice2) {
            called1 = true
            myservice2.myfunc()
        }
    }

    let Class2 = class {
        myfunc() {
            called2 = true
        }
    }

    container.share('MyService2', () => new Class2())
    container.share('MyService1', (c) => new Class1(c.get('MyService2')))

    let myService1 = container.get('MyService1')
    let myService1Again = container.get('MyService1')
    expect(called1).toBe(true)
    expect(called2).toBe(true)
    expect(myService1).toBe(myService1Again)
})

test('unordered dependency', () => {
    let container = new Container()
    let called1 = false
    let called2 = false

    let Class1 = class {
        constructor(myservice2) {
            called1 = true
            myservice2.myfunc()
        }
    }

    let Class2 = class {
        myfunc() {
            called2 = true
        }
    }

    container.share('MyService1', (c) => new Class1(c.get('MyService2')))
    container.share('MyService2', () => new Class2())

    let myService1 = container.get('MyService1')
    let myService1Again = container.get('MyService1')
    expect(called1).toBe(true)
    expect(called2).toBe(true)
    expect(myService1).toBe(myService1Again)
})

test('throws error for missing def', () => {
    let c = new Container()
    let unknownName = 'UnknownThing'
    let actualMissingName = ''
    try {
        c.get(unknownName)
    }
    catch (e) {
        actualMissingName = e.definitionName
    }
    expect(actualMissingName).toBe(unknownName)
})
