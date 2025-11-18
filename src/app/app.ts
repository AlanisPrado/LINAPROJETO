import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <!-- HEADER -->
    <header class="app-header">
      <div class="logo">
        <img src="https://i.imgur.com/W7BLjsE.png" alt="Lina Logo">
        <div class="titulo">
          <h1>
            <span class="nome">Lina</span>
            <span class="premium">Premium</span>
          </h1>
          <p class="saudacao">Olá, Usuario!</p>
        </div>
      </div>

      <nav class="menu">
        <a routerLink="/home" routerLinkActive="ativo"><i class="icon"></i> Início</a>
        <a routerLink="/cardapio" routerLinkActive="ativo"><i class="icon"></i> Criar Cardápio</a>
        <a routerLink="/meu-cardapio" routerLinkActive="ativo"><i class="icon"></i> Cardápio</a>
        <a routerLink="/lista" routerLinkActive="ativo"><i class="icon"></i> Lista de Compras</a>
        <a routerLink="/nutricionistas" routerLinkActive="ativo"><i class="icon"></i> Nutricionistas</a>
        <a routerLink="/assinatura" routerLinkActive="ativo"><i class="icon"></i> Assinatura</a>
      </nav>
    </header>

    <!-- CONTEÚDO -->
    <main class="content">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    /* ----- HEADER ----- */
    .app-header {
      font-family: sans-serif;
      padding: 20px;
      background-color: #fff;
      border-bottom: 1px solid #e5e5e5;
      display: flex;
      flex-direction: column; /* empilha logo e menu verticalmente */
      align-items: flex-start; /* tudo à esquerda */
      gap: 10px;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .logo img {
      width: 40px;
      height: 40px;
      border-radius: 10px;
    }

    .titulo h1 {
      margin: 0;
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 1.3rem;
    }

    .nome {
      color: #1a73e8;
      font-weight: 600;
    }

    .premium {
      background-color: #28a745;
      color: white;
      padding: 3px 8px;
      border-radius: 6px;
      font-size: 0.7rem;
      font-weight: bold;
    }

    .saudacao {
      font-size: 0.8rem;
      color: #555;
      margin: 0;
    }

    /* ----- MENU ----- */
    .menu {
      display: flex; /* links lado a lado */
      gap: 10px; /* espaço entre links */
    }

    .menu a {
      background: none;
      border: none;
      padding: 6px 10px;
      font-size: 0.95rem;
      cursor: pointer;
      color: #444;
      display: flex;
      align-items: center;
      gap: 6px;
      border-radius: 6px;
      transition: all 0.2s ease;
      text-decoration: none;
    }

    .menu a:hover {
      background-color: #f2f6ff;
    }

    .menu .ativo {
      background-color: #e7f0ff;
      color: #1a73e8;
      font-weight: 600;
    }

    /* ----- CONTEÚDO ----- */
    .content {
      padding: 20px;
      background-color: #fafafa;
    }
  `]
})
export class App {}
