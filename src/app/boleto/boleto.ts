import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-boleto',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './boleto.html',
  styleUrls: ['./boleto.css']
})
export class BoletoComponent {
  nome = '';
  cpf = '';
  email = '';
  boletoGerado = false;

  constructor(private router: Router) {}

  gerarBoleto() {
    if (this.nome && this.cpf && this.email) {
      this.boletoGerado = true;
    } else {
      alert('Por favor, preencha todos os campos antes de gerar o boleto.');
    }
  }

  voltar() {
    this.router.navigate(['/assinatura']);
  }
}
