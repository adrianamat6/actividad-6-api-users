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
 
  async getAll(): Promise<IUserResponse> {
    return await lastValueFrom(this.httpClient.get<IUserResponse>(this.baseUrl));
  }
 
  async getUserById(id: string): Promise<IUser> {
    return await lastValueFrom(this.httpClient.get<IUser>(`${this.baseUrl}/${id}`));
  }
 
  async deleteUserById(id: string): Promise<any> {
    return await lastValueFrom(this.httpClient.delete<any>(`${this.baseUrl}/${id}`));
  }
 
  async createUser(user: Omit<IUser, '_id' | 'id'>): Promise<IUser> {
    return await lastValueFrom(this.httpClient.post<IUser>(this.baseUrl, user));
  }
 
  async updateUser(id: string, user: Omit<IUser, '_id' | 'id'>): Promise<IUser> {
    return await lastValueFrom(this.httpClient.put<IUser>(`${this.baseUrl}/${id}`, user));
  }
}
