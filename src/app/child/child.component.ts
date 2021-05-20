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
          <textarea #textarea style="font-size: 1rem;">AA\nBB</textarea>
        </div>
        <div style="width: 40%">
          <div>{{msgDiv}}</div>
          <div #div style="border: 1px solid black; font-size: 1rem; overflow: hidden">AA<br/>BB</div>
        </div>
      </div>
    </div>
  `,
  styles: ['.content { background: lightgray; }']
})
export class ChildComponent implements AfterViewInit {
  @Input() set data(value) {
    if (!value) return;
    if (!this.isInit) {
      this.initData = value;
    } else {
      this.setData(value);
    }
  }
  @ViewChild('textarea') textarea;
  @ViewChild('div') div;
  isKeepHeight;
  isKeepText;
  msgTextarea = '';
  msgDiv = '';
  isInit = false;
  initData;

  elms = {
    textarea: { lineBreak: '\n', elm: null, initialText: '' },
    div: { lineBreak: '<BR/>', elm: null, initialText: '' }
  };

  ngAfterViewInit() {
    this.isInit = true;
    this.initElm('textarea');
    this.initElm('div');
    if (this.initData) this.setData(this.initData);
  }

  initElm(name) {
console.time(`TIME => getting font size of ${name}`);
    const elmValue = this.elms[name];
    elmValue.elm = this[name]?.nativeElement;
    elmValue.initialText = elmValue.elm.innerHTML;
console.timeEnd(`TIME => getting font size of ${name}`);
  }

  setData(data) {
    this.isKeepHeight = data.isKeepHeight;
    this.isKeepText = data.isKeepText;
    this.setLines(data.lines);
  }

  setLines(num) {
    for (const key in this.elms) {
      const elmValue = this.elms[key];
console.time(`TIME => setting height of ${num} lines for ${key}`);
      this.getHeight(elmValue, num);
console.timeEnd(`TIME => setting height of ${num} lines for ${key}`);
      const currHeight = elmValue.elm.style.height;
      setTimeout(() => key === 'textarea' ? this.msgTextarea = `${key} height is ${currHeight}` : this.msgDiv = `${key} height is ${currHeight}`);
      if (this.isKeepText) elmValue.elm.innerHTML = elmValue.initialText;
       if (this.isKeepHeight) elmValue.elm.style.height = 'auto';
    }
  }

  getHeight(elmValue, num) {
      elmValue.elm.innerHTML = (new Array(num)).fill('').map((item, ix) => 'line ' + (ix + 1)).join(elmValue.lineBreak);
      elmValue.elm.style.height = '0px';
      elmValue.elm.style.height = elmValue.elm.scrollHeight + 'px';
  }
}
