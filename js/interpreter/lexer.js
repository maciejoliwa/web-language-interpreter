import { TOKENS, getIdentifier, tokenFactory } from './token.js';

export const lexerFactory = (inputCode = '') => {
    const characters = inputCode.split('');
    let currentPosition = 0;

    function lookupNextCharacter() {
        return characters[currentPosition + 1];
    }

    function isLetter(str = '') {
        if (typeof(str) !== 'string') {
            return false;
        }

        return str.length === 1 && !!str.match(/[a-zA-Z]/i);
    }

    function isNumber(str = '') {
        if (isNaN(Number.parseInt(str))) {
            return false;
        }

        return true;
    }

    function parseNumber() {
        let results = '';
        results += characters[currentPosition];

        while (true) {
            
            const char = lookupNextCharacter();
            
            if (!isNumber(char)) {
                break;
            } else {
                currentPosition++;
                results += char;
            }

        }

        return results;
    }

    function parseIdentifier() {
        let results = '';
        results += characters[currentPosition];

        while (true) {
            
            const char = lookupNextCharacter();
            
            if (!isLetter(char)) {
                break;
            } else {
                currentPosition++;
                results += char;
            }

        }

        return results;
    }

    function tokenize() {
        const tokens = [];

        let position = 1;

        while (currentPosition < characters.length) {
            const char = characters[currentPosition];
            let token;

            if (isLetter(char)) {
                const identifier = parseIdentifier();
                const tokenType = getIdentifier(identifier);
                token = tokenFactory(tokenType, identifier, position);
            }
            else if(isNumber(char)) {
                const identifer = parseNumber();
                const tokenType = TOKENS.NUMBER;
                token = tokenFactory(tokenType, identifer, position);
            }
            else if(char == "\n") {
                position++;
                currentPosition++;
                continue;
            }
            else if(char == "" || char == " ") {
                currentPosition++;
                continue;
            }

            tokens.push(token);
            currentPosition++;
        }

        return tokens;
    }

    return {
        tokenize
    }
} 