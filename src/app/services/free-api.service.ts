import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FreeAPIService {

  constructor(private http: HttpClient) { }

  getProvince(): Observable<any>{
    return this.http.get("https://provinces.open-api.vn/api/p/");
  }
  getProvinceById(id: any): Observable<any>{
    return this.http.get("https://provinces.open-api.vn/api/p/"+id);
  }

  getDistrict(): Observable<any>{
    return this.http.get("https://provinces.open-api.vn/api/d/");
  }

  getDistrictById(id: any): Observable<any>{
    return this.http.get("https://provinces.open-api.vn/api/d/"+id);
  }

  getWard(): Observable<any>{
    return this.http.get("https://provinces.open-api.vn/api/w/");
  }

  getWardById(id: any): Observable<any>{
    return this.http.get("https://provinces.open-api.vn/api/w/"+id);
  }
}
