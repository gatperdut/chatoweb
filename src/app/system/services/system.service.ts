import { HttpClient } from "@angular/common/http";
import { Injectable, OnDestroy, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { SystemInfo } from "../types/system-info.type";

@Injectable({
  providedIn: 'root'
})
export class SystemService implements OnInit {

  public systemInfoSubject: BehaviorSubject<SystemInfo> = new BehaviorSubject<SystemInfo>(null);

  constructor(
    private httpClient: HttpClient
  ) {

  }

  ngOnInit(): void {
  }

  public fetch(): void {
    this.httpClient.get<SystemInfo>(
      environment.cmBaseUrl + '/system/info'
    )
    .subscribe(
      (systemInfo: SystemInfo): void => {
        this.systemInfoSubject.next(systemInfo);
      }
    );
  }

}
