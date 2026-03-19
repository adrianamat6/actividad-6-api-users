import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsersService } from '../../services/users';
import { Router } from '@angular/router';
import { input } from '@angular/core';
import { inject } from '@angular/core';

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

    checkError(controlName: string, errorName: string): boolean | undefined {
      return this.userForm.get(controlName)?.hasError(errorName) && this.userForm.get(controlName)?.touched;
  }

  async addUser() {
    // Comprobamos si el formulario es valido
    if (this.userForm.invalid) return;

    try {
      const userId = this.id();
      
      // Copiamos los valores del formulario en una nueva variable
      const formData = { ...this.userForm.value };

      if (userId) {
        // ACTUALIZACIÓN DE USUARIO
        await this.userService.updateUser(userId, formData);
        await Swal.fire('Actualizado correctamente', 'Los datos se han guardado.', 'success');
      } else {
        //  CREACIÓN NUEVO USUARIO
        await this.userService.createUser(formData);
        await Swal.fire('Creado  correctamente', 'El usuario ha sido registrado.', 'success');
      }

      // Redireccionamos a home
      this.router.navigate(['/home']);

    } catch (error) {
      Swal.fire('Error', 'Hubo un problema al guardar los datos', 'error');
    }
  }

  async ngOnInit() {
    const userId = this.id();
    
    // Si viene un ID por la ruta, es que estamos actualizando
    if (userId) {
      this.tituloFormulario = 'ACTUALIZAR USUARIO';
      this.textoBoton = 'Actualizar';

      try {
        // Pedimos los datos del usuario a la API
        const userToEdit = await this.userService.getUserById(userId);
        
        if (userToEdit) {
          // Rellenamos el formulario de golpe con los datos de la API
          this.userForm.patchValue(userToEdit);
        }
      } catch (error) {
        console.error('Error al cargar el usuario para editar', error);
      }
    }
  }
}
