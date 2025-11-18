import { Routes } from '@angular/router'; 
import { TelaAssinaturaComponent } from './tela-assinatura/tela-assinatura';
import { Home } from './home/home';
import { Lista } from './lista/lista';
import { Nutricionistas } from './nutricionistas/nutricionistas';
import { CardapioSemanalComponent } from './cardapio-semanal/cardapio-semanal'; 
import { MeuCardapioComponent } from "./meu-cardapio/meu-cardapio";


export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'lista', component: Lista },
  { path: 'nutricionistas', component: Nutricionistas },
  { path: 'assinatura', component: TelaAssinaturaComponent },
  { path: 'cardapio', component: CardapioSemanalComponent },
  { path: 'meu-cardapio', component: MeuCardapioComponent },

  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
