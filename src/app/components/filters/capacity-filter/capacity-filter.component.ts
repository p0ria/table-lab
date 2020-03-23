import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Item} from "../../../interfaces/item.interface";
import {Filterable} from "../../../interfaces/filterable.interface";
import {BehaviorSubject, Observable} from "rxjs";

@Component({
  selector: 'app-capacity-filter',
  templateUrl: './capacity-filter.component.html',
  styleUrls: ['./capacity-filter.component.scss']
})
export class CapacityFilterComponent implements Filterable<Item>, OnInit {
  @Output() filterChanged = new BehaviorSubject<boolean>(false);

  private isAvailableChecked = true;
  private isUnAvailableChecked = false;

  ngOnInit(): void {
    this.trigger();
  }

  trigger() {
    let isFiltered = !this.isAvailableChecked || !this.isUnAvailableChecked;
    this.filterChanged.next(isFiltered);
  }

  filter = (item: Item): boolean => {
    if(this.isAvailableChecked && this.isUnAvailableChecked) return true;
    if(this.isAvailableChecked) if(item.capacity == 'موجود') return true;
    if(this.isUnAvailableChecked) if(item.capacity == 'ناموجود') return true;
    return false;
  };

  availableCheckChanged(checked: boolean) {
    this.isAvailableChecked = checked;
    this.trigger();
  }

  unAvailableCheckChanged(checked: boolean) {
    this.isUnAvailableChecked = checked;
    this.trigger();
  }
}
