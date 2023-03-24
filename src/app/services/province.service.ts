import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Province } from '../models/province';

const baseUrl = 'http://localhost:8080/provinces';
@Injectable({providedIn: 'root'})
export class ProvinceService {

  constructor(private http: HttpClient) { }

  public save(data: any) {
    return this.http.post<Province>(baseUrl, data);
  }

  public saveAll(data: any[]) {
    return this.http.post<Province[]>(baseUrl+"/list", data);
  }

}
