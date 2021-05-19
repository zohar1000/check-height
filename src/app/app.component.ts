import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  items = [1];
  lines;

  onClickCount(count) {
    this.items = new Array(Number(count));
  }

  onClickLines(lines) {
    this.lines = Number(lines);
console.log('lines:', this.lines);
  }
}
