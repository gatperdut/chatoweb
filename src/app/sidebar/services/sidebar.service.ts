import { ThisReceiver } from '@angular/compiler';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService implements OnInit {

  public readonly sidebarSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  ngOnInit(

  ) {

  }

  public open(): void {
    this.sidebarSubject.next(true);
  }

  public close(): void {
    this.sidebarSubject.next(false);
  }

  public toggle(): void {
    if (this.isOpen()) {
      this.close();
    }
    else {
      this.open();
    }
  }

  public isOpen(): boolean {
    return this.sidebarSubject.value;
  }

  public isClosed(): boolean {
    return !this.sidebarSubject.value;
  }

}
