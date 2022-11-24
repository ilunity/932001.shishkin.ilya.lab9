const SYMBOLS_COUNT_TO_FONT_SIZE = {
  '0': '96px',
  '6': '80px',
  '8': '64px',
  '10': '48px',
};

export class ResultWindow {
  #element;
  #fontSize;

  constructor( element ) {
    this.#element = element;
    this.#fontSize = this.#element.style.fontSize;
  }

  set value( value ) {
    this.#element.textContent = value;
    this.#resize();
  }

  append( symbol ) {
    this.#element.textContent += symbol;
    this.#resize();
  }

  pop() {
    const newText = this.#element.textContent.slice(0, -1);
    this.#element.textContent = newText;
    this.#resize();
  }

  reset() {
    this.#element.textContent = '';
  }

  get length() {
    return this.#element.textContent.length;
  }

  #resize() {
    const neededSize = this.#defineNeededSize();
    if (neededSize === this.#fontSize) return;

    this.#fontSize = neededSize;
    this.#element.style.fontSize = neededSize;
  }

  #defineNeededSize() {
    const symbolsCount = this.#element.textContent.length;

    let fontSize;
    Object.keys(SYMBOLS_COUNT_TO_FONT_SIZE).forEach(key => {
      if (symbolsCount < key) return fontSize;

      fontSize = SYMBOLS_COUNT_TO_FONT_SIZE[key];
    });

    return fontSize;
  }
}
