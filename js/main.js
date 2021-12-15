import { lexerFactory } from './interpreter/lexer.js';
import { interpreterFactory } from './interpreter/interpreter.js';

const input = document.querySelector('.input');
const runButton = document.querySelector('.run');

runButton.addEventListener('click', () => {
    const tokens = lexerFactory(input.value).tokenize();
    interpreterFactory(tokens).run();
})
