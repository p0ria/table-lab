import {
  AfterViewInit,
  Component,
  ElementRef, EventEmitter,
  forwardRef,
  HostBinding,
  HostListener,
  Inject, Input, OnDestroy,
  OnInit, Output
} from '@angular/core';
import {TableHeaderCellComponent} from "../table-header-cell.component";
import {Filterable} from "../../../../../interfaces/filterable.interface";


@Component({
  selector: 'app-table-header-cell-filter',
  templateUrl: './table-header-cell-filter.component.html',
  styleUrls: ['./table-header-cell-filter.component.scss']
})
export class TableHeaderCellFilterComponent implements OnInit, AfterViewInit {
  @Input() @HostBinding('style.width') width = '100%';
  @Input() @HostBinding('style.height') height = '100%';
  @Input() filter: Filterable<any>;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    @Inject(forwardRef(() => TableHeaderCellComponent)) private parent: TableHeaderCellComponent) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    let el = this.elementRef.nativeElement;
    let table = document.querySelector<HTMLElement>('app-table');
    let parent = el.parentElement;

    if(this.parent.isCenter) {
      let elWidth = el.clientWidth;
      let parentWidth = parent.clientWidth;
      let offset = Math.floor((parentWidth - elWidth) / 2);
      el.style.right = offset + 'px';
    }
    else {
      el.style.right = "0";
    }
    let elLeft = el.getBoundingClientRect().left;
    let tableLeft = table.getBoundingClientRect().left;
    let tableOffset = elLeft - tableLeft;
    if(tableOffset < 0) {
      let right = parseInt(el.style.right.split('px')[0]);
      el.style.right = right + tableOffset + 'px';
    }

  }

  @HostListener('click', ['$event'])
  click(event: MouseEvent) {
    event.stopPropagation();
  }

}
