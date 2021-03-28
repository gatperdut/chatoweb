import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { ItemTemplate } from "../models/item-template.model";
import { ItemTemplateService } from "../services/item-template.service";

@Injectable({
  providedIn: 'root'
})
export class ItemTemplatesResolver implements Resolve<ItemTemplate[]> {

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private itemTemplateService: ItemTemplateService
  ) {

  }

  resolve(activatedRouteSnapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot): (Observable<ItemTemplate[]> | ItemTemplate[]) {
    return this.httpClient.get<ItemTemplate[]>(
      environment.cmBaseUrl + '/item_templates'
    )
    .pipe(
      map(
        this.itemTemplateService.craftItemTemplates.bind(this.itemTemplateService),
        (httpErrorResponse: HttpErrorResponse): Observable<ItemTemplate[]> => {
          this.router.navigate(['/']);
          return throwError(httpErrorResponse);
        }
      )
    );
  }

}
