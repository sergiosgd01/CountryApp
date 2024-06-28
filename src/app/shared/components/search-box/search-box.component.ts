import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html'
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer = new Subject<string>();

  @Input()
  public initialValue = '';

  @Input()
  public placeholder = '';

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncer
      .pipe(
        debounceTime(300)
      )
      .subscribe((value) => {
        this.onDebounce.emit(value);
      });
  }

  ngOnDestroy(): void {
    this.debouncer.unsubscribe();
  }

  emitValue(text: string): void {
    this.onValue.emit(text);
  }

  onKeyPress(searchTerm: string) {
    this.debouncer.next(searchTerm);
  }
}
