import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ward } from '../models/ward';

const baseUrl = 'http://localhost:8080/wards';
@Injectable({providedIn: 'root'})
export class WardService {

  constructor(private http: HttpClient) { }

  public save(data: any) {
    return this.http.post<Ward>(baseUrl, data);
  }

  public saveAll(data: any[]) {
    return this.http.post<Ward[]>(baseUrl+"/list", data);
  }
}
