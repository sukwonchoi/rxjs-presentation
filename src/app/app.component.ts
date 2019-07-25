import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Subject } from 'rxjs';
import { switchMap, takeUntil, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  onMouseMove$ = new Subject<MouseEvent>();
  onMouseUp$ = new Subject<MouseEvent>();
  onMouseDown$ = new Subject<MouseEvent>();

  drag$ = this.onMouseDown$.pipe(
    switchMap(() => this.onMouseMove$.pipe(takeUntil(this.onMouseUp$)))
  );

  blockPosition$ = this.drag$.pipe(
    map(e => {
      return {
        x: e.clientX,
        y: e.clientY
      };
    }),
    startWith({ x: 0, y: 0 })
  );

  constructor(public service: AppService) {}

  ngOnInit() {}
}
