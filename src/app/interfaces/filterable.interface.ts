import {EventEmitter} from "@angular/core";
import {Observable} from "rxjs";

export interface Filterable<T> {
  filter: (item: T) => boolean;
  filterChanged: Observable<boolean>;
}
