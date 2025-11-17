import { Routes } from '@angular/router';
import { TelaAssinaturaComponent } from './tela-assinatura/tela-assinatura';
import { Home } from './home/home';
import { Lista } from './lista/lista';
import { Nutricionistas } from './nutricionistas/nutricionistas';
import { LoginCadastro } from './login-cadastro/login-cadastro';
import { EsqueciSenha } from './esqueci-senha/esqueci-senha';
import { CasdastroLogin } from './casdastro-login/casdastro-login';
import { PixPaymentComponent } from './pix/pix';
import { BoletoComponent } from './boleto/boleto';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'login', component: LoginCadastro },
  { path: 'senha', component: EsqueciSenha },
  { path: 'cadastrar', component: CasdastroLogin },
  { path: 'lista', component: Lista },
  { path: 'nutricionistas', component: Nutricionistas },
  { path: 'assinatura', component: TelaAssinaturaComponent }, // <--- importante
  { path: 'boleto', component: BoletoComponent },
  { path: 'pix', component: PixPaymentComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
