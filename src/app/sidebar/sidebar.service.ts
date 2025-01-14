import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private isExpandedSubject = new BehaviorSubject<boolean>(false); // Default collapsed state
  isExpanded$ = this.isExpandedSubject.asObservable();

   toggleSidebar() {
    const currentValue = this.isExpandedSubject.value;
    this.isExpandedSubject.next(!currentValue); // Toggle the state
  }

  get isExpanded(): boolean {
    return this.isExpandedSubject.value;
  }
}
