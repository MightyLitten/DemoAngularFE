import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/users';
@Injectable({providedIn: 'root'})
export class UserService {

  constructor(private http: HttpClient) {}

  public get(id: any): Observable<User> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  public save(data: any) {
    return this.http.post<User>(baseUrl, data);
  }

  public update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  public delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  findByKeyword(keyword: any): Observable<User[]> {
    return this.http.get<User[]>(`${baseUrl}/search?keyword=${keyword}`);
  }
}