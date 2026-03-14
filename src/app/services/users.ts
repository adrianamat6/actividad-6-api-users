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


  async getAll(): Promise <IUserResponse> {
  // Convertimos el Observable a Promesa y pedimos los datos
  return await lastValueFrom(this.httpClient.get<IUserResponse>(this.baseUrl));
  }; 

  async getUserById(id:string): Promise <IUser | undefined >{
    try{
      return await lastValueFrom(this.httpClient.get<IUser>(`${this.baseUrl}/${id}`)); 
    }catch(error){
      console.error(`Error  al obtener el usuario con id ${id}:`, error);
      return undefined; 
    }
  }

  async deleteUserById(id: string): Promise<any> {
    try{
          return await lastValueFrom(this.httpClient.delete<any>(`${this.baseUrl}/${id}`));
    }catch(error){
      console.error(`Error técnico al eliminar el usuario con id ${id}:`, error);
    }
}


}

