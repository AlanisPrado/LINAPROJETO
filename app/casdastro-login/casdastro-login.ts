import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface User {
  name: string;
  email: string;
  password: string;
  restrictions: {
    diabetic: boolean;
  };
}

@Component({
  selector: 'app-casdastro-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './casdastro-login.html', // confirme que o arquivo existe com esse nome
  styleUrls: ['./casdastro-login.css'],
})
export class CasdastroLogin {
  imgLogo: string = 'https://i.imgur.com/W7BLjsE.png';

  @Output() onLogin = new EventEmitter<string>();

  // Controle de abas
  activeTab: 'login' | 'register' = 'register';

  // Campos de login
  loginEmail = '';
  loginPassword = '';

  // Campos de registro
  registerName = '';
  registerEmail = '';
  registerPassword = '';
  isDiabetic = false;

  constructor(private router: Router) {}

  onForgotPassword() {
    alert('Redefinição de senha: implemente fluxo de recuperação (enviar email / abrir modal).');
  }

  handleLogin(event: Event) {
    event.preventDefault();

    const users: User[] = JSON.parse(localStorage.getItem('linaUsers') || '[]');
    const user = users.find(
      u => u.email === this.loginEmail && u.password === this.loginPassword
    );

    if (user) {
      this.onLogin.emit(this.loginEmail);
      // Redireciona para home após login
      this.router.navigate(['/home']);
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

    // Redireciona para home após registro
    this.router.navigate(['/home']);
  }
}
