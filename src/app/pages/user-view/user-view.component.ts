import { Component, input } from '@angular/core';
import { inject } from '@angular/core';
import { UsersService } from '../../services/users';
import { IUser } from '../../interfaces/iuser.interface';
import { signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-user-view',
  imports: [RouterLink],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css',
})
export class UserViewComponent {

  // Recoge el parámetro dinámico de la ruta (/user/:id)
  id = input<string>();  
 
  // Datos del usuario cargado desde la API
  user = signal<IUser | null>(null);  

  // El servicio 
  userSevice = inject(UsersService); 

  // Importamos tambien el router para redireccionar
  private router = inject(Router); 


  async ngOnInit() {
      const userId = this.id();
      
      if (!userId) return;

      try {
        const response = await this.userSevice.getUserById(userId);
        // Como el servicio puede devolver undefined por el try-catch, comprobamos
        if (response) {
          this.user.set(response);
        }
      } catch (error) {
        console.error('Error al obtener el detalle del usuario', error);
      }
    }


  async btnBorrarUsuario() {
    const userId = this.id();
    const nombre = this.user()?.first_name || 'este usuario';

    // Si no hay ID, salimos de la función
    if (!userId) return;

    // Llamamos a la sub-función de confirmación
    const confirmacion = await this.pedirConfirmacionBorrado(nombre);

    if (confirmacion) {
      await this.ejecutarBorrado(userId);
    }
  }

  // Función responsable solo de la UI (SweetAlert)
  private async pedirConfirmacionBorrado(nombre: string): Promise<boolean> {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: `Vas a eliminar al usuario ${nombre}.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });
    return result.isConfirmed;
  }

  // Función responsable de llamar al servicio y redireccionar
  private async ejecutarBorrado(id: string) {
    try {
     const response =  await this.userSevice.deleteUserById(id);

      console.log('Respuesta de la API al borrar:',response)
      
      // Feedback de éxito
      await Swal.fire('¡Eliminado!', 'El usuario ha sido borrado con éxito.', 'success');
      
      // Redirección
      this.router.navigate(['/home']);
    } catch (error) {
      Swal.fire('Error', 'No se ha podido borrar el usuario', 'error');
    }
  }
}
