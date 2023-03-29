import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { District } from '../models/district';

const baseUrl = 'http://localhost:8080/d';
@Injectable({ providedIn: 'root' })
export class DistrictService {

  constructor(private http: HttpClient) { }

  public save(data: any) {
    return this.http.post<District>(baseUrl, data);
  }
  public saveAll(data: any[]) {
    return this.http.post<District[]>(baseUrl + "/list", data);
  }

  public getDistrict(): Observable<any>  {
    return this.http.get(baseUrl);
  }
  public getDistrictById(id: any): Observable<any>  {
    return this.http.get(baseUrl + "/" + id);
  }

  public getDistrictByIdAndWardList(id: any): Observable<any>  {
    let param = new HttpParams().set('depth', 2);
    return this.http.get(baseUrl + "/" + id + "/", { params: param })
  }
}
