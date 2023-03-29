import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Province } from '../models/province';

const baseUrl = 'http://localhost:8080/p';
@Injectable({ providedIn: 'root' })
export class ProvinceService {

  constructor(private http: HttpClient) { }

  public save(data: any) {
    return this.http.post<Province>(baseUrl, data);
  }

  public saveAll(data: any[]) {
    return this.http.post<Province[]>(baseUrl + "/list", data);
  }

  public getProvince(): Observable<any> {
    return this.http.get(baseUrl);
  }
  public getProvinceById(id: any): Observable<any> {
    return this.http.get(baseUrl + "/" + id);
  }

  public getProvinceByIdAndDistrictList(id: any): Observable<any> {
    let param = new HttpParams().set('depth', 2);
    return this.http.get(baseUrl + "/" + id + "/", { params: param });
  }

}
