import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { UsersService } from '../../services/users';
import { IUser, IUserResponse } from '../../interfaces/iuser.interface';
import { signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import Swal from 'sweetalert2';


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

      // Asignamos los datos al signal creado
      this.listaUsuarios.set(response.results);
      
    } catch (error) {
      // Manejo de errores 
      console.error('Error al obtener los usuarios:', error);
    }
  }

  // FUNCION PARA BORRAR DESDE EL LISTADO
  async procesarBorrado(id: string) {
    const usuario = this.listaUsuarios().find(u => u._id === id);
    const nombre = usuario?.first_name || 'usuario';

    const result = await Swal.fire({
      title: '¿Confirmar borrado?',
      text: `¿Seguro que quieres eliminar a ${nombre} del listado?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar'
    });

    if (result.isConfirmed) {
      try {
        await this.userService.deleteUserById(id);
        // Actualizamos la lista y la tarjeta desaparece
        this.listaUsuarios.update(usuarios => usuarios.filter(u => u._id !== id));
        Swal.fire('¡Eliminado!', 'Usuario borrado de la lista.', 'success');
      } catch (error) {
        Swal.fire('Error', 'No se pudo borrar', 'error');
      }
    }
  }
}



