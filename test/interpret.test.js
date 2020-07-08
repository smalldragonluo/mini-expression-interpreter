const assert = require('assert');
const Interpreter = require('../lib/mini-expression-interpreter');

assert.equal(
  new Interpreter('false').exec(),
  false,
  'should evaluate boolean correctly'
);

assert.equal(
  new Interpreter('1.234').exec(),
  1.234,
  'should evaluate floating point number correctly'
);

assert.equal(
  new Interpreter('1 + 1').exec(),
  2,
  'addition calculation should be done correctly'
);

assert.equal(
  new Interpreter('1 - 1').exec(),
  0,
  'subtraction calculation should be done correctly'
);

assert.equal(
  new Interpreter('3 * 6').exec(),
  18,
  'multiplication calculation should be done correctly'
);

assert.equal(
  new Interpreter('3 / 6').exec(),
  0.5,
  'division calculation should be done correctly'
);

assert.equal(
  new Interpreter('1 + 2 * 3 - 4 * (5 + 1)').exec(),
  -17,
  'left associative operators should be handled correctly'
);

assert.equal(
  new Interpreter('1 + $[0].values[0]').exec({
    $: [
      {
        values: [100]
      }
    ],
  }),
  101,
  'property access operations should be handled correctly'
);

assert.equal(
  new Interpreter('1 > 2').exec(),
  false,
  'logical operator(>) should be judged correctly'
);

assert.equal(
  new Interpreter('1 < 2').exec(),
  true,
  'logical operator(<) should be judged correctly'
);

assert.equal(
  new Interpreter('1 === 1').exec(),
  true,
  'logical operator(===) should be judged correctly'
);

assert.equal(
  new Interpreter('1 >= 1').exec(),
  true,
  'logical operator(>=) should be judged correctly'
);

assert.equal(
  new Interpreter('1 <= 0').exec(),
  false,
  'logical operator(<=) should be judged correctly'
);

assert.equal(
  new Interpreter('1 && 0').exec(),
  false,
  'logical operator(&&) should be judged correctly'
);

assert.equal(
  new Interpreter('1 || 0').exec(),
  true,
  'logical operator(||) should be judged correctly'
);

assert.equal(
  new Interpreter('0 ? 3 : 4').exec(),
  4,
  'ternary operator should be handled correctly'
);

assert.equal(
  new Interpreter('0 ? 1 : 2 ? ($[0].values[0] > $[1].values[0] ? 3 : 4 ) : 5').exec({
    $: [
      {
        values: [100]
      },
      {
        values: [200]
      }
    ],
  }),
  4,
  'should calculate correctly'
);

assert.equal(
  new Interpreter('0 ? 1 : 2 ? ($[0].values[0] > $[1].values[0] ? 3 : 4 ) : 5').exec({
    $: [
      {
        values: [100]
      },
      {
        values: [200]
      }
    ],
  }),
  4,
  'should calculate correctly'
);
