import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { StoresComponent } from './pages/stores/stores.component';
import { ProfessionalsComponent } from './pages/professionals/professionals.component';


export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'lojas', component: StoresComponent },
    { path: 'profissionais', component: ProfessionalsComponent }
];
