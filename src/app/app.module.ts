import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import {NgModule, Sanitizer} from '@angular/core';

import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component';
import { TableRowComponent } from './components/table/table-row/table-row.component';
import { TableRowCellComponent } from './components/table/table-row/table-row-cell/table-row-cell.component';
import { TableHeaderCellComponent } from './components/table/table-header/table-header-cell/table-header-cell.component';
import { TableHeaderComponent } from './components/table/table-header/table-header.component';
import { TableBodyComponent } from './components/table/table-body/table-body.component';
import { TableSearchComponent } from './components/table/table-search/table-search.component';
import {DalahooTableModule} from "ng-dalahoo-table";
import { HighlightMatchDirective } from './directives/highlight-match.directive';
import {TableHeaderCellFilterComponent} from "./components/table/table-header/table-header-cell/table-header-cell-filter/table-header-cell-filter.component";
import { CapacityFilterComponent } from './components/filters/capacity-filter/capacity-filter.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    TableRowComponent,
    TableRowCellComponent,
    TableHeaderCellComponent,
    TableHeaderComponent,
    TableBodyComponent,
    TableSearchComponent,
    HighlightMatchDirective,
    TableHeaderCellFilterComponent,
    CapacityFilterComponent,
    ClickOutsideDirective,
  ],
  imports: [
    BrowserModule,
    DalahooTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
