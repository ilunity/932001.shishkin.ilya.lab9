import { Calculator } from './ui/calculator';

const start = () => {
  const calculatorElem = document.querySelector('.calc');
  const calculator = new Calculator(calculatorElem);
};

start();
