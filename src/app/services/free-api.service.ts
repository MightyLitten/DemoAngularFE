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

  getProvinceByIdAndDistrictList(id: any): Observable<any>{
    let param = new HttpParams().set('depth',2);
    return this.http.get("https://provinces.open-api.vn/api/p/"+id+"/",{params:param});
  }

  getDistrict(): Observable<any>{
    return this.http.get("https://provinces.open-api.vn/api/d/");
  }

  getDistrictById(id: any): Observable<any>{
    return this.http.get("https://provinces.open-api.vn/api/d/"+id);
  }

  getDistrictByIdAndWardList(id: any): Observable<any>{
    let param = new HttpParams().set('depth',2);
    return this.http.get("https://provinces.open-api.vn/api/d/"+id+"/",{params:param});
  }

  getWard(): Observable<any>{
    return this.http.get("https://provinces.open-api.vn/api/w/");
  }

  getWardById(id: any): Observable<any>{
    return this.http.get("https://provinces.open-api.vn/api/w/"+id);
  }
}
