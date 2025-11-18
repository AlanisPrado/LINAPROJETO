import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  name: string;
  email: string;
  password: string;
  restrictions: {
    diabetic: boolean;
  };
}

@Component({
  selector: 'app-login-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-cadastro.html',
  styleUrl: './login-cadastro.css',
})
export class LoginCadastro {

  imgLogo: string = 'Img/login-cadastro/LOGO - LINA.png';


  @Output() onLogin = new EventEmitter<string>();

  // Controle de abas
  activeTab: 'login' | 'register' = 'login';
  /*Aqui está definido que activeTab começa com o valor 'login', então a aba "Entrar" vem ativa por padrão.*/

  /*Para mudar e começar com "Registrar", altere a linha 29 de login.ts para:*/



  // Campos de login
  loginEmail = '';
  loginPassword = '';

  // Campos de registro
  registerName = '';
  registerEmail = '';
  registerPassword = '';
  isDiabetic = false;

  onForgotPassword() {
    // Exemplo: apenas mostra um alert. Substitua pela navegação/modal desejado.
    alert('Redefinição de senha: implemente fluxo de recuperação (enviar email / abrir modal).');
    // ou: this.router.navigate(['/forgot-password']);
  }

  handleLogin(event: Event) {
    event.preventDefault();

    const users: User[] = JSON.parse(localStorage.getItem('linaUsers') || '[]');
    const user = users.find(
      u => u.email === this.loginEmail && u.password === this.loginPassword
    );

    if (user) {
      this.onLogin.emit(this.loginEmail);
    } else {
      alert('Email ou senha incorretos');
    }
  }

  handleRegister(event: Event) {
    event.preventDefault();

    const users: User[] = JSON.parse(localStorage.getItem('linaUsers') || '[]');
    const userExists = users.find(u => u.email === this.registerEmail);

    if (userExists) {
      alert('Este email já está cadastrado');
      return;
    }

    const newUser: User = {
      name: this.registerName,
      email: this.registerEmail,
      password: this.registerPassword,
      restrictions: {
        diabetic: this.isDiabetic
      }
    };

    users.push(newUser);
    localStorage.setItem('linaUsers', JSON.stringify(users));
    this.onLogin.emit(this.registerEmail);
  }
}

