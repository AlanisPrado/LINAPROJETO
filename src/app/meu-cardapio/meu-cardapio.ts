// meu-cardapio.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardapioService, OpcaoSelecionada } from '../services/cardapio'; // <-- Ajuste o caminho se necessário!
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Definimos o tipo de dado que virá do serviço
interface RefeicaoExibicao {
  nome: string;
  prato: string;
  icone: string;
  cor: string;
}

// Interface para receitas
interface Receita {
  nome: string;
  periodoNome: string;
  adequadoPara: string[];
  ingredientes: string[];
  modoPreparo: string;
}

@Component({
  selector: 'app-meu-cardapio',
  // CORREÇÃO: Adicionando 'standalone: true' e movendo o CommonModule para 'imports'
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meu-cardapio.html',
  styleUrls: ['./meu-cardapio.css'],
})
export class MeuCardapioComponent implements OnInit {
  // Dados para os botões do menu - usando os mesmos nomes do cardapio-semanal
  diasSemana: string[] = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];
  diaSelecionado: string = 'Segunda-feira';

  // Onde armazenaremos o cardápio lido do serviço. Usa o pipe 'async' no HTML.
  cardapioDoDia$!: Observable<Record<string, RefeicaoExibicao>>;

  // Estrutura fixa para os períodos do dia (baseado na sua imagem)
  periodosDoDia: RefeicaoExibicao[] = [
    { nome: 'Café da Manhã', icone: '☕', cor: '#fff7ed', prato: 'Adicionar Refeição' },
    { nome: 'Almoço', icone: '🍽️', cor: '#ecfdf5', prato: 'Adicionar Refeição' },
    { nome: 'Café da Tarde', icone: '🍪', cor: '#fff7ed', prato: 'Adicionar Refeição' },
    { nome: 'Jantar', icone: '🌙', cor: '#eef2ff', prato: 'Refeição' },
  ];

  // Estrutura para armazenar as refeicoes escolhidas
  refeicoes: Record<string, RefeicaoExibicao> = {};

  // Contador de refeições planejadas
  totalRefeicoesPlanejadas: number = 0;

  // Estado do modal de receita
  modalReceitaAberto: boolean = false;
  receitaAtual: Receita | null = null;
  periodoAtual: string = '';

  // Estado do modal de seleção de receitas
  modalSelecaoAberto: boolean = false;
  periodoParaSelecionar: string = '';
  opcoesReceitas: Array<{ nome: string; descricao: string; ingredientes: string[] }> = [];

  // Base de dados de receitas
  receitas: Record<string, Receita> = {};

  // Opções de receitas por período (baseado no cardapio-semanal)
  opcoesPorPeriodo: Record<string, Array<{ nome: string; descricao: string; ingredientes: string[] }>> = {};

  // INJEÇÃO: Injetamos o CardapioService
  constructor(private router: Router, private cardapioService: CardapioService) {
    this.inicializarReceitas();
    this.inicializarOpcoesPorPeriodo();
  }

  /**
   * Inicializa o banco de dados de receitas
   */
  inicializarReceitas() {
    this.receitas = {
      'Smoothie de Frutas Vermelhas': {
        nome: 'Smoothie de Frutas Vermelhas',
        periodoNome: 'Café da Manhã',
        adequadoPara: ['Sem Glúten', 'Sem Lactose', 'Vegano'],
        ingredientes: [
          '1 xícara de frutas vermelhas congeladas',
          '1/2 xícara de leite de amêndoa',
          '1 colher de sopa de mel',
          '1 colher de chá de sementes de chia'
        ],
        modoPreparo: 'Coloque todos os ingredientes no liquidificador e bata até ficar homogêneo. Sirva imediatamente.'
      },
      'Omelete com Vegetais': {
        nome: 'Omelete com Vegetais',
        periodoNome: 'Café da Manhã',
        adequadoPara: ['Sem Glúten', 'Low Carb'],
        ingredientes: [
          '2 unidades de ovos',
          '1/2 xícara de tomate picado',
          '1/4 xícara de cebola picada',
          '1/4 xícara de pimentão picado',
          '1 colher de sopa de azeite',
          'a gosto de sal'
        ],
        modoPreparo: 'Bata os ovos em uma tigela. Aqueça o azeite em uma frigideira. Adicione os legumes e refogue. Despeje os ovos e cozinhe até firmar.'
      },
      'Pão Integral com Abacate': {
        nome: 'Pão Integral com Abacate',
        periodoNome: 'Café da Manhã',
        adequadoPara: ['Sem Lactose'],
        ingredientes: [
          '2 fatias de pão integral',
          '1/2 abacate maduro',
          '1 ovo pochê',
          'a gosto de sal e pimenta',
          'suco de limão'
        ],
        modoPreparo: 'Toste o pão. Amasse o abacate com sal, pimenta e suco de limão. Espalhe sobre o pão e coloque o ovo pochê por cima.'
      },
      'Peixe Assado com Batata Doce': {
        nome: 'Peixe Assado com Batata Doce',
        periodoNome: 'Almoço',
        adequadoPara: ['Sem Glúten', 'Low Carb'],
        ingredientes: [
          '1 filé de peixe (300g)',
          '1 batata doce média',
          '1/2 xícara de brócolis',
          '1 colher de sopa de azeite',
          'alho, sal e pimenta a gosto'
        ],
        modoPreparo: 'Tempere o peixe com alho, sal e pimenta. Corte a batata doce em rodelas. Coloque tudo em uma assadeira, regue com azeite e asse a 200°C por 25 minutos.'
      },
      'Frango Grelhado com Quinoa': {
        nome: 'Frango Grelhado com Quinoa',
        periodoNome: 'Almoço',
        adequadoPara: ['Sem Glúten', 'Sem Lactose'],
        ingredientes: [
          '1 peito de frango (200g)',
          '1/2 xícara de quinoa cozida',
          '1/2 xícara de legumes salteados',
          '1 colher de sopa de azeite',
          'temperos a gosto'
        ],
        modoPreparo: 'Tempere o frango e grelhe até dourar. Cozinhe a quinoa conforme instruções da embalagem. Salteie os legumes. Sirva tudo junto.'
      },
      'Salmão com Batata Doce': {
        nome: 'Salmão com Batata Doce',
        periodoNome: 'Almoço',
        adequadoPara: ['Sem Glúten', 'Low Carb'],
        ingredientes: [
          '1 filé de salmão (200g)',
          '1 batata doce média',
          '1 xícara de salada verde',
          '1 colher de sopa de azeite',
          'limão e ervas a gosto'
        ],
        modoPreparo: 'Tempere o salmão com limão e ervas. Asse a batata doce. Grelhe o salmão por 4 minutos de cada lado. Sirva com a salada.'
      },
      'Chips de Batata Doce': {
        nome: 'Chips de Batata Doce',
        periodoNome: 'Café da Tarde',
        adequadoPara: ['Sem Glúten', 'Sem Lactose', 'Vegano'],
        ingredientes: [
          '1 batata doce média',
          '1 colher de sopa de azeite',
          'sal e pimenta a gosto',
          'orégano (opcional)'
        ],
        modoPreparo: 'Corte a batata doce em fatias finas. Misture com azeite, sal e pimenta. Espalhe em uma assadeira e asse a 180°C por 20 minutos, virando na metade do tempo.'
      },
      'Castanhas e Frutas': {
        nome: 'Castanhas e Frutas',
        periodoNome: 'Café da Tarde',
        adequadoPara: ['Sem Glúten', 'Sem Lactose', 'Vegano'],
        ingredientes: [
          '1/4 xícara de castanhas variadas',
          '1 maçã verde',
          '1 colher de sopa de uvas passas (opcional)'
        ],
        modoPreparo: 'Corte a maçã em fatias. Misture com as castanhas e sirva. Simples e nutritivo!'
      },
      'Vitamina de Abacate': {
        nome: 'Vitamina de Abacate',
        periodoNome: 'Café da Tarde',
        adequadoPara: ['Sem Glúten', 'Sem Lactose'],
        ingredientes: [
          '1/2 abacate',
          '1 xícara de leite desnatado',
          '1 colher de sopa de mel',
          'gelo a gosto'
        ],
        modoPreparo: 'Bata todos os ingredientes no liquidificador até ficar cremoso. Sirva gelado.'
      },
      'Berinjela Recheada': {
        nome: 'Berinjela Recheada',
        periodoNome: 'Jantar',
        adequadoPara: ['Sem Glúten', 'Vegano'],
        ingredientes: [
          '1 berinjela média',
          '1/2 xícara de quinoa cozida',
          '1/4 xícara de tomate picado',
          '1/4 xícara de cebola picada',
          'azeite, sal e pimenta'
        ],
        modoPreparo: 'Corte a berinjela ao meio e retire parte da polpa. Refogue a polpa com os outros ingredientes. Recheie a berinjela e asse a 180°C por 30 minutos.'
      },
      'Sopa de Legumes': {
        nome: 'Sopa de Legumes',
        periodoNome: 'Jantar',
        adequadoPara: ['Sem Glúten', 'Sem Lactose', 'Vegano'],
        ingredientes: [
          '2 xícaras de legumes variados picados',
          '1/2 xícara de frango desfiado (opcional)',
          '1 litro de caldo de legumes',
          'sal e pimenta a gosto',
          'ervas frescas'
        ],
        modoPreparo: 'Refogue os legumes. Adicione o caldo e cozinhe até os legumes ficarem macios. Adicione o frango (se usar) e tempere. Sirva com ervas frescas.'
      },
      'Peixe ao Forno': {
        nome: 'Peixe ao Forno',
        periodoNome: 'Jantar',
        adequadoPara: ['Sem Glúten', 'Low Carb'],
        ingredientes: [
          '1 filé de peixe branco (300g)',
          '1/2 xícara de legumes variados',
          '1 colher de sopa de azeite',
          'limão, alho, sal e pimenta'
        ],
        modoPreparo: 'Tempere o peixe com limão, alho, sal e pimenta. Coloque em uma assadeira com os legumes, regue com azeite e asse a 200°C por 20 minutos.'
      }
    };
  }

  /**
   * Inicializa as opções de receitas por período
   */
  inicializarOpcoesPorPeriodo() {
    this.opcoesPorPeriodo = {
      'Café da Manhã': [
        {
          nome: 'Smoothie de Frutas Vermelhas',
          descricao: 'Smoothie nutritivo com frutas vermelhas e leite de amêndoa',
          ingredientes: ['frutas vermelhas', 'leite de amêndoa', 'mel', 'sementes de chia']
        },
        {
          nome: 'Omelete com Vegetais',
          descricao: 'Omelete leve com vegetais frescos',
          ingredientes: ['ovos', 'tomate picado', 'cebola picada', 'pimentão picado', 'azeite']
        },
        {
          nome: 'Pão Integral com Abacate',
          descricao: 'Torrada integral com abacate e ovo pochê',
          ingredientes: ['pão integral', 'abacate', 'ovo pochê', 'sal e pimenta']
        }
      ],
      'Almoço': [
        {
          nome: 'Peixe Assado com Batata Doce',
          descricao: 'Filé de peixe assado com batata doce e vegetais',
          ingredientes: ['filé de peixe', 'batata doce', 'brócolis', 'azeite', 'alho']
        },
        {
          nome: 'Frango Grelhado com Quinoa',
          descricao: 'Peito de frango grelhado com quinoa e legumes salteados',
          ingredientes: ['peito de frango', 'quinoa', 'legumes variados', 'azeite']
        },
        {
          nome: 'Salmão com Batata Doce',
          descricao: 'Salmão assado com batata doce e salada verde',
          ingredientes: ['filé de salmão', 'batata doce', 'salada verde', 'limão', 'ervas']
        }
      ],
      'Café da Tarde': [
        {
          nome: 'Chips de Batata Doce',
          descricao: 'Chips crocantes de batata doce assados',
          ingredientes: ['batata doce', 'azeite', 'sal e pimenta', 'orégano']
        },
        {
          nome: 'Castanhas e Frutas',
          descricao: 'Mix de castanhas com maçã verde',
          ingredientes: ['castanhas variadas', 'maçã verde', 'uvas passas']
        },
        {
          nome: 'Vitamina de Abacate',
          descricao: 'Vitamina de abacate com leite desnatado',
          ingredientes: ['abacate', 'leite desnatado', 'mel', 'gelo']
        }
      ],
      'Jantar': [
        {
          nome: 'Berinjela Recheada',
          descricao: 'Berinjela assada recheada com quinoa e vegetais',
          ingredientes: ['berinjela', 'quinoa', 'tomate', 'cebola', 'azeite']
        },
        {
          nome: 'Sopa de Legumes',
          descricao: 'Sopa nutritiva de legumes com frango desfiado',
          ingredientes: ['legumes variados', 'frango desfiado', 'caldo de legumes', 'ervas']
        },
        {
          nome: 'Peixe ao Forno',
          descricao: 'Filé de peixe branco ao forno com ervas e legumes',
          ingredientes: ['filé de peixe branco', 'legumes variados', 'azeite', 'limão', 'alho']
        }
      ]
    };
  }

 ngOnInit(): void {
  // Observa as alterações no cardápio
  this.cardapioService.cardapioSemanal$.subscribe(cardapio => {
    // Atualiza o contador total de refeições planejadas
    this.atualizarContadorRefeicoes(cardapio);

    const refeicoesDoDia = cardapio[this.diaSelecionado];

    if (refeicoesDoDia) {
      // Atualiza a refeição salva
      refeicoesDoDia.forEach(r => {
        const periodo = this.periodosDoDia.find(p => p.nome === r.periodoNome);
        if (periodo) {
          this.refeicoes[r.periodoNome] = {
            nome: periodo.nome,
            icone: periodo.icone,
            cor: periodo.cor,
            prato: r.nome
          };
        }
      });
    }

    // Recarrega o cardápio do dia atual
    this.carregarCardapioDoDia();
  });

  this.carregarCardapioDoDia();
}

/**
 * Atualiza o contador total de refeições planejadas
 */
atualizarContadorRefeicoes(cardapio: Record<string, any[]>) {
  let total = 0;
  Object.values(cardapio).forEach(refeicoesDoDia => {
    if (Array.isArray(refeicoesDoDia)) {
      total += refeicoesDoDia.length;
    }
  });
  this.totalRefeicoesPlanejadas = total;
}


  carregarCardapioDoDia() {
  this.cardapioDoDia$ = this.cardapioService.cardapioSemanal$.pipe(
    map(cardapioCompleto => {
      console.log('DEBUG: cardapioCompleto (raw):', cardapioCompleto);

      // Proteção: se cardapioCompleto não for um objeto, transforma em objeto vazio
      if (!cardapioCompleto || typeof cardapioCompleto !== 'object') {
        return this.criarResultadoPadrao();
      }

      // Obtém as refeições do dia selecionado. Pode ser undefined -> usa array vazio.
      const refeicoesDoDia = cardapioCompleto[this.diaSelecionado] ?? [];
      console.log(`DEBUG: refeicoesDoDia para ${this.diaSelecionado}:`, refeicoesDoDia);

      // Se refeicoesDoDia não for array, trata como vazio e loga aviso
      if (!Array.isArray(refeicoesDoDia)) {
        console.warn(`WARN: esperava um array para ${this.diaSelecionado} mas recebeu:`, refeicoesDoDia);
        return this.criarResultadoPadrao();
      }

      const resultado: Record<string, RefeicaoExibicao> = {};

      // Monta o resultado a partir das refeições salvas
      refeicoesDoDia.forEach(refeicaoSalva => {
        // Segurança: garante que refeicaoSalva existe e tem as propriedades esperadas
        if (!refeicaoSalva || !refeicaoSalva.periodoNome) {
          console.warn('WARN: refeicaoSalva inválida encontrada:', refeicaoSalva);
          return; // pula este item
        }

        const periodoNome = refeicaoSalva.periodoNome;
        const pratoNome = refeicaoSalva.nome ?? 'Adicionar Refeição';
        const info = this.getIconeCor(periodoNome);

        resultado[periodoNome] = {
          nome: periodoNome,
          prato: pratoNome,
          icone: info.icone,
          cor: info.cor
        };
      });

      // Preenche com padrão os períodos que ainda não têm prato
      this.periodosDoDia.forEach(p => {
        if (!resultado[p.nome]) {
          resultado[p.nome] = { ...p }; // copia o padrão (Adicionar Refeição)
        }
      });

      console.log('DEBUG: resultado mapeado para exibição:', resultado);
      return resultado;
    })
  );
}

getIconeCor(periodoNome: string) {
  const periodoEncontrado = this.periodosDoDia.find(p => p.nome === periodoNome);
  if (periodoEncontrado) {
    return { icone: periodoEncontrado.icone, cor: periodoEncontrado.cor };
  }
  // Valor padrão se não encontrar o período
  return { icone: '🍽️', cor: '#CCCCCC' };
}
  selecionarDia(dia: string) {
    this.diaSelecionado = dia;
    this.carregarCardapioDoDia(); // Recarrega o cardápio para o novo dia
  }

  /**
   * Retorna o nome curto do dia para exibição (ex: "Segunda-feira" -> "Segunda")
   */
  getNomeCurtoDia(diaCompleto: string): string {
    const mapeamento: Record<string, string> = {
      'Segunda-feira': 'Segunda',
      'Terça-feira': 'Terça',
      'Quarta-feira': 'Quarta',
      'Quinta-feira': 'Quinta',
      'Sexta-feira': 'Sexta',
      'Sábado': 'Sábado',
      'Domingo': 'Domingo'
    };
    return mapeamento[diaCompleto] || diaCompleto;
  }

/** Retorna um objeto resultado padrão (todos os períodos com "Adicionar Refeição") */
private criarResultadoPadrao(): Record<string, RefeicaoExibicao> {
  const padrao: Record<string, RefeicaoExibicao> = {};
  this.periodosDoDia.forEach(p => {
    padrao[p.nome] = { ...p };
  });
  return padrao;
}
// 👉 abre o modal de seleção para adicionar uma refeição
adicionarRefeicao(periodoNome: string) {
  this.abrirModalSelecao(periodoNome);
}

// 👉 abre o modal de seleção para mudar a refeição já escolhida
mudarRefeicao(periodoNome: string) {
  this.abrirModalSelecao(periodoNome);
}

// Abre o modal de seleção de receitas
abrirModalSelecao(periodoNome: string) {
  this.periodoParaSelecionar = periodoNome;
  this.opcoesReceitas = this.opcoesPorPeriodo[periodoNome] || [];
  this.modalSelecaoAberto = true;
}

// Fecha o modal de seleção
fecharModalSelecao() {
  this.modalSelecaoAberto = false;
  this.periodoParaSelecionar = '';
  this.opcoesReceitas = [];
}

// Seleciona uma receita e salva no cardápio
selecionarReceita(opcao: { nome: string; descricao: string; ingredientes: string[] }) {
  // Salva a refeição no serviço
  this.cardapioService.adicionarOuAtualizarRefeicao(
    this.diaSelecionado,
    this.periodoParaSelecionar,
    {
      nome: opcao.nome,
      descricao: opcao.descricao
    }
  );

  // Fecha o modal
  this.fecharModalSelecao();
}

// 👉 botão "Ver Receita" - abre o modal com a receita
verReceita(prato: string) {
  const receita = this.receitas[prato];
  if (receita) {
    // Busca o período atual do cardápio
    const cardapioAtual = this.cardapioService.getCardapioAtual();
    const refeicoesDoDia = cardapioAtual[this.diaSelecionado] || [];
    const refeicaoEncontrada = refeicoesDoDia.find(r => r.nome === prato);

    this.receitaAtual = receita;
    this.periodoAtual = refeicaoEncontrada?.periodoNome || receita.periodoNome;
    this.modalReceitaAberto = true;
  } else {
    console.warn('Receita não encontrada para:', prato);
  }
}

// Fecha o modal de receita
fecharModalReceita() {
  this.modalReceitaAberto = false;
  this.receitaAtual = null;
}

// Mudar refeição a partir do modal de receita
mudarRefeicaoDoModal() {
  const periodoParaMudar = this.periodoAtual;
  this.fecharModalReceita();
  if (periodoParaMudar) {
    this.abrirModalSelecao(periodoParaMudar);
  }
}

}
