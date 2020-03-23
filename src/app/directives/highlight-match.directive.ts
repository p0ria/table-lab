import {Directive, ElementRef, Input, OnChanges, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[highlightMatch]'
})
export class HighlightMatchDirective implements OnChanges{
  @Input() highlightMatch;
  constructor(private elementRef: ElementRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    let el = this.elementRef.nativeElement as HTMLElement;
    el.innerHTML = this.highlightMatch;
  }
}
