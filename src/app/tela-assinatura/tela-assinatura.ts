import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-tela-assinatura',
  standalone: true, 
  imports: [FormsModule], 
  templateUrl: './tela-assinatura.html',
  styleUrls: ['./tela-assinatura.css']
})
export class TelaAssinaturaComponent {
  cardNumber = '';
  cardName = '';
  validade = '';
  cvv = '';

  errors = {
    cardNumber: '',
    cardName: '',
    validade: '',
    cvv: ''
  };

  constructor(private router: Router) {}

  formatCardNumber(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    this.cardNumber = value.substring(0, 19);
  }

  formatValidade(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    this.validade = value.substring(0, 5);
  }

  validateForm(): boolean {
    let valid = true;

    // Limpa mensagens anteriores
    this.errors = { cardNumber: '', cardName: '', validade: '', cvv: '' };

    // Validação número do cartão
    if (!/^\d{4} \d{4} \d{4} \d{4}$/.test(this.cardNumber)) {
      this.errors.cardNumber = 'Número do cartão inválido (use formato XXXX XXXX XXXX XXXX)';
      valid = false;
    }

    // Validação nome
    if (!/^[A-Za-zÀ-ÿ\s]+$/.test(this.cardName) || this.cardName.trim().length < 3) {
      this.errors.cardName = 'Nome inválido (use apenas letras)';
      valid = false;
    }

    // Validação validade
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(this.validade)) {
      this.errors.validade = 'Validade inválida (use formato MM/AA)';
      valid = false;
    }

    // Validação CVV
    if (!/^\d{3}$/.test(this.cvv)) {
      this.errors.cvv = 'CVV inválido (3 números)';
      valid = false;
    }

    return valid;
  }

  assinar() {
    if (this.validateForm()) {
      // Simula pagamento confirmado
      this.router.navigate(['/ativa']);
    }
  }
}
