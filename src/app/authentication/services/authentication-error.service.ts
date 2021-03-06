import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationErrorService {

  public errorMessage(httpErrorResponse: HttpErrorResponse): string {
    if (httpErrorResponse.status === 0) {
      return 'Server seems to be offline';
    }

    if (httpErrorResponse.error.errors) {
      return httpErrorResponse.error.errors[0];
    }

    return 'Unknown error';
  }

}
