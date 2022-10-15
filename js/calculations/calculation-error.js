export const CALCULATION_ERROR_MESSAGES = {
  DIVISION_BY_ZERO: 'Деление на ноль невозможно!',
  UNKNOWN_OPERATION: 'Неизвестная операция!',
};

export class CalculationError extends Error {
  constructor( message ) {
    super(message);
    this.name = 'CalculationError';
  }
}
