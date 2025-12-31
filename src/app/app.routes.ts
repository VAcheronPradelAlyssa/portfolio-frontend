import { Routes } from '@angular/router';
import { AccueilComponent } from './components/accueil/accueil';   
import { Cv } from './components/cv/cv';                
import { ProjetsComponent } from './components/projets/projets';  
import { Apropos } from './components/apropos/apropos'; 

export const routes: Routes = [
  { path: '', component: AccueilComponent },     
  { path: 'cv', component: Cv },      
  { path: 'projets', component: ProjetsComponent },  
  { path: 'apropos', component: Apropos }  
];