import { template, sheet } from './my-button.template.htm'

export class MyButton extends HTMLElement {
  static tag = 'my-button'
  static observedAttributes = ['text', 'color']

  private $el!: HTMLButtonElement

  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'open' })
    shadow.innerHTML = template
    shadow.adoptedStyleSheets = [sheet]

    this.$el = shadow.querySelector('[data-id="button"]')!
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback() {
    this.render()
  }

  private render() {
    this.$el.textContent = this.getAttribute('text') || ''
    this.$el.className = `my-button ${this.getAttribute('color') || ''}`
  }
}