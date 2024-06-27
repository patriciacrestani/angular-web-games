import { Routes } from '@angular/router';
import { SolitaireComponent } from './solitaire/solitaire.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path:'',
        component: HomeComponent
    },
    {
        path: 'solitaire',
        component: SolitaireComponent
    }
];
