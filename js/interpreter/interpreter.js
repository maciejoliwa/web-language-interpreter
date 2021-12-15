import { Stack } from './stack.js';
import { TOKENS } from './token.js';


const stack = new Stack();
const outputWindow = document.querySelector('.output');

const writeToWebsite = (n) => {
    const element = document.createElement('div');
    element.innerText = n;

    outputWindow.appendChild(element);
}

export const interpreterFactory = (tokens = []) => {
    const tokensToParse = tokens;
    let currentPosition = 0;

    function lookupNextToken() {
        return tokensToParse[currentPosition + 1];
    }

    function run() {
        stack.data = []
        stack.top = 0;
        outputWindow.innerHTML = '';

        while (currentPosition < tokensToParse.length) {
            const token = tokens[currentPosition];
            
            switch (token.tokenType) {
                case TOKENS.PUSH:
                    const nextToken = lookupNextToken();
                    
                    if (nextToken == undefined || nextToken.tokenType !== TOKENS.NUMBER) {
                        alert("You must put a NUMBER after PUSH instruction!");
                        return;
                    }
                    
                    stack.push(nextToken.literal);
                break;

                case TOKENS.PRINT:
                    if (stack.isEmpty()) {
                        alert("Nothing to print on the stack, stack is empty");
                        return;
                    }

                    writeToWebsite(stack.peek());
                break;

                case TOKENS.IFEQ:
                    const toEqual = lookupNextToken();

                    if (toEqual == undefined || toEqual.tokenType !== TOKENS.NUMBER) {
                        alert("You must put a NUMBER after IFEQ instruction!");
                        return
                    }

                    currentPosition++;
                    const toJump = lookupNextToken();

                    if (toJump == undefined || toJump.tokenType !== TOKENS.NUMBER) {
                        alert("You must put a NUMBER after IFEQ instruction!");
                        return;
                    }

                    if (stack.peek() == parseInt(toEqual.literal)) {
                        currentPosition = parseInt(toJump.literal) + 1
                        continue;
                    }
                    
                break;

                case TOKENS.IFGT:
                    const toEqual1 = lookupNextToken();

                    if (toEqual1 == undefined || toEqual1.tokenType !== TOKENS.NUMBER) {
                        alert("You must put a NUMBER after IFGT instruction!");
                        return;
                    }

                    currentPosition++;
                    const toJump1 = lookupNextToken();

                    if (toJump1 == undefined || toJump1.tokenType !== TOKENS.NUMBER) {
                        alert("You must put a NUMBER after IFGT instruction!");
                        return
                    }
                    
                    if (stack.peek() > parseInt(toEqual1.literal)) {
                        currentPosition = parseInt(toJump1.literal) + 1
                        continue
                    }
                    
                break;

                case TOKENS.IFLT:
                    const toEqual2 = lookupNextToken();

                    if (toEqual2 == undefined || toEqual2.tokenType !== TOKENS.NUMBER) {
                        alert("You must put a NUMBER after IFLT instruction!");
                        return;
                    }

                    currentPosition++;
                    const toJump2 = lookupNextToken();

                    if (toJump2== undefined || toJump2.tokenType !== TOKENS.NUMBER) {
                        alert("You must put a NUMBER after IFLT instruction!");
                        return
                    }
                    console.log(stack.peek())
                    if (stack.peek() < parseInt(toEqual2.literal)) {
                        currentPosition = parseInt(toJump2.literal) + 1
                        continue;
                    }
                    
                break;

                case TOKENS.JUMP:
                    const jumpAddress = lookupNextToken();
                    
                    if (jumpAddress == undefined || jumpAddress.tokenType !== TOKENS.NUMBER) {
                        alert("You must put a NUMBER after JUMP instruction!");
                        return;
                    }

                    currentPosition = parseInt(jumpAddress.literal) + 1;

                    if (jumpAddress.literal == token.position) {
                        alert("You can't jump to the same jump line!");
                        return;
                    } 

                    continue;
                break;

                case TOKENS.ADD:
                    if (stack.length() >= 2) {
                        stack.add()
                    }
                break;

                case TOKENS.PRINTC:
                    if (stack.isEmpty()) {
                        alert("Nothing to print on the stack");
                        return
                    }

                    writeToWebsite(String.fromCharCode(stack.peek()));
                break;
            }

            currentPosition++;
        }
    }

    return {
        run
    }
}