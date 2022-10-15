export class CalculatorNumber {
  #value = '';
  #isFloat = false;

  get value() {
    return this.#value;
  }

  get isFloat() {
    return this.#isFloat;
  }

  set( value ) {
    if (value instanceof CalculatorNumber) {
      return this.#setCalculatorNumber(value);
    }

    if (Number.isFinite(+value)) {
      return this.#setNumber(+value);
    }

    throw new Error('Неподходящий тип для присваивания');
  }

  #setCalculatorNumber( calculatorNumber ) {
    this.#value = calculatorNumber.value;
    this.#isFloat = calculatorNumber.isFloat;
  }

  #setNumber( numberValue ) {
    this.#value = String(numberValue);
    this.#isFloat = !Number.isInteger(numberValue);
  }

  append( symbol ) {
    if (symbol === '.') {
      if (this.#isFloat) return;

      this.#isFloat = true;
    }

    this.#value += symbol;
  }

  pop() {
    if (this.isEmpty()) return;

    const deletedSymbol = this.#value[this.#value.length - 1];
    if (deletedSymbol === '.') this.#isFloat = false;

    const newValue = this.#value.slice(0, -1);
    this.#value = newValue;
  }

  reset() {
    this.#value = '';
    this.#isFloat = false;
  }

  isEmpty() {
    return this.#value === '';
  }
}
