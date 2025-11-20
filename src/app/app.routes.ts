import { Routes } from '@angular/router';
import { TelaAssinaturaComponent } from './tela-assinatura/tela-assinatura';
import { Home } from './home/home';
import { Lista } from './lista/lista';
import { Nutricionistas } from './nutricionistas/nutricionistas';
import { CardapioSemanalComponent } from './cardapio-semanal/cardapio-semanal';
import { MeuCardapioComponent } from "./meu-cardapio/meu-cardapio";
import { Registrar } from './Registrar/Registrar';
import { Entrar } from './Entrar/Entrar';
import { EsqueciSenha } from './esqueci-senha/esqueci-senha';
import { PixPaymentComponent } from './pix/pix';
import { TelaAtivaComponent } from './tela-ativa/tela-ativa';
import { BoletoComponent } from './boleto/boleto';


export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'lista', component: Lista },
  { path: 'nutricionistas', component: Nutricionistas },
  { path: 'assinatura', component: TelaAssinaturaComponent },
  { path: 'pix', component: PixPaymentComponent },
  { path: 'ativa', component: TelaAtivaComponent },
  { path: 'boleto', component: BoletoComponent },
  { path: 'cardapio', component: CardapioSemanalComponent },
  { path: 'meu-cardapio', component: MeuCardapioComponent },
  { path: 'Registrar', component: Registrar },
  { path: 'Entrar', component: Entrar },
  { path: 'senha', component: EsqueciSenha },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
