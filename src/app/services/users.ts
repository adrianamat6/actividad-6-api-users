import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { IUser, IUserResponse } from '../interfaces/iuser.interface';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private httpClient = inject(HttpClient);
  private baseUrl = 'https://peticiones.online/api/users';
 
  getAll(page: number = 1): Promise<IUserResponse> {
    return  lastValueFrom(this.httpClient.get<IUserResponse>(`${this.baseUrl}?page=${page}`));
  }
 
  getUserById(id: string): Promise<IUser> {
    return  lastValueFrom(this.httpClient.get<IUser>(`${this.baseUrl}/${id}`));
  }
 
  deleteUserById(id: string): Promise<any> {
    return  lastValueFrom(this.httpClient.delete<any>(`${this.baseUrl}/${id}`));
  }
 
  createUser(user: IUser): Promise<IUser> {
    return  lastValueFrom(this.httpClient.post<IUser>(this.baseUrl, user));
  }
 
  updateUser(id: string, user: IUser): Promise<IUser> {
    return  lastValueFrom(this.httpClient.put<IUser>(`${this.baseUrl}/${id}`, user));
  }
}
