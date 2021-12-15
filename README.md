## DEMO:

https://web-interpreter.netlify.app/

## INSTRUCTIONS:
* PUSH [n] - Push n number on the top of the stack
* PRINT - Print whatever's on the top of the stack
* PRINTC - Print whatever's on the top of the stack, but based on the number on the ASCII table
* ADD - Add two numbers on the top of the stack, it pops these numbers and appends their sum to the top of the stack
* IFEQ [n] [line] - IF number of the top of the stack is equal to n, move to line, otherwise continue
* IFLT [n] [line] - IF number of the top of the stack is less than n, move to line, otherwise continue
* IFEQ [n] [line] - IF number of the top of the stack is greater than n, move to line, otherwise continue
* JUMP [line] - Jump to the line

### Example program for printing the alphabet:
```as
PUSH 65
PRINTC
JUMP 4
PUSH 1
ADD
PRINTC
IFLT 90 4
```