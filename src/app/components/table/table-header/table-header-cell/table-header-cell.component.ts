import {
  AfterContentInit,
  Component,
  ContentChild,
  HostBinding,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import {TableHeaderCellFilterComponent} from "./table-header-cell-filter/table-header-cell-filter.component";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-table-header-cell',
  templateUrl: './table-header-cell.component.html',
  styleUrls: ['./table-header-cell.component.scss']
})
export class TableHeaderCellComponent implements OnInit, OnDestroy, AfterContentInit {
  @Input() field: string;
  @Input() @HostBinding('style.flex') flex: string = '1';
  @Input() @HostBinding('class.center') isCenter: boolean = false;
  @ContentChild(TableHeaderCellFilterComponent, {static: true}) filterComponent: TableHeaderCellFilterComponent;

  @HostBinding('class.filter-active')
  private isFiltered: boolean = false;
  private filterChangedSub: Subscription;
  @HostBinding('class.filter')
  private isFilterable: boolean = false;
  @HostBinding('class.filter-open')
  private isFilterOpen: boolean = false;

  constructor(){}

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    if(this.filterComponent) {
      this.isFilterable = true;
      this.filterChangedSub = this.filterComponent.filter.filterChanged.subscribe(
        event => this.isFiltered = event);
    }
  }

  ngOnDestroy(): void {
    if(this.filterChangedSub) this.filterChangedSub.unsubscribe();
  }

  toggleFilterOpen(event: MouseEvent) {
    event.stopPropagation();
    this.isFilterOpen = !this.isFilterOpen;
  }
}
