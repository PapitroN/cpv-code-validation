import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
// @ts-ignore
import xlsxParser from 'xlsx-parse-json';

@Injectable()
export class ApiService {

  // readonly path = 'assets/cpv-codes/cpv_2008_ver_2013.xlsx'
  readonly url = 'assets/cpv-codes/cpv-codes.json'

  constructor(private http: HttpClient) {

  }

  /**
   * Search cpv-codes for matching code and return description to component.
   * @param param
   */
  codeListLookup(param: any): Observable<any> {
    return this.http.get(this.url) .pipe(
      map( response => {
        // @ts-ignore
        const cpvCodes = response['CPV codes'];
        // @ts-ignore
        const supplementaryCodes = response["Supplementary codes"]
        /**
         * Look for match in Cpv code list
         */
        for(const code of cpvCodes) {
          if(code.CODE === param) {
            response = code
            return response
          }
        }
        /**
         * Look for match in supplementary code list
         */
        for(const code of supplementaryCodes) {
          if(code.CODE === param) {
            response = code
            return response
          }
        }
        return false;
      }),
      catchError( error => {
        return throwError(error);
      })
    );
  }

  // /**
  //  * Get the code list from project assets as xlsx.
  //  */
  // getXlsxCodeList(): Observable<Blob> {
  //   return this.http.get(this.path, {responseType: 'blob'})
  // }
  //
  // /**
  //  * parse file to Json and save to disk
  //  */
  // saveFileAsJson() {
  //   this.getXlsxCodeList().subscribe((file) => {
  //     xlsxParser
  //       .onFileSelection(file)
  //       .then((data: any) => {
  //         const blob = new Blob([JSON.stringify(data)], {type : 'application/json'});
  //         saveAs(blob, 'cpv-data.json');
  //       });
  //   })
  // }

}
