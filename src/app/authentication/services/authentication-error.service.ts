import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as _ from 'underscore';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationErrorService {

  public errorMessage(httpErrorResponse: HttpErrorResponse): string[] {
    if (httpErrorResponse.status === 0) {
      return ['Server seems to be offline'];
    }

    if (_.isArray(httpErrorResponse.error.errors)) {
      return httpErrorResponse.error.errors;
    }
    else if (_.isObject(httpErrorResponse.error.errors)) {
      const keys: string[] = _.filter(
        _.keys(httpErrorResponse.error.errors),
        (key: string): boolean => key != 'full_messages'
      );

      return _.map(
        keys,
        function(key) {
          return key + ' ' + httpErrorResponse.error.errors[key];
        }
      );
    }

    return ['Unknown error'];
  }

}
