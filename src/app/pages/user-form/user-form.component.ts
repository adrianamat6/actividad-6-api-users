import { Component, input, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { IUser } from '../../interfaces/iuser.interface';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../../services/users';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {

  //Inyecciones y recogida de reta
  id = input<string>(); 
  userService = inject(UsersService);
  router = inject(Router); 


  // Variables dinámicas
  isUpdating: boolean = false; // true = actualizando o  false = creando nuevo usuario
  tituloFormulario: string = 'NUEVO USUARIO'; 
  textoBoton: string = 'Guardar'; 

  // Formulario 
  userForm: FormGroup; 
  urlPattern: string = '^(http|https)://.*$';
  emailPattern: string = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';

  constructor(){
    this.userForm = new FormGroup( {
      first_name: new FormControl('', [Validators.required, Validators.minLength(3)] ), 
      last_name: new FormControl('', [Validators.required, Validators.minLength(3)] ), 
      username: new FormControl('',[Validators.required]), 
      email: new FormControl('',[Validators.required, Validators.pattern(this.emailPattern)]),
      image: new FormControl('', [Validators.required, Validators.pattern(this.urlPattern)]) 
    })
  }

  // funcion auxiliar para el formulario
  checkError(controlName: string, errorName: string): boolean | undefined {
    return this.userForm.get(controlName)?.hasError(errorName) && this.userForm.get(controlName)?.touched;
  }



  /**
   * Inicialización: Detecta si el formulario es para crear o editar
   * basándose en si existe un ID en los parámetros de la ruta.
   */  
  async ngOnInit() {
    const userId = this.id();
    
    // Si hay ID, configuramos la interfaz en modo Actualizar
    if (userId) {
      this.isUpdating = true;
      this.tituloFormulario = 'ACTUALIZAR USUARIO';
      this.textoBoton = 'Actualizar';

      // Cargamos los datos del usuario para rellenar el formulario
      await this.loadUserData(userId);
    }
  }



  /**
   * Procesa el envío del formulario. Decide si debe crear un
   * nuevo registro o actualizar uno existente.
   */
  async addUser() {
    if (this.userForm.invalid) return;

    const formData = { ...this.userForm.value };
    try {
      if (this.isUpdating) {
        // Lógica de actualización
        await this.updateExistingUser(formData);
      } else {
        // Lógica de creación
        await this.createNewUser(formData);
      }
      this.router.navigate(['/home']);
      
    } catch (error) {
      Swal.fire('Error', 'Hubo un problema al procesar la solicitud', 'error');
    }
  }

  // --- MÉTODOS DE APOYO ----
  // Pide los datos de un usuario a la API y los inyecta en el formulario
  async loadUserData(userId: string) {
    try {
      const userToEdit = await this.userService.getUserById(userId);
      if (userToEdit) {
        this.userForm.patchValue(userToEdit);
      }
    } catch (error) {
      console.error('Error al recuperar el usuario:', error);
    }
  }
 // Llama al servicio para registrar un nuevo usuario 
  async createNewUser(data: IUser) {
    await this.userService.createUser(data);
    await Swal.fire('Creado correctamente', 'El usuario ha sido registrado.', 'success');
  }

  // Llama al servicio para actualizar los datos de un servicio existente
  async updateExistingUser(data: IUser) {
    const userId = this.id(); // Obtenemos el ID de la señal
    if (userId) {
      await this.userService.updateUser(userId, data);
      await Swal.fire('Actualizado correctamente', 'Los datos se han guardado.', 'success');
    }
  }

}
