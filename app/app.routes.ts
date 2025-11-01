import { Routes } from '@angular/router';
import { TelaAssinaturaComponent } from './tela-assinatura/tela-assinatura';
import { Home } from './home/home';
import { Lista } from './lista/lista';
import { Nutricionistas } from './nutricionistas/nutricionistas';


export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'lista', component: Lista },
  { path: 'nutricionistas', component: Nutricionistas },
  { path: 'assinatura', component: TelaAssinaturaComponent }, // <--- importante

  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
