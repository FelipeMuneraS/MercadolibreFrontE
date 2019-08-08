import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpAPIService {
  apiRoot = 'https://api.mercadolibre.com/';
  items: any = null;
  sellers: any = null;
  constructor(private httpClient: HttpClient) { }

  getItems(name: string): Observable<any> {
    return this.httpClient.get(this.apiRoot + 'sites/MCO/search?q=' + name);
  }

  getSeller(id: string): Observable<any> {
    return this.httpClient.get(this.apiRoot + 'users/' + id);
  }
}
