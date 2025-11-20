import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tela-ativa',
  standalone: true,
  templateUrl: './tela-ativa.html',
  styleUrls: ['./tela-ativa.css']
})
export class TelaAtivaComponent {

  constructor(private router: Router) {}

  cancelarAssinatura() {
    this.router.navigate(['/assinatura']);
  }
}
