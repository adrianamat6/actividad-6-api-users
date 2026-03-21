import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { UsersService } from '../../services/users';
import { IUser, IUserResponse } from '../../interfaces/iuser.interface';
import { signal } from '@angular/core';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-home',
  imports: [UserCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

  userService = inject(UsersService);


  listaUsuarios = signal<IUser[]>([]);
  paginaActual = signal<number>(1); // Guardamos la pagina
  totalPaginas = signal<number>(1); // Guardamos el total de páginas

  async ngOnInit() {
    // Al arrancar, cargamos la página que tenga el signal por defecto (la 1)
    await this.cargarPagina(this.paginaActual());
  }

  // FUNCIÓN REUTILIZABLE DE CARGA
  async cargarPagina(page: number) {
    try {
      const response = await this.userService.getAll(page);
      
      // Actualizamos todos los signals con los datos nuevos
      this.listaUsuarios.set(response.results);
      this.paginaActual.set(response.page);
      this.totalPaginas.set(response.total_pages);
      
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    }
  }

  // FUNCIONES PARA LOS BOTONES DE PAGINACIÓN
  paginaAnterior() {
    if (this.paginaActual() > 1) {
      this.cargarPagina(this.paginaActual() - 1);
    }
  }

  paginaSiguiente() {
    if (this.paginaActual() < this.totalPaginas()) {
      this.cargarPagina(this.paginaActual() + 1);
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



