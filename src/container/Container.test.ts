import {Container} from './Container'

test('without dependency', () => {
    const c = new Container()
    let called = false
    const callback = () => {
        called = true
        return 'myservice'
    }
    c.share('MyService', callback)
    const myService = c.get('MyService')
    expect(called).toBe(true)
    expect(myService).toBe('myservice')
});

/* tslint:disable:max-classes-per-file */
test('ordered dependency', () => {
    const container = new Container()
    let called1 = false
    let called2 = false

    const Class1 = class {
        constructor(myservice2: any) {
            called1 = true
            myservice2.myfunc()
        }
    }

    const Class2 = class {
        public myfunc() {
            called2 = true
        }
    }

    container.share('MyService2', () => new Class2())
    container.share('MyService1', (c) => new Class1(c.get('MyService2')))

    const myService1 = container.get('MyService1')
    const myService1Again = container.get('MyService1')
    expect(called1).toBe(true)
    expect(called2).toBe(true)
    expect(myService1).toBe(myService1Again)
})

/* tslint:disable:max-classes-per-file */
test('unordered dependency', () => {
    const container = new Container()
    let called1 = false
    let called2 = false

    const Class1 = class {
        constructor(myservice2: any) {
            called1 = true
            myservice2.myfunc()
        }
    }

    const Class2 = class {
        public myfunc() {
            called2 = true
        }
    }

    container.share('MyService1', (c) => new Class1(c.get('MyService2')))
    container.share('MyService2', () => new Class2())

    const myService1 = container.get('MyService1')
    const myService1Again = container.get('MyService1')
    expect(called1).toBe(true)
    expect(called2).toBe(true)
    expect(myService1).toBe(myService1Again)
})

test('throws error for missing def', () => {
    const c = new Container()
    const unknownName = 'UnknownThing'
    let actualMissingName = ''
    try {
        c.get(unknownName)
    }
    catch (e) {
        actualMissingName = e.definitionName
    }
    expect(actualMissingName).toBe(unknownName)
})
