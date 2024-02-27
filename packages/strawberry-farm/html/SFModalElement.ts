import { nextFrame, on } from '../functions';
import { SFElement } from './SFElement';

class SFModalElement extends SFElement {
  constructor() {
    super();

    this.setup = () => {
      this.classList.add('SFModal-enter-from');
      nextFrame(() => {
        this.classList.add('SFModal-enter-active');
        this.classList.remove('SFModal-enter-from');
        on(this).transitionend(() => {
          this.classList.remove('SFModal-enter-active');
        });
      });
    };
  }
}
