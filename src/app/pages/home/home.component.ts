import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { UsersService } from '../../services/users';
import { IUser, IUserResponse } from '../../interfaces/iuser.interface';
import { signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserCardComponent } from '../../components/user-card/user-card.component';

@Component({
  selector: 'app-home',
  imports: [RouterLink, UserCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

  userService = inject(UsersService);

  listaUsuarios = signal<IUser[]>([]);


  async ngOnInit() {
    try {
      // El servicio debe retornar una promesa
      const response = await this.userService.getAll();
      console.log('DATOS RECIBIDOS DE LA API:', response);

      // Asignamos los datos al signal creado
      this.listaUsuarios.set(response.results);
      console.log('CONTENIDO DEL SIGNAL:', this.listaUsuarios());

      
    } catch (error) {
      // 5. Manejo de errores con console.error (manía de "Clean Code" del profesor) [11, 12]
      console.error('Error al obtener los usuarios:', error);
    }
  }
}
