import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Constants } from "../types/constants.type";

@Injectable({
  providedIn: 'root'
})
export class ConstantsService implements OnInit {

  public constants: Constants;

  constructor(
    private httpClient: HttpClient
  ) {

  }

  ngOnInit(): void {
  }

  public fetch(): Observable<Constants> {
    const observable: Observable<Constants> = this.httpClient.get<Constants>(
      environment.cmBaseUrl + '/constants'
    );

    observable.subscribe(
      (constants: Constants): void => {
        this.constants = constants;;
      }
    );

    return observable;
  }

}
