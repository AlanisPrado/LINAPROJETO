import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardapioService } from '../services/cardapio';

interface ItemLista {
  nome: string;
  quantidade: number;
  marcado: boolean;
}

interface CategoriaLista {
  nome: string;
  icone: string;
  itens: ItemLista[];
}

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista.html',
  styleUrls: ['./lista.css']
})
export class Lista implements OnInit {
  categorias: CategoriaLista[] = [];
  totalItens: number = 0;

  // Mapeamento de ingredientes para categorias
  private mapeamentoCategorias: Record<string, string> = {
    // Frutas e Vegetais
    'abacate': 'Frutas e Vegetais',
    'abobrinha': 'Frutas e Vegetais',
    'alface': 'Frutas e Vegetais',
    'alho': 'Frutas e Vegetais',
    'banana': 'Frutas e Vegetais',
    'batata doce': 'Frutas e Vegetais',
    'brócolis': 'Frutas e Vegetais',
    'cebola': 'Frutas e Vegetais',
    'cenoura': 'Frutas e Vegetais',
    'couve': 'Frutas e Vegetais',
    'espinafre': 'Frutas e Vegetais',
    'kiwi': 'Frutas e Vegetais',
    'limão': 'Frutas e Vegetais',
    'maçã verde': 'Frutas e Vegetais',
    'mamão': 'Frutas e Vegetais',
    'mirtilos': 'Frutas e Vegetais',
    'tomate': 'Frutas e Vegetais',
    'pimentão': 'Frutas e Vegetais',
    'berinjela': 'Frutas e Vegetais',
    'legumes': 'Frutas e Vegetais',
    'frutas vermelhas': 'Frutas e Vegetais',

    // Laticínios
    'iogurte de coco': 'Laticínios',
    'iogurte natural desnatado': 'Laticínios',
    'leite de amêndoa': 'Laticínios',
    'leite desnatado': 'Laticínios',
    'queijo branco': 'Laticínios',
    'queijo branco ralado': 'Laticínios',

    // Grãos e Cereais
    'arroz integral': 'Grãos e Cereais',
    'feijão preto': 'Grãos e Cereais',
    'granola': 'Grãos e Cereais',
    'granola sem açúcar': 'Grãos e Cereais',
    'pão integral': 'Grãos e Cereais',
    'quinoa': 'Grãos e Cereais',
    'quinoa cozida': 'Grãos e Cereais',
    'sementes de chia': 'Grãos e Cereais',
    'sopa de chia': 'Grãos e Cereais',
    'torradas integrais': 'Grãos e Cereais',
    'tapioca': 'Grãos e Cereais',
    'aveia em flocos': 'Grãos e Cereais',

    // Proteínas
    'ovos': 'Proteínas',
    'peito de frango': 'Proteínas',
    'filé de peixe': 'Proteínas',
    'filé de salmão': 'Proteínas',
    'filé de peixe branco': 'Proteínas',
    'frango desfiado': 'Proteínas',

    // Outros
    'azeite': 'Outros',
    'mel': 'Outros',
    'canela em pó': 'Outros',
    'água': 'Outros',
    'gelo': 'Outros',
    'sal': 'Outros',
    'pimenta': 'Outros',
    'orégano': 'Outros',
    'ervas': 'Outros',
    'ervas frescas': 'Outros',
    'temperos': 'Outros',
    'suco de limão': 'Outros',
    'caldo de legumes': 'Outros'
  };

  constructor(private cardapioService: CardapioService) {}

  ngOnInit() {
    this.gerarListaCompras();

    // Observa mudanças no cardápio para atualizar a lista
    this.cardapioService.cardapioSemanal$.subscribe(() => {
      this.gerarListaCompras();
    });
  }

  gerarListaCompras() {
    const cardapio = this.cardapioService.getCardapioAtual();
    const ingredientesMap: Record<string, number> = {};

    // Extrai ingredientes de todas as receitas selecionadas
    Object.values(cardapio).forEach(refeicoesDoDia => {
      if (Array.isArray(refeicoesDoDia)) {
        refeicoesDoDia.forEach(refeicao => {
          const receita = this.getReceitaPorNome(refeicao.nome);
          if (receita) {
            receita.ingredientes.forEach(ingrediente => {
              const ingredienteNormalizado = this.normalizarIngrediente(ingrediente);
              if (ingredienteNormalizado) {
                const quantidade = this.extrairQuantidade(ingrediente);
                ingredientesMap[ingredienteNormalizado] =
                  (ingredientesMap[ingredienteNormalizado] || 0) + quantidade;
              }
            });
          }
        });
      }
    });

    // Agrupa por categoria
    const categoriasMap: Record<string, ItemLista[]> = {};

    Object.entries(ingredientesMap).forEach(([nome, quantidade]) => {
      const categoria = this.mapeamentoCategorias[nome] || 'Outros';
      if (!categoriasMap[categoria]) {
        categoriasMap[categoria] = [];
      }
      categoriasMap[categoria].push({
        nome: this.formatarNomeIngrediente(nome),
        quantidade,
        marcado: false
      });
    });

    // Converte para array e ordena
    this.categorias = Object.entries(categoriasMap)
      .map(([nome, itens]) => ({
        nome,
        icone: this.getIconeCategoria(nome),
        itens: itens.sort((a, b) => a.nome.localeCompare(b.nome))
      }))
      .filter(cat => cat.itens.length > 0)
      .sort((a, b) => this.getOrdemCategoria(a.nome) - this.getOrdemCategoria(b.nome));

    // Calcula total de itens
    this.totalItens = Object.values(ingredientesMap).reduce((sum, qty) => sum + qty, 0);
  }

  private getReceitaPorNome(nome: string): { ingredientes: string[] } | null {
    // Base de dados de receitas com ingredientes detalhados
    const receitas: Record<string, string[]> = {
      'Smoothie de Frutas Vermelhas': [
        '1 xícara de frutas vermelhas congeladas',
        '1/2 xícara de leite de amêndoa',
        '1 colher de sopa de mel',
        '1 colher de chá de sementes de chia'
      ],
      'Omelete com Vegetais': [
        '2 unidades de ovos',
        '1/2 xícara de tomate picado',
        '1/4 xícara de cebola picada',
        '1/4 xícara de pimentão picado',
        '1 colher de sopa de azeite'
      ],
      'Pão Integral com Abacate': [
        '2 fatias de pão integral',
        '1/2 abacate',
        '1 unidade de ovos'
      ],
      'Peixe Assado com Batata Doce': [
        '1 filé de peixe (300g)',
        '1 batata doce média',
        '1/2 xícara de brócolis',
        '1 colher de sopa de azeite',
        'alho a gosto'
      ],
      'Frango Grelhado com Quinoa': [
        '1 peito de frango (200g)',
        '1/2 xícara de quinoa',
        '1/2 xícara de legumes variados',
        '1 colher de sopa de azeite'
      ],
      'Salmão com Batata Doce': [
        '1 filé de salmão (200g)',
        '1 batata doce média',
        '1 xícara de salada verde',
        '1 colher de sopa de azeite',
        'limão a gosto'
      ],
      'Chips de Batata Doce': [
        '1 batata doce média',
        '1 colher de sopa de azeite',
        'orégano a gosto'
      ],
      'Castanhas e Frutas': [
        '1/4 xícara de castanhas variadas',
        '1 maçã verde'
      ],
      'Vitamina de Abacate': [
        '1/2 abacate',
        '1 xícara de leite desnatado',
        '1 colher de sopa de mel'
      ],
      'Berinjela Recheada': [
        '1 berinjela média',
        '1/2 xícara de quinoa',
        '1/4 xícara de tomate',
        '1/4 xícara de cebola',
        'azeite a gosto'
      ],
      'Sopa de Legumes': [
        '2 xícaras de legumes variados',
        '1/2 xícara de frango desfiado',
        '1 litro de caldo de legumes'
      ],
      'Peixe ao Forno': [
        '1 filé de peixe branco (300g)',
        '1/2 xícara de legumes variados',
        '1 colher de sopa de azeite',
        'limão a gosto',
        'alho a gosto'
      ]
    };

    const ingredientes = receitas[nome];
    return ingredientes ? { ingredientes } : null;
  }

  private normalizarIngrediente(ingrediente: string): string {
    // Remove quantidades e normaliza o texto
    let normalizado = ingrediente
      .toLowerCase()
      .replace(/^\d+\s*(unidades?|xícaras?|colheres?|fatias?|filés?|litros?|kg|g|ml)\s+de\s+/i, '')
      .replace(/^\d+\/\d+\s*(xícaras?|colheres?)\s+de\s+/i, '')
      .replace(/^a\s+gosto\s+de\s+/i, '')
      .replace(/\s*\(.*?\)/g, '')
      .replace(/\s+(média|pequena|grande|maduro|fresco|congelado|picado|ralado|desfiado)/gi, '')
      .trim();

    // Mapeamentos específicos para agrupar ingredientes similares
    const mapeamentos: Record<string, string> = {
      'ovo pochê': 'ovos',
      'ovos': 'ovos',
      'ovo': 'ovos',
      'unidade de ovos': 'ovos',
      'tomate picado': 'tomate',
      'cebola picada': 'cebola',
      'pimentão picado': 'pimentão',
      'queijo branco ralado': 'queijo branco',
      'frutas vermelhas congeladas': 'frutas vermelhas',
      'legumes variados': 'legumes',
      'legumes salteados': 'legumes',
      'salada verde': 'alface',
      'castanhas variadas': 'castanhas',
      'caldo de legumes': 'caldo de legumes'
    };

    return mapeamentos[normalizado] || normalizado;
  }

  private extrairQuantidade(ingrediente: string): number {
    // Extrai quantidade do ingrediente - procura por padrões como "2 unidades", "x5", etc.
    const match = ingrediente.match(/(\d+)\s*(unidades?|xícaras?|colheres?|fatias?|filés?|litros?|kg|g|ml|x\d+)/i);
    if (match) {
      return parseInt(match[1], 10);
    }
    // Procura por padrão "x5" no final
    const matchX = ingrediente.match(/x(\d+)/i);
    if (matchX) {
      return parseInt(matchX[1], 10);
    }
    return 1;
  }

  private formatarNomeIngrediente(nome: string): string {
    // Capitaliza primeira letra
    return nome.charAt(0).toUpperCase() + nome.slice(1);
  }

  private getIconeCategoria(categoria: string): string {
    const icones: Record<string, string> = {
      'Frutas e Vegetais': '🥬',
      'Laticínios': '🥛',
      'Grãos e Cereais': '🌾',
      'Proteínas': '🍗',
      'Outros': '🧂'
    };
    return icones[categoria] || '📦';
  }

  private getOrdemCategoria(categoria: string): number {
    const ordem: Record<string, number> = {
      'Frutas e Vegetais': 1,
      'Laticínios': 2,
      'Grãos e Cereais': 3,
      'Proteínas': 4,
      'Outros': 5
    };
    return ordem[categoria] || 99;
  }

  toggleItem(categoriaIndex: number, itemIndex: number) {
    this.categorias[categoriaIndex].itens[itemIndex].marcado =
      !this.categorias[categoriaIndex].itens[itemIndex].marcado;
  }

  baixarLista() {
    // Gera texto da lista
    let texto = 'LISTA DE COMPRAS\n';
    texto += '================\n\n';

    this.categorias.forEach(categoria => {
      texto += `${categoria.icone} ${categoria.nome}\n`;
      texto += `${categoria.itens.length} itens\n\n`;

      categoria.itens.forEach(item => {
        const check = item.marcado ? '[✓]' : '[ ]';
        const quantidade = item.quantidade > 1 ? ` (x${item.quantidade})` : '';
        texto += `${check} ${item.nome}${quantidade}\n`;
      });

      texto += '\n';
    });

    // Cria e baixa arquivo
    const blob = new Blob([texto], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lista-de-compras.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
