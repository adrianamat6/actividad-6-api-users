import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {

  userForm: FormGroup; 

  emailPattern: string = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';
  constructor(){
    this.userForm = new FormGroup( {
      first_name: new FormControl('', [Validators.required, Validators.minLength(3)] ), 
      last_name: new FormControl('', [Validators.required, Validators.minLength(3)] ), 
      username: new FormControl('',[Validators.required]), 
      email: new FormControl('',[Validators.required, Validators.pattern(this.emailPattern)]),
      image: new FormControl('', [Validators.required]) 
    })
  }

    checkError(controlName: string, errorName: string): boolean | undefined {
      return this.userForm.get(controlName)?.hasError(errorName) && this.userForm.get(controlName)?.touched;
  }

  addUser() {
    console.log("Valores del formulario:", this.userForm.value);
  }
  
}
