import { CALCULATION_ERROR_MESSAGES, CalculationError } from './calculation-error.js';

export const OPERATOR_TYPES = {
  PLUS: 'plus',
  MINUS: 'minus',
  MULT: 'multiply',
  DIV: 'divide',
};

export class Calculation {
  static calculate( operatorType, a, b ) {
    const operatorTypesArray = Object.values(OPERATOR_TYPES);

    const isUnknownOperatorType = !operatorTypesArray.includes(operatorType);
    if (isUnknownOperatorType) {
      throw new CalculationError(CALCULATION_ERROR_MESSAGES.UNKNOWN_OPERATION);
    }

    return this[operatorType](a, b);
  }

  static [OPERATOR_TYPES.MINUS]( a, b ) {
    return a - b;
  }

  static [OPERATOR_TYPES.PLUS]( a, b ) {
    return a + b;
  }

  static [OPERATOR_TYPES.MULT]( a, b ) {
    return a * b;
  }

  static [OPERATOR_TYPES.DIV]( a, b ) {
    return a / b;
  }
}
