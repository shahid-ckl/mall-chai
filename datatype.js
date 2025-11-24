// File: datatype.js
// Simple JS program that demonstrates and prints common data types and how to detect them.
// Run with: node datatype.js

function describe(name, value) {
    const type = typeof value;
    // More specific checks
    const details = {
        isArray: Array.isArray(value),
        isNull: value === null,
        instanceOf: (ctor) => (value instanceof ctor ? ctor.name : null)
    };

    // Build a printable representation
    let repr;
    try {
        if (typeof value === 'function') repr = value.toString().split('\n')[0] + ' { ... }';
        else if (typeof value === 'symbol') repr = value.toString();
        else if (typeof value === 'bigint') repr = value.toString() + 'n';
        else repr = JSON.stringify(value);
    } catch (e) {
        repr = String(value);
    }

    console.log(`--- ${name} ---`);
    console.log('value: ', repr);
    console.log('typeof:', type);
    if (details.isNull) console.log('note: value === null (typeof null is "object")');
    if (details.isArray) console.log('note: Array.isArray(value) === true');
    // check a few common constructors
    const instances = ['Date', 'RegExp', 'Map', 'Set', 'ArrayBuffer', 'Int8Array']
        .map((c) => details.instanceOf(globalThis[c]))
        .filter(Boolean);
    if (instances.length) console.log('instanceof:', instances.join(', '));
    console.log('');
}

// Primitives
describe('String', 'hello world');
describe('Number (integer)', 42);
describe('Number (float)', 3.14);
describe('NaN', NaN);
describe('Infinity', Infinity);
describe('BigInt', 9007199254740991n);
describe('Boolean true', true);
describe('Boolean false', false);
describe('Null', null);
describe('Undefined', undefined);
describe('Symbol', Symbol('id'));

// Objects and special objects
describe('Plain Object', { a: 1, b: 'two' });
describe('Array', [1, 2, 3]);
describe('Function (named)', function greet() { return 'hi'; });
describe('Arrow Function', () => 'arrow');
describe('Date', new Date());
describe('RegExp', /abc/i);
describe('Map', new Map([['k', 'v']]));
describe('Set', new Set([1, 2, 3]));
describe('ArrayBuffer', new ArrayBuffer(8));
describe('TypedArray (Int8Array)', new Int8Array([1, 2, 3]));

// Example of class instances
class Person {
    constructor(name) { this.name = name; }
}
describe('Class instance (Person)', new Person('Alice'));

// Type conversions
console.log('--- Conversions ---');
console.log('String(123) =>', String(123), typeof String(123));
console.log('Number("123") =>', Number('123'), typeof Number('123'));
console.log('Boolean(0) =>', Boolean(0), typeof Boolean(0));
console.log('Boolean([]) =>', Boolean([]), typeof Boolean([]));
console.log('parseInt("42px") =>', parseInt('42px', 10));
console.log('+' + '5' + ' (unary +) =>', +('5'));
console.log('');

// Utility: robust type check function
function typeOf(value) {
    if (value === null) return 'null';
    if (Array.isArray(value)) return 'array';
    if (value instanceof Date) return 'date';
    if (value instanceof RegExp) return 'regexp';
    if (value instanceof Map) return 'map';
    if (value instanceof Set) return 'set';
    if (typeof value === 'object') return 'object';
    return typeof value;
}

console.log('--- typeOf helper examples ---');
console.log('typeOf(null) =>', typeOf(null));
console.log('typeOf([1,2]) =>', typeOf([1, 2]));
console.log('typeOf(new Date()) =>', typeOf(new Date()));
console.log('typeOf(/x/) =>', typeOf(/x/));
console.log('typeOf(5n) =>', typeOf(5n));
console.log('');
console.log('Done.');