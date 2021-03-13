import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { SystemInfo } from "../types/system-info.type";

@Injectable({
  providedIn: 'root'
})
export class SystemService implements OnInit {

  public systemInfo: SystemInfo;

  constructor(
    private httpClient: HttpClient
  ) {

  }

  ngOnInit(): void {

  }

  public fetch(): Observable<SystemInfo> {
    const observable: Observable<SystemInfo> = this.httpClient.get<SystemInfo>(
      environment.cmBaseUrl + '/system/info'
    );

    observable.subscribe(
      (systemInfo: SystemInfo): void => {
        this.systemInfo = systemInfo;
      }
    );

    return observable;
  }

}
