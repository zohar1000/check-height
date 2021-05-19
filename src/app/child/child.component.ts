import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    <div class="content">
      <p>child works! <button (click)="print()">Print</button></p>
      <br/>
      <div style="display: flex; justify-content: space-evenly; padding: 1rem">
<!--        <textarea #ta style="width: 40%">AA\nBB</textarea>-->
        <textarea #ta style="width: 40%">AA\nBB\nCC\nDD</textarea>

        <div #div style="width: 40%; border: 1px solid black"></div>
<!--        <div #div style="width: 40%; border: 1px solid black">AA<br/>BB</div>-->
<!--        <div #div style="width: 40%; border: 1px solid black">AA<br/>BB<br/>CC<br/>DD</div>-->
      </div>
    </div>
  `,
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements AfterViewInit {
  @Input() set lines(value) {
console.log('value:', typeof value, value);
    if (value) this.setLines(value);
  }
  @ViewChild('ta') ta;
  @ViewChild('div') div;

  elms = {
    textarea: { sides: 2, in: 2, lineBreak: '\n', elm: null, fontSize: 13.333 },
    div: { sides: 1, in: 2, lineBreak: '<BR/>', elm: null, fontSize: 16 }
  };

  ngAfterViewInit() {
    this.elms.textarea.elm = this.ta?.nativeElement;
    this.elms.div.elm = this.div?.nativeElement;
    this.print();
  }

  initFontSize() {

  }

  print() {
    this.checkElement('textarea');
    this.checkElement('div');
  }

  checkElement(name) {
    const elm = this.elms[name].elm;
    if (!elm) return;
    console.log('==>', name);
console.time('check time');
    const compStyles = window.getComputedStyle(elm);
    this.printStyleValue(compStyles, 'line-height');
    this.printStyleValue(compStyles, 'font-size');
    this.printStyleValue(compStyles, 'padding');
    this.printStyleValue(compStyles, 'padding-top');
    this.printStyleValue(compStyles, 'padding-bottom');
    this.printStyleValue(compStyles, 'margin');
    this.printStyleValue(compStyles, 'margin-top');
    this.printStyleValue(compStyles, 'margin-bottom');
    console.log('client height:', elm.clientHeight); // includes padding
    console.log('offset height:', elm.offsetHeight); // includes padding, scrollBar and borders
    const rect = elm.getBoundingClientRect();
    console.log(`height: ${rect.height}`);
console.timeEnd('check time');
  }

  printStyleValue(compStyles, prop) {
    console.log(`${prop} value:`, compStyles.getPropertyValue(prop));
  }

  setLines(num) {
    for (const key in this.elms) {
      const elmValue = this.elms[key];
      if (!elmValue.elm) continue;
      let lines = (new Array(num)).fill('');
      lines = lines.map((item, ix) => 'line ' + (ix + 1));
      const text = lines.join(elmValue.lineBreak);
      console.log('text:', text);
      elmValue.elm.innerHTML = text;

      const h = (num * elmValue.fontSize) + elmValue.sides * 2 + elmValue.in * (num - 1);
      console.log('h:', h);
      // elmValue.elm.setAttribute('style', 'height: ' + h + 'px');
      elmValue.elm.style.height = h + 'px';
    }
  }
}
