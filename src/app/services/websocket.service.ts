import { Injectable, OnInit } from '@angular/core';
import { Cable } from 'actioncable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService implements OnInit {

  public readonly cable: Cable = ActionCable.createConsumer(environment.cmBaseUrl + '/cable');

  constructor(
  ) {

  }

  ngOnInit(): void {

  }

}
