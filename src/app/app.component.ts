import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  items = [1];
  lines;
  isKeep = false;

  onClickCount(count) {
    this.items = new Array(Number(count));
  }

  onClickLines(lines, isKeep) {
    this.isKeep = isKeep;
    this.lines = Number(lines);
  }
}
