import { Component } from '@angular/core';

@Component({
  selector: 'last-news',
  templateUrl: './last-news.component.html',
  styleUrls: ['./last-news.component.scss'],
})
export class LastNewsComponent {
  offset: number = 0;

  constructor() {
  }

  addOffset() {
    if (this.offset < 6) {
      this.offset++;
    }
  }

  removeOffset() {
    if (this.offset > 0) {
      this.offset--;
    }
  }

  setOffset(offset) {
    this.offset = offset;
  }
}
