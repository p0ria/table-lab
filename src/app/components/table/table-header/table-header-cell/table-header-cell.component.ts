import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-table-header-cell',
  templateUrl: './table-header-cell.component.html',
  styleUrls: ['./table-header-cell.component.scss']
})
export class TableHeaderCellComponent implements OnInit {
  @Input() field: string;
  @Input() @HostBinding('style.flex') flex: string = '1';
  @Input() @HostBinding('class.center') isCenter: boolean = false;

  ngOnInit(): void {
  }
}
