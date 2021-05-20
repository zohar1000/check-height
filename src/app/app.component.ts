import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  items = [1];
  lines;
  isKeepHeight = false;
  isKeepText = true;
  data;

  onClickCount(count) {
    this.items = new Array(Number(count)).fill(0);
  }

  onClickLines(lines, isKeepHeight, isKeepText) {
    this.isKeepHeight = isKeepHeight;
    this.isKeepText = isKeepText;
    this.lines = Number(lines);
    this.data = { lines: Number(lines), isKeepHeight, isKeepText }
  }
}
