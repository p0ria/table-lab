import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  Input, OnChanges,
  OnInit,
  QueryList,
  Renderer2, SimpleChanges
} from '@angular/core';
import {TableHeaderCellComponent} from "./table-header/table-header-cell/table-header-cell.component";
import {TableRowCellComponent} from "./table-row/table-row-cell/table-row-cell.component";

const ascClass = 'asc';
const desClass = 'des';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit, AfterViewInit, OnChanges{
  @Input() sort: string;
  @Input() items = [];
  @ContentChildren(TableHeaderCellComponent, {descendants: true}) headerCellComponents: QueryList<TableHeaderCellComponent>;
  @ContentChildren(TableRowCellComponent, {descendants: true, read: ElementRef}) rowCellElements: QueryList<ElementRef>;
  @ContentChildren(TableHeaderCellComponent, {descendants: true, read: ElementRef}) headerCellElements: QueryList<ElementRef>;

  private sortField: string;
  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.updateRows();
    this.rowCellElements.changes.subscribe(() => {
      this.updateRows();
    });
    this.bindSorting();
    this.sortBy()
  }

  updateRows() {
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
      if(field) header.onclick = () => this.sortBy(field, true);
    })
  }

  private lt = -1;
  sortBy(field = null, toggle: boolean = false) {
    toggle = toggle && this.sortField === field;
    this.sortField = field || this.sortField;
    if(toggle) this.lt = -1 * this.lt;

    if(this.sortField) {
      this.addSortClassToHeaderCell(this.lt < 0);
      this.items.sort((a, b) => {
        if(this.lt < 0) return a[this.sortField] <= b[this.sortField] ? -1 : 1;
        else return a[this.sortField] < b[this.sortField] ? 1 : -1;
      });
    }
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

  ngOnChanges(changes: SimpleChanges): void {
    this.sortBy(changes.sort? changes.sort.currentValue : null);
  }

}
