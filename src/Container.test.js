import Container from './Container'

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
    let c = new Container()
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

    c.share('MyService2', () => new Class2())
    c.share('MyService1', (c) => new Class1(c.get('MyService2')))

    let myService1 = c.get('MyService1')
    let myService1Again = c.get('MyService1')
    expect(called1).toBe(true)
    expect(called2).toBe(true)
    expect(myService1).toBe(myService1Again)
})

test('unordered dependency', () => {
    let c = new Container()
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

    c.share('MyService1', (c) => new Class1(c.get('MyService2')))
    c.share('MyService2', () => new Class2())

    let myService1 = c.get('MyService1')
    let myService1Again = c.get('MyService1')
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
