const parser = require('./parser');

module.exports = class Interpreter {
  constructor(codeStr) {
    this.ast = parser.parse(codeStr);
  }

  exec(context) {
    return interpret(this.ast);

    function interpret(ast) {
      if (ast.id) {
        return context[ast.id];
      } else if (ast.type) {
        switch (ast.type) {
          case 'access':
            return interpret(ast.left)[interpret(ast.right)];
        }
      } else if (ast.opt) {
        switch (ast.opt) {
          case '+':
            return interpret(ast.left) + interpret(ast.right);
          case '-':
            return interpret(ast.left) - interpret(ast.right);
          case '*':
            return interpret(ast.left) * interpret(ast.right);
          case '/':
            return interpret(ast.left) / interpret(ast.right);
          case '>':
            return interpret(ast.left) > interpret(ast.right);
          case '<':
            return interpret(ast.left) < interpret(ast.right);
          case '===':
            return interpret(ast.left) === interpret(ast.right);
          case '!==':
            return interpret(ast.left) !== interpret(ast.right);
          case '>=':
            return interpret(ast.left) >= interpret(ast.right);
          case '<=':
            return interpret(ast.left) <= interpret(ast.right);
          case '&&':
            return interpret(ast.left) && interpret(ast.right);
          case '||':
            return interpret(ast.left) || interpret(ast.right);
          case 'ternary':
            return interpret(ast.left) ? interpret(ast.middle) : interpret(ast.right);
        }
      } else {
        return ast;
      }
    }
  }
};
