export const TOKENS = Object.freeze({
    PRINT: 'PRINT',
    PUSH: 'PUSH',
    PRINTC: 'PRINTC',
    ADD: 'ADD',
    SUB: 'SUB',
    POP: 'POP',
    IFEQ: 'IFEQ',
    IFGT: 'IFGT',
    IFLT: 'IFLT',
    JUMP: 'JUMP',

    IDENTIFIER: 'IDENTIFIER',
    NUMBER: 'NUMBER',
});

export const getIdentifier = (identifier) => {
    if (Object.keys(TOKENS).includes(identifier)) {
        return TOKENS[identifier];
    }

    return TOKENS.IDENTIFIER;
}

export const tokenFactory = (tokenType, literal, position) => ({ tokenType, literal, position});