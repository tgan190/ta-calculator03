import Calc from '../calc';

const calc = new Calc();

test('add 2 numbers', () => {
    const result = calc.add(5).add(6).equals();
    expect(result).toBe(11);
})


test('calc is reusable by adding another 2 numbers', () => {
    const result = calc.add(5).add(1).equals();
    expect(result).toBe(6);
})


test('multiply 2 numbers', () => {
    const result = calc.add(0.1).multiply(0.2).equals();
    expect(result).toBe(0.02);
})

test('subtract 2 numbers', () => {
    const result = calc.add(5.1).subtract(2.2).equals();
    expect(result).toBe(2.9);
})


test('subtract 2 numbers to get a negative result', () => {
    const result = calc.add(50.5).subtract(72).equals();
    expect(result).toBe(-21.5);
})

test('subtract 2 negative numbers', () => {
    const result = calc.subtract(352.6).subtract(100).equals();
    expect(result).toBe(-452.6);
})

test('divide 2 numbers', () => {
    const result = calc.add(100).divide(2.5).equals();
    expect(result).toBe(40);
})

test('divide floating point numbers', () => {
    const result = calc.add(64.4).divide(0.2).equals();
    expect(result).toBe(322);
})


test('add, multiply, subtract, divide 4 numbers', () => {
    const result = calc.add(20).multiply(2.5).subtract(10).divide(100).equals();
    expect(result).toBe(0.4);
})

test('subtract, multiply, add, divide 4 numbers', () => {
    const result = calc.subtract(50).multiply(2.5).add(5).divide(4).equals();
    expect(result).toBe(-30);
})