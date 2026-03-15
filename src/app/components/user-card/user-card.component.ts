import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IUser } from '../../interfaces/iuser.interface';
import { input, output } from '@angular/core';

@Component({
  selector: 'app-user-card',
  imports: [RouterLink],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css',
})
export class UserCardComponent {

  user = input<IUser>(); 
  
  // Emite el _id del usuario cuando se pulsa borrar
  borrarUsuario = output<string>();

   onBorrarClick() {
    const id = this.user()?._id;
    if (id) {
      this.borrarUsuario.emit(id);
    }
  }
}
