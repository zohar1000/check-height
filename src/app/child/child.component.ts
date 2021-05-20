import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    <div class="content">
      <p>left: textarea, right: div</p>
      <br/>
      <div style="display: flex; justify-content: space-evenly; padding: 1rem">
        <div style="width: 40%">
          <div>{{msgTextarea}}</div>
          <textarea #textarea style="font-size: 1.5rem;">AA\nBB</textarea>
        </div>
        <div style="width: 40%">
          <div>{{msgDiv}}</div>
          <div #div style="border: 1px solid black; font-size: 1.5rem; overflow: hidden">AA<br/>BB</div>
        </div>
      </div>
    </div>
  `,
  styles: ['.content { background: lightgray; }']
})
export class ChildComponent implements AfterViewInit {
  @Input() isKeep;
  @Input() set lines(value) {
    if (value) this.setLines(value);
  }
  @ViewChild('textarea') textarea;
  @ViewChild('div') div;
  msgTextarea = '';
  msgDiv = '';

  elms = {
    textarea: { sides: 2, in: 2, lineBreak: '\n', elm: null, fontSize: 0 },
    div: { sides: 1, in: 2, lineBreak: '<BR/>', elm: null, fontSize: 0 }
  };

  ngAfterViewInit() {
    this.initFontSize('textarea');
    this.initFontSize('div');
  }

  initFontSize(name) {
console.time(`TIME => getting font size of ${name}`);
    this.elms[name].elm = this[name]?.nativeElement;
    const elm = this.elms[name].elm;
    const compStyles = window.getComputedStyle(elm);
    this.elms[name].fontSize = compStyles.getPropertyValue('font-size').replace('px', '');
console.timeEnd(`TIME => getting font size of ${name}`);
  }

  setLines(num) {
    for (const key in this.elms) {
      const elmValue = this.elms[key];
      const innerHTML = elmValue.elm.innerHTML;
console.time(`TIME => setting height of ${num} lines for ${key}`);
      this.getHeight(elmValue, num);
console.timeEnd(`TIME => setting height of ${num} lines for ${key}`);
      key === 'textarea' ? this.msgTextarea = `${key} height is ${elmValue.elm.style.height}` : this.msgDiv = `${key} height is ${elmValue.elm.style.height}`;
      elmValue.elm.innerHTML = innerHTML;
       if (this.isKeep) elmValue.elm.style.height = 'auto';
    }
  }

  getHeight(elmValue, num) {
      elmValue.elm.innerHTML = (new Array(num)).fill('').map((item, ix) => 'line ' + (ix + 1)).join(elmValue.lineBreak);
      elmValue.elm.style.height = '0px';
      elmValue.elm.style.height = elmValue.elm.scrollHeight + 'px';
  }
}
