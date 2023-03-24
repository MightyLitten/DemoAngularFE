import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { District } from '../models/district';

const baseUrl = 'http://localhost:8080/districts';
@Injectable({providedIn: 'root'})
export class DistrictService {

  constructor(private http: HttpClient) { }

  public save(data: any) {
    return this.http.post<District>(baseUrl, data);
  }
  public saveAll(data: any[]) {
    return this.http.post<District[]>(baseUrl+"/list", data);
  }
}
