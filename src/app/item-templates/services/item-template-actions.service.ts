import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { SnackBarService } from "src/app/snack-bar/services/snack-bar.service";
import { environment } from "src/environments/environment";
import * as _ from "underscore";
import { ItemTemplateData } from "../models/item-template.data";
import { ItemTemplate } from "../models/item-template.model";
import { ItemTemplateService } from "./item-template.service";

@Injectable({
  providedIn: 'root'
})
export class ItemTemplateActionsService {

  constructor(
    private httpClient: HttpClient,
    private itemTemplateService: ItemTemplateService,
    private snackBarService: SnackBarService
  ) {

  }

  public index(): Observable<ItemTemplate[]> {
    return this.httpClient.get<ItemTemplateData[]>(
      environment.cmBaseUrl + '/item_templates'
    )
    .pipe(
      map(
        this.itemTemplateService.craftItemTemplates.bind(this.itemTemplateService)
      )
    );
  }

  public create(itemTemplateData: ItemTemplateData): Observable<ItemTemplateData> {
    return this.httpClient.post<ItemTemplateData>(
      environment.cmBaseUrl + '/item_templates',
      {
        item_template: itemTemplateData
      }
    )
    .pipe(
      tap(
        (itemTemplateData: ItemTemplateData): void => {
          this.snackBarService.ok('Item template #' + itemTemplateData.id + ' created.');
        }
      ),
      catchError(
        (httpErrorResponse: HttpErrorResponse): Observable<ItemTemplateData> => {
          this.snackBarService.bad('Could not create item template.', httpErrorResponse.error.errors);
          return throwError(httpErrorResponse.error);
        }
      )
    )
  }

  public update(itemTemplateData: ItemTemplateData): Observable<ItemTemplateData> {
    return this.httpClient.put<ItemTemplateData>(
      environment.cmBaseUrl + '/item_templates/' + itemTemplateData.id,
      {
        item_template: itemTemplateData
      }
    )
    .pipe(
      tap(
        (itemTemplateData: ItemTemplateData): void => {
          this.snackBarService.ok('Item template #' + itemTemplateData.id + ' updated.')
        }
      ),
      catchError(
        (httpErrorResponse: HttpErrorResponse): Observable<ItemTemplateData> => {
          this.snackBarService.bad('Could not update item template', httpErrorResponse.error.errors);
          return throwError(httpErrorResponse.error);
        }
      )
    );
  }

}
