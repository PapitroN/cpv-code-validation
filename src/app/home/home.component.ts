import { Component } from '@angular/core';

import { ApiService } from '../services/api.service';
// @ts-ignore
import xlsxParser from 'xlsx-parse-json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {

  readonly TITLE = 'Cpv code search'
  readonly NO_MATCHES = 'Could not find a matching cpv code, try again.';
  readonly CODE = 'Code';
  readonly DESCRIPTION = 'Description';
  readonly SEARCH = 'Search';
  readonly INSERT = 'Enter a CPV code';

  searchText: any;
  descriptionValue: string | undefined;
  code: string | undefined;
  noMatchesFound: Boolean | undefined;

  constructor(private apiService: ApiService
  ) {
    this.noMatchesFound = false;
  }

  /**
   * Pass search param to
   * @param param
   */
  async codeSearch(param: string) {
    this.descriptionValue = '';
    this.code = '';
    this.noMatchesFound = false;
    this.apiService.codeListLookup(param).subscribe(res => {
      if(!res) {
        this.noMatchesFound = true;
      } else {
        this.descriptionValue = res.EN;
        this.code = res.CODE;
      }
    })
  }

}
