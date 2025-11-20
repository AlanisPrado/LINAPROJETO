import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface OpcaoSelecionada {
  nome: string;          // Ex: "Omelete com Vegetais"
  descricao: string;     // Ex: "Omelete leve com vegetais frescos"
  periodoNome: string;   // Ex: "Café da Manhã"
  diaNome: string;       // Ex: "Segunda-feira"
}

const STORAGE_KEY = 'lina_cardapio_semanal';

@Injectable({
  providedIn: 'root'
})
export class CardapioService {
  // Estrutura: { [diaNome: string]: OpcaoSelecionada[] }
  private cardapioSemanal = new BehaviorSubject<Record<string, OpcaoSelecionada[]>>({});
  cardapioSemanal$ = this.cardapioSemanal.asObservable();

  constructor() {
    // Carrega dados salvos do localStorage ao inicializar
    this.carregarDoStorage();
  }

  /**
   * Carrega dados do localStorage
   */
  private carregarDoStorage() {
    try {
      const dadosSalvos = localStorage.getItem(STORAGE_KEY);
      if (dadosSalvos) {
        const cardapio = JSON.parse(dadosSalvos);
        this.cardapioSemanal.next(cardapio);
        console.log('📦 Cardápio carregado do storage:', cardapio);
      }
    } catch (error) {
      console.error('Erro ao carregar cardápio do storage:', error);
    }
  }

  /**
   * Salva dados no localStorage
   */
  private salvarNoStorage() {
    try {
      const cardapio = this.cardapioSemanal.value;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cardapio));
      console.log('💾 Cardápio salvo no storage');
    } catch (error) {
      console.error('Erro ao salvar cardápio no storage:', error);
    }
  }

  /**
   * Adiciona ou atualiza a refeição escolhida para um dia e período
   */
  adicionarOuAtualizarRefeicao(diaNome: string, periodoNome: string, opcao: { nome: string; descricao: string }) {
    const atual = this.cardapioSemanal.value;

    // Garante que o dia exista
    if (!atual[diaNome]) {
      atual[diaNome] = [];
    }

    // Remove se já existir uma refeição para o mesmo período
    const dia = atual[diaNome].filter(r => r.periodoNome !== periodoNome);

    // Adiciona a nova refeição selecionada
    dia.push({
      nome: opcao.nome,
      descricao: opcao.descricao,
      periodoNome,
      diaNome
    });

    // Atualiza o BehaviorSubject com uma nova referência (importante!)
    const novoCardapio = {
      ...atual,
      [diaNome]: dia
    };
    this.cardapioSemanal.next(novoCardapio);

    // Salva no localStorage
    this.salvarNoStorage();

    console.log('📅 Refeição salva:', diaNome, periodoNome, opcao.nome);
  }

  /**
   * Remove a refeição de um dia e período específicos
   */
  removerRefeicao(diaNome: string, periodoNome: string) {
    const atual = this.cardapioSemanal.value;

    if (!atual[diaNome]) {
      return; // Não há refeições para este dia
    }

    // Remove a refeição do período especificado
    const dia = atual[diaNome].filter(r => r.periodoNome !== periodoNome);

    // Atualiza o BehaviorSubject
    const novoCardapio = {
      ...atual,
      [diaNome]: dia
    };
    this.cardapioSemanal.next(novoCardapio);

    // Salva no localStorage
    this.salvarNoStorage();

    console.log('🗑️ Refeição removida:', diaNome, periodoNome);
  }

  /**
   * Retorna a refeição selecionada para um dia e período específicos
   */
  getRefeicaoSelecionada(diaNome: string, periodoNome: string): OpcaoSelecionada | null {
    const cardapio = this.cardapioSemanal.value;
    const refeicoesDoDia = cardapio[diaNome] || [];
    return refeicoesDoDia.find(r => r.periodoNome === periodoNome) || null;
  }

  /** Retorna o cardápio atual (útil para debug ou salvar em storage) */
  getCardapioAtual() {
    return this.cardapioSemanal.value;
  }
}
