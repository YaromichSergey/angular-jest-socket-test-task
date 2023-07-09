import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

const DEFAULT_TIMER_DELAY = 1000;
const DEFAULT_ARRAY_SIZE = 1000;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, AfterViewInit{

  timer: number = DEFAULT_TIMER_DELAY;
  arraySize = DEFAULT_ARRAY_SIZE;
  additionalIds: string[] = [];
  worker: Worker | undefined;
  timerUpdate = new Subject<string>();
  arraySizeUpdate = new Subject<string>();
  additionalIdsUpdate = new Subject<string>();

  displayedColumns: string[] = [
    'id',
    'int',
    'float',
    'color',
    'child'
  ];

  displayedChildColumns: string[] = [
    'id',
    'color'
  ]

  dataSource = new MatTableDataSource([]);

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }
  ngAfterViewInit(): void {
    this.startWorker();
  }
  ngOnInit(): void {
    this.timerUpdate.pipe(
      debounceTime(500),
      distinctUntilChanged())
      .subscribe(value => {
        this.timer = parseInt(value);
        this.changeSettings();
      });
    this.arraySizeUpdate.pipe(
      debounceTime(500),
      distinctUntilChanged())
      .subscribe(value => {
        this.arraySize = parseInt(value);
        this.changeSettings();
      });
    this.additionalIdsUpdate.pipe(
      debounceTime(500),
      distinctUntilChanged())
      .subscribe(value => {
        this.additionalIds = value.split(',').filter(val => !!val);
        this.changeSettings();
      });
  }

  changeSettings(): void {
    this.worker?.postMessage({timer: this.timer, arraySize: this.arraySize, additionalIds: this.additionalIds});
  }

  startWorker(): void {
    this.worker = new Worker( new URL('./app.worker', import.meta.url));
    this.worker.onmessage = ({ data }) => {
      this.dataSource = new MatTableDataSource(data.splice(-10));
      this.changeDetectorRef.detectChanges();
    };
    this.worker.postMessage({timer: this.timer, arraySize: this.arraySize, additionalIds: this.additionalIds});
  }
}
