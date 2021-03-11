import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService implements OnInit {

  public readonly sidebarSubject: Subject<void> = new Subject<void>();

  constructor() { }

  ngOnInit(

  ) {

  }

  public toggle(): void {
    this.sidebarSubject.next();
  }

}
