export class ResultWindow {
  #element;

  constructor( element ) {
    this.#element = element;
  }

  set value( value ) {
    this.#element.textContent = value;
  }

  append( symbol ) {
    this.#element.textContent += symbol;
  }

  pop() {
    const newText = this.#element.textContent.slice(0, -1);
    this.#element.textContent = newText;
  }

  reset() {
    this.#element.textContent = '';
  }

  get length() {
    return this.#element.textContent.length;
  }
}
