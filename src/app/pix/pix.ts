import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-pix-payment',
  templateUrl: './pix.html',
  styleUrls: ['./pix.css']
})
export class PixPaymentComponent implements OnInit {

  @ViewChild('qrcanvas', { static: true }) qrcanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('pixCode', { static: true }) pixCode!: ElementRef<HTMLDivElement>;
  @ViewChild('countdown', { static: true }) countdown!: ElementRef<HTMLDivElement>;

  countdownValue = 15 * 60; // 15 minutos

  ngOnInit(): void {
    this.pixCode.nativeElement.textContent = this.generateFakePixString();
    this.drawFakeQr(this.qrcanvas.nativeElement);
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

  drawFakeQr(canvas: HTMLCanvasElement, seed: number = Date.now()): void {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = '#000000';
    ctx.fillRect(16, 16, w - 32, h - 32);

    const cols = 21, rows = 21, cell = Math.floor((w - 32) / cols);
    ctx.fillStyle = '#ffffff';
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const noise = (Math.abs(Math.sin((c * 13 + r * 7 + seed * 0.0001))) * 1000) | 0;
        if (noise % 3 === 0) {
          ctx.fillRect(16 + c * cell, 16 + r * cell, cell - 2, cell - 2);
        }
      }
    }

    const corner = (x: number, y: number) => {
      const s = cell * 4;
      ctx.fillStyle = '#ffffff'; ctx.fillRect(x, y, s, s);
      ctx.fillStyle = '#000000'; ctx.fillRect(x + 6, y + 6, s - 12, s - 12);
      ctx.fillStyle = '#ffffff'; ctx.fillRect(x + 12, y + 12, s - 24, s - 24);
    };
    corner(16, 16);
    corner(w - 16 - cell * 4, 16);
    corner(16, h - 16 - cell * 4);
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

  downloadQr(): void {
    const url = this.qrcanvas.nativeElement.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pix_qr.png';
    a.click();
  }
}
