import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardapioService } from '../services/cardapio';

interface Opcao {
  nome: string;
  descricao: string;
  selecionado?: boolean;
}

interface Periodo {
  nome: string;
  icone: string;
  opcoes: Opcao[];
}

interface DiaSemana {
  nome: string;
  periodos: Periodo[];
  refeicoesSelecionadas: number;
}

@Component({
  selector: 'app-cardapio-semanal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cardapio-semanal.html',
  styleUrls: ['./cardapio-semanal.css']
})
export class CardapioSemanalComponent implements OnInit {

  // 2. Injete o serviço no construtor
  constructor(private cardapioService: CardapioService) { }

  diasSemana: DiaSemana[] = [
    this.criarDia('Segunda-feira'),
    this.criarDia('Terça-feira'),
    this.criarDia('Quarta-feira'),
    this.criarDia('Quinta-feira'),
    this.criarDia('Sexta-feira'),
    this.criarDia('Sábado'),
    this.criarDia('Domingo'),
  ];

  ngOnInit() {
    // Carrega as seleções já feitas do serviço
    this.carregarSelecoesSalvas();

    // Observa mudanças no cardápio para atualizar a interface
    this.cardapioService.cardapioSemanal$.subscribe(() => {
      this.carregarSelecoesSalvas();
    });
  }

  /**
   * Carrega as seleções já salvas e marca as opções correspondentes
   */
  carregarSelecoesSalvas() {
    const cardapioAtual = this.cardapioService.getCardapioAtual();

    this.diasSemana.forEach(dia => {
      const refeicoesDoDia = cardapioAtual[dia.nome] || [];

      dia.periodos.forEach(periodo => {
        const refeicaoSalva = refeicoesDoDia.find(r => r.periodoNome === periodo.nome);

        // Limpa todas as seleções do período
        periodo.opcoes.forEach(opcao => {
          opcao.selecionado = false;
        });

        // Marca a opção salva como selecionada
        if (refeicaoSalva) {
          const opcaoEncontrada = periodo.opcoes.find(
            opcao => opcao.nome === refeicaoSalva.nome
          );
          if (opcaoEncontrada) {
            opcaoEncontrada.selecionado = true;
          }
        }
      });

      // Atualiza o contador de refeições selecionadas
      const totalSelecionadas = dia.periodos.filter(p =>
        p.opcoes.some(o => o.selecionado)
      ).length;
      dia.refeicoesSelecionadas = totalSelecionadas;
    });
  }

  // Função que gera o mesmo conteúdo para cada dia (MANTIDO)
  private criarDia(nome: string): DiaSemana {
    return {
      nome,
      refeicoesSelecionadas: 0,
      periodos: [
        // ... (Seus períodos e opções originais)
        {
          nome: 'Café da Manhã',
          icone: '☕',
          opcoes: [
            { nome: 'Smoothie de Frutas Vermelhas', descricao: 'Smoothie nutritivo com frutas vermelhas e leite de amêndoa' },
            { nome: 'Omelete com Vegetais', descricao: 'Omelete leve com vegetais frescos' },
            { nome: 'Pão Integral com Abacate', descricao: 'Torrada integral com abacate e ovo pochê' }
          ]
        },
        {
          nome: 'Almoço',
          icone: '🌞',
          opcoes: [
            { nome: 'Peixe Assado com Batata Doce', descricao: 'Filé de peixe assado com batata doce e vegetais' },
            { nome: 'Frango Grelhado com Quinoa', descricao: 'Peito de frango grelhado com quinoa e legumes salteados' },
            { nome: 'Salmão com Batata Doce', descricao: 'Salmão assado com batata doce e salada verde' }
          ]
        },
        {
          nome: 'Café da Tarde',
          icone: '🍪',
          opcoes: [
            { nome: 'Chips de Batata Doce', descricao: 'Chips crocantes de batata doce assados' },
            { nome: 'Castanhas e Frutas', descricao: 'Mix de castanhas com maçã verde' },
            { nome: 'Vitamina de Abacate', descricao: 'Vitamina de abacate com leite desnatado' }
          ]
        },
        {
          nome: 'Jantar',
          icone: '🌙',
          opcoes: [
            { nome: 'Berinjela Recheada', descricao: 'Berinjela assada recheada com quinoa e vegetais' },
            { nome: 'Sopa de Legumes', descricao: 'Sopa nutritiva de legumes com frango desfiado' },
            { nome: 'Peixe ao Forno', descricao: 'Filé de peixe branco ao forno com ervas e legumes' }
          ]
        }
      ]
    };
  }

  selecionarOpcao(dia: DiaSemana, periodo: Periodo, opcao: Opcao) {
    periodo.opcoes.forEach(o => (o.selecionado = false));
    opcao.selecionado = true;

    const totalSelecionadas = dia.periodos.filter(p =>
      p.opcoes.some(o => o.selecionado)
    ).length;

    dia.refeicoesSelecionadas = totalSelecionadas;

    // 3. CHAMA O SERVIÇO PARA SALVAR A INFORMAÇÃO!
    this.cardapioService.adicionarOuAtualizarRefeicao(
      dia.nome,
      periodo.nome,
      opcao
    );
  }

  /**
   * Deseleciona uma opção com duplo clique
   */
  deselecionarOpcao(dia: DiaSemana, periodo: Periodo, opcao: Opcao, event: Event) {
    // Previne que o evento se propague e dispare o click simples
    event.stopPropagation();

    // Só deseleciona se a opção estiver selecionada
    if (opcao.selecionado) {
      opcao.selecionado = false;

      // Remove do serviço
      this.cardapioService.removerRefeicao(dia.nome, periodo.nome);

      // Atualiza o contador
      const totalSelecionadas = dia.periodos.filter(p =>
        p.opcoes.some(o => o.selecionado)
      ).length;
      dia.refeicoesSelecionadas = totalSelecionadas;
    }
  }
}
