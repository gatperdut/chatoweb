import { Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { fromEvent, Observable, Subject, timer } from 'rxjs';
import { debounce, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[cwDelayedInput]'
})
export class DelayedInputDirective implements OnInit, OnDestroy {

  private destroy = new Subject<void>();

  @Output() delayedInput = new EventEmitter<Event>();

  constructor(
    private elementRef: ElementRef<HTMLInputElement>
  ) {

  }

  ngOnInit() {
    fromEvent(this.elementRef.nativeElement, 'input')
    .pipe(
      debounce(
        (): Observable<number> => timer(400)
      ),
      distinctUntilChanged(
        null,
        (event: Event): string => (event.target as HTMLInputElement).value
      ),
      takeUntil(this.destroy),
    )
    .subscribe(
      e => this.delayedInput.emit(e)
    );
  }

  ngOnDestroy() {
    this.destroy.next();
  }

}
