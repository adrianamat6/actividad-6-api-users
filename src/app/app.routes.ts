import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserViewComponent } from './pages/user-view/user-view.component';
import { UserFormComponent } from './pages/user-form/user-form.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'user/:id', component: UserViewComponent},   // Ruta dinámica para detalle
    { path: 'newuser', component: UserFormComponent},    // Ruta para crear
    { path: 'updateuser/:id', component: UserFormComponent},  // Ruta para editar
    { path: '**', redirectTo: 'home' } // Comodín para errores 404
];
