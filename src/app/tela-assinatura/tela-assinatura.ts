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

  mostrarPix = false;
  mostrarBoleto = false;

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
    if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2, 4);
    this.validade = value.substring(0, 5);
  }

  validateForm(): boolean {
    let valid = true;
    this.errors = { cardNumber: '', cardName: '', validade: '', cvv: '' };

    if (!/^\d{4} \d{4} \d{4} \d{4}$/.test(this.cardNumber)) {
      this.errors.cardNumber = 'Número do cartão inválido';
      valid = false;
    }

    if (!/^[A-Za-zÀ-ÿ\s]+$/.test(this.cardName) || this.cardName.trim().length < 3) {
      this.errors.cardName = 'Nome inválido';
      valid = false;
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(this.validade)) {
      this.errors.validade = 'Validade inválida';
      valid = false;
    }

    if (!/^\d{3}$/.test(this.cvv)) {
      this.errors.cvv = 'CVV inválido';
      valid = false;
    }

    return valid;
  }

  assinar() {
    if (this.validateForm()) {
      this.router.navigate(['/ativa']);
    }
  }

 abrirPix() {
  this.router.navigate(['/pix']);
}

abrirBoleto() {
  this.router.navigate(['/boleto']);
}

}
