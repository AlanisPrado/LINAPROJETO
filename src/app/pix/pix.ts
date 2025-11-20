import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pix-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pix.html',
  styleUrls: ['./pix.css']
})
export class PixPaymentComponent implements OnInit {

  qr: string = '/img/Assinatura/QR.png';
  showQrCode: boolean = false;

  @ViewChild('pixCode', { static: true }) pixCode!: ElementRef<HTMLDivElement>;
  @ViewChild('countdown', { static: true }) countdown!: ElementRef<HTMLDivElement>;

  countdownValue = 15 * 60; // 15 minutos

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.pixCode.nativeElement.textContent = this.generateFakePixString();
    this.startCountdown();
  }

  generateFakePixString(): string {
    const key = 'bruno@example.com';
    const amount = '5.99';
    const txid = Math.random().toString(36).slice(2, 10).toUpperCase();
    const merchant = 'Assinante';
    const city = 'Sao Paulo';
    const base = `00020126660014BR.GOV.BCB.PIX01${String(key.length).padStart(2, '0')}${key}520400005303986540${(amount.replace('.', '')).padStart(3, '0')}5802BR5909${merchant}6009${city}62${String(txid.length).padStart(2, '0')}${txid}6304`;
    const checksum = (Array.from(base).reduce((s, c) => s + c.charCodeAt(0), 0) % 10000)
      .toString(16)
      .toUpperCase()
      .slice(0, 4)
      .padStart(4, '0');
    return base + checksum;
  }


  startCountdown(): void {
    const interval = setInterval(() => {
      if (this.countdownValue <= 0) {
        this.countdown.nativeElement.textContent = 'Expirado';
        clearInterval(interval);
        return;
      }
      const mm = Math.floor(this.countdownValue / 60).toString().padStart(2, '0');
      const ss = (this.countdownValue % 60).toString().padStart(2, '0');
      this.countdown.nativeElement.textContent = `${mm}:${ss}`;
      this.countdownValue -= 1;
    }, 1000);
  }

  copyPix(): void {
    navigator.clipboard.writeText(this.pixCode.nativeElement.textContent || '');
  }

  showAndDownloadQr(): void {
    // Mostra o QR code
    this.showQrCode = true;

    // Aguarda a imagem carregar antes de baixar
    setTimeout(() => {
      this.downloadImageFromPath(this.qr);
    }, 200);
  }

  downloadImageFromPath(imagePath: string): void {
    try {
      // Busca a imagem
      fetch(imagePath)
        .then(response => response.blob())
        .then(blob => {
          // Cria uma URL temporária para o blob
          const url = window.URL.createObjectURL(blob);

          // Cria o link de download
          const a = document.createElement('a');
          a.href = url;
          a.download = 'QR.png';
          document.body.appendChild(a); // Adiciona ao DOM temporariamente
          a.click(); // Dispara o download

          // Limpa
          setTimeout(() => {
            document.body.removeChild(a); // Remove do DOM
            window.URL.revokeObjectURL(url); // Libera a URL do blob
          }, 100);
        })
        .catch(error => {
          console.error('Erro ao baixar imagem:', error);
          // Fallback: tenta baixar diretamente
          const a = document.createElement('a');
          a.href = imagePath;
          a.download = 'QR.png';
          a.target = '_blank';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        });
    } catch (error) {
      console.error('Erro ao baixar QR code:', error);
    }
  }

  downloadQr(): void {
    if (!this.showQrCode) {
      this.showAndDownloadQr();
      return;
    }

    // Baixa a imagem real do QR code
    this.downloadImageFromPath(this.qr);
  }

  voltar(): void {
    this.router.navigate(['/assinatura']);
  }
}
