import {entity} from './entity.js';


export const ui_controller = (() => {

  const _PHRASES = [
    ['Kill all Enenmies', 5]
  ];

  class UIController extends entity.Component {
    constructor(params) {
      super();
      this.params_ = params;
      this.timeout_ = 0.0;
      this.textArea_ = document.getElementById('chat-ui-text-area');
      this.text_ = null;
    }

    AddText(txt) {
      if (this.text_) {
        this.text_ = null;
      }

      this.text_ = document.createElement('DIV');
      this.text_.className = 'chat-text';
      this.text_.innerText = txt;
      this.text_.classList.toggle('fadeOut');

      this.textArea_.appendChild(this.text_);

      const dead = [];
      for (let i = 0; i < this.textArea_.children.length; ++i) {
        const s = window.getComputedStyle(this.textArea_.children[i]);
        if (s.visibility == 'hidden') {
          dead.push(this.textArea_.children[i]);
        }
      }
      for (let d of dead) {
        this.textArea_.removeChild(d);
      }
    }

    Update(timeElapsed) {
      if (_PHRASES.length == 0) {
        return;
      }

      this.timeout_ -= timeElapsed;
      if (this.timeout_ < 0) {
        const [phrase, timeout] = _PHRASES.shift();
        this.timeout_ = timeout;
        this.AddText(phrase);
        return;
      }
    }
  };

  return {
    UIController: UIController,
  };

})();