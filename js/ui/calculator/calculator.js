import { Calculation, OPERATOR_TYPES } from '../../calculations';
import { ResultWindow } from './result-window.js';
import { CalculatorNumber } from './calculator-number.js';

const OPERATOR_SYMBOL = {
  DIV: '÷',
  MULT: '×',
  MINUS: '-',
  PLUS: '+',
};

export class Calculator {
  #element;
  #resultWindow;
  #firstNumber = new CalculatorNumber();
  #currentNumber = new CalculatorNumber();
  #operatorType = '';


  #appendOperator( operatorType ) {
    this.#operatorType = operatorType;
    this.#resultWindow.append(OPERATOR_SYMBOL[operatorType]);
    this.#firstNumber.set(this.#currentNumber);
    this.#currentNumber.reset();
  }

  #removeOperator() {
    this.#operatorType = '';
    this.#currentNumber.set(this.#firstNumber);
    this.#firstNumber.reset();
  }

  #replaceOperator( newOperatorType ) {
    this.#operatorType = newOperatorType;
    this.#resultWindow.pop();
    this.#resultWindow.append(OPERATOR_SYMBOL[newOperatorType]);
  }

  #calculate() {
    let result = Calculation.calculate(
      OPERATOR_TYPES[this.#operatorType],
      +this.#firstNumber.value,
      +this.#currentNumber.value,
    );

    result = +result.toFixed(12);
    return result;
  }

  #setResult( calculatedResult ) {
    this.#currentNumber.set(calculatedResult);
    this.#firstNumber.reset();
    this.#operatorType = '';
    this.#resultWindow.value = this.#currentNumber.value;
  }


  constructor( element ) {
    this.#element = element;

    const resultWindowElem = element.querySelector('.result__window');
    this.#resultWindow = new ResultWindow(resultWindowElem);

    element.addEventListener('click', event => this.onClick(event));
  }

  onClick( event ) {
    const actionTarget = event.target.dataset.action
      ? event.target
      : event.target.parentNode?.dataset.action
        ? event.target.parentNode
        : undefined;

    if (!actionTarget) return;

    const action = actionTarget.dataset.action;
    this[action](actionTarget);
  }

  handleNumber( target ) {
    const symbol = target.textContent;

    if (symbol === '.' && this.#currentNumber.isFloat) {
      return;
    }

    this.#currentNumber.append(symbol);
    this.#resultWindow.append(symbol);
  }

  handleOperator( target ) {
    const operatorType = target.dataset.operatorType;

    const isFirstNumberEmpty = !this.isCurrentNumberExist() && !this.isOperatorExist();
    if (isFirstNumberEmpty) {
      if (operatorType === OPERATOR_TYPES.MINUS) {
        return this.changeCurrentSign();
      }
    }

    if (this.isOperatorExist()) {
      const isSecondNumberEmpty = !this.isCurrentNumberExist();

      if (isSecondNumberEmpty) {
        const isUnaryMinusSituation = operatorType === OPERATOR_TYPES.MINUS && (this.#operatorType === OPERATOR_TYPES.MULT || this.#operatorType === OPERATOR_TYPES.DIV);

        if (isUnaryMinusSituation) {
          return this.changeCurrentSign();
        }

        return this.#replaceOperator(operatorType);
      }

      this.equal();
    }

    this.#appendOperator(operatorType);
  }

  removeSymbol() {
    if (!this.isSomeSymbolExist()) return;
    this.#resultWindow.pop();

    if (this.isLastSymbolIsOperator()) {
      return this.#removeOperator();
    }

    this.#currentNumber.pop();
  }

  reset() {
    this.#operatorType = '';
    this.#firstNumber.reset();
    this.#currentNumber.reset();
    this.#resultWindow.reset();
  }

  equal() {
    if (!this.isOperatorExist()) return;

    if (this.isLastSymbolIsOperator()) {
      this.removeSymbol();
    }

    const result = this.#calculate();
    this.#setResult(result);
  }

  changeCurrentSign() {
    this.#currentNumber.append('-');
    this.#resultWindow.append('-');
  }

  isCurrentNumberExist() {
    return !this.#currentNumber.isEmpty();
  }

  isOperatorExist() {
    return this.#operatorType !== '';
  }

  isLastSymbolIsOperator() {
    return !this.isCurrentNumberExist() && this.isOperatorExist();
  }

  isFirstNumberExist() {
    return !this.#firstNumber.isEmpty();
  }

  isSomeSymbolExist() {
    return this.isCurrentNumberExist() || this.isOperatorExist();
  }
}
