import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { Constants } from "./types/constants.type";

@Injectable({
  providedIn: 'root'
})
export class ConstantsService implements OnInit {

  public constantsSubject: BehaviorSubject<Constants> = new BehaviorSubject<Constants>(null);

  constructor(
    private httpClient: HttpClient
  ) {

  }

  ngOnInit(): void {
  }

  public fetch(): void {
    this.httpClient.get<Constants>(
      environment.cmBaseUrl + '/constants'
    )
    .subscribe(
      (constants: Constants): void => {
        this.constantsSubject.next(constants);
      }
    );
  }

}
