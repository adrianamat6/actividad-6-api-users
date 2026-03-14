import { Component, input } from '@angular/core';
import { inject } from '@angular/core';
import { UsersService } from '../../services/users';
import { IUser } from '../../interfaces/iuser.interface';
import { signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-user-view',
  imports: [RouterLink],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css',
})
export class UserViewComponent {

  // Recolector de la ruta dinamica
  id = input<string>();  
 
  user = signal<IUser | null>(null);  
  userSevice = inject(UsersService); 

  async ngOnInit() {
    // 1. Recogemos el valor del ID en una constante
    const userId = this.id(); 

    // 2. Comprobamos si existe 
    if (userId) {
      try {
        const response = await this.userSevice.getUserById(userId);
        this.user.set(response); 
        console.log('Usuario cargado:', this.user()); 
      } catch (error) {
        console.error('Error al obtener el detalle del usuario', error); 
      }
    } else {
      // Opcional: Manejar el caso de que no venga ID
      console.warn('No se ha recibido ningún ID en la ruta');
    }
  }


async btnBorrarUsuario() {

  // Obtenemos el nombre para personalizar el mensaje (usando signal si aplica)
  const nombreUsuario = this.user()?.first_name;

  // 3. Lanzamos el popup de confirmación de SweetAlert2
  const result = await Swal.fire({
    title: '¿Estás seguro?',
    text: `Vas a eliminar al usuario ${nombreUsuario}.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33', // Color rojo para peligro
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  });
}

}
