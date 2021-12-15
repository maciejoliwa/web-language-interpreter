export class Stack {
    constructor() {
        this.data = new Array(255);
        this.top = 0;
    }
    push(element) {
        this.data[this.top] = parseInt(element);
        this.top = this.top + 1;
    }
    length() {
        return this.top;
    }
    peek() {
        return this.data[this.top - 1];
    }
    isEmpty() {
        return this.top === 0;
    }
    pop() {
        if (this.isEmpty() === false) {
            this.top = this.top - 1;
            return this.data.pop(); // removes the last element
        }
    }
    print() {
        let top = this.top - 1; // because top points to index where new    element to be inserted
        while (top >= 0) { // print upto 0th index
            console.log(this.data[top]);
            top--;
        }
    }
    add() {
        const a = this.pop();
        const b = this.pop();

        this.push(a + b);
    }
    reverse() {
        this._reverse(this.top - 1);
    }
    _reverse(index) {
        if (index != 0) {
            this._reverse(index - 1);
        }
        console.log(this.data[index]);
    }
}