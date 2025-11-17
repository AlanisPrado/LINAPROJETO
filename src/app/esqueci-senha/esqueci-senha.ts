import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-esqueci-senha',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './esqueci-senha.html',
  styleUrl: './esqueci-senha.css'
})
export class EsqueciSenha {
  email = '';
  mensagemEnviada = false;

  handleReset(event: Event) {
    event.preventDefault();

    if (!this.email || !this.email.includes('@') || !this.email.includes('.')) {
      alert('Por favor, insira um e-mail válido.');
      return;
    }
    this.mensagemEnviada = true;
  }
}

