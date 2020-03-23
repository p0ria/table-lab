import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  QueryList,
  Renderer2,
  SimpleChanges
} from '@angular/core';
import {TableHeaderCellComponent} from "./table-header/table-header-cell/table-header-cell.component";
import {TableRowCellComponent} from "./table-row/table-row-cell/table-row-cell.component";
import {BehaviorSubject, combineLatest} from "rxjs";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit, AfterViewInit{
  @Input() set sort(value: string){
    this.sort$.next( {field: value, asc: null});
  }
  @Input() set items(value: any[]) {
    this.items$.next(value);
  }
  @ContentChildren(TableHeaderCellComponent, {descendants: true}) headerCellComponents: QueryList<TableHeaderCellComponent>;
  @ContentChildren(TableRowCellComponent, {descendants: true, read: ElementRef}) rowCellElements: QueryList<ElementRef>;
  @ContentChildren(TableHeaderCellComponent, {descendants: true, read: ElementRef}) headerCellElements: QueryList<ElementRef>;
  displayItems = [];
  items$ = new BehaviorSubject<any[]>([]);
  sort$ = new BehaviorSubject<{field: string, asc: boolean}>(null);
  search$ = new BehaviorSubject<string>(null);

  private sortField: string;
  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    combineLatest(this.items$, this.search$, this.sort$)
      .subscribe(([items, search, sort]) => {
        let filteredItems = this.filterItems(items, search);
        let sortFiled = sort ? sort.field : null;
        let sortAsc = sort ? sort.asc : null;
        let sortedItems = this.sortItems(filteredItems, sortFiled, sortAsc);
        this.displayItems = sortedItems;
      })
  }

  ngAfterViewInit(): void {
    this.bindRows();
    this.rowCellElements.changes.subscribe(() => {
      this.bindRows();
    });
    this.bindSorting();
  }

  bindRows() {
    let headerCells = this.headerCellComponents.toArray();
    let rowCells = this.rowCellElements.toArray();
    for(let i = 0; i < rowCells.length; i++) {
      let rowCell = rowCells[i].nativeElement as HTMLElement;
      let headerCell = headerCells[i % headerCells.length];
      this.renderer.setStyle(rowCell, 'flex', headerCell.flex);
      headerCell.isCenter ? this.renderer.addClass(rowCell, 'center') : this.renderer.removeClass(rowCell, 'center');
    }
  }

  bindSorting() {
    let headerCells = this.headerCellElements.toArray();
    headerCells.forEach(headerCellElement => {
      let header = headerCellElement.nativeElement as HTMLElement;
      let field = header.getAttribute('field');
      if(field) header.onclick = () => {
        let toggle = this.sortField === field;
        let asc = this.sort$ && this.sort$.value && this.sort$.value.asc;
        this.sort$.next({field: field, asc: toggle ? !asc : true});
      };
    })
  }

  sortItems(items: any[], field = null, asc: boolean = true): any[] {
    if(!items || items.length == 0) return [];
    let sortedItems = [...items];
    this.sortField = field || this.sortField;

    if(this.sortField) {
      this.addSortClassToHeaderCell(asc);
      sortedItems.sort((a, b) => {
        if(asc) return a[this.sortField] <= b[this.sortField] ? -1 : 1;
        else return a[this.sortField] < b[this.sortField] ? 1 : -1;
      });
    }
    return sortedItems;
  }

  filterItems(items: any[], filter): any[]{
    if(!items || items.length == 0) return [];
    if(!filter) return items;
    let filteredItems = [];
    items.forEach(item => filteredItems.push({...item}));
    return filteredItems.filter(item =>
      Object.entries(item).some(entry => {
        const key = entry[0];
        const value = entry[1];
        const valueText = value.toString();
        const index = valueText.indexOf(filter);
        if(index == -1) return false;
        if(typeof value == 'string') {
          let highlightedValue = valueText.substring(0,index) + "<span class='highlight'>" + valueText.substring(index, index + filter.length) + "</span>" + valueText.substring(index + filter.length);
          item[key] = highlightedValue;
        }
        return true;
      })
    );
  }

  addSortClassToHeaderCell(asc: boolean) {
    if(!this.headerCellElements) return;
    this.headerCellElements.toArray();
    this.headerCellElements.forEach(cellElement => {
      let cell = cellElement.nativeElement as HTMLElement;
      const isTarget = cell.getAttribute('field') == this.sortField;
      this.renderer.removeClass(cell, 'des');
      this.renderer.removeClass(cell, 'asc');
      if(isTarget) this.renderer.addClass(cell, asc ? 'asc' : 'des');
    })
  }

  searchChanged($event: string) {
    this.search$.next($event);
  }
}
