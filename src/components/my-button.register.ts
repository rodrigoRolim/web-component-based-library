import { MyButton } from './my-button.scripts';

/**
 * @module my-button
 * @description This module exports the MyButton web component.
 * 
 * This file exists ONLY for side-effects.
 * It is safe to import multiple times.
 */

export function defineMyButton(): void {
  if (!customElements.get(MyButton.tag)) {
    customElements.define(MyButton.tag, MyButton);
  }
}
defineMyButton();