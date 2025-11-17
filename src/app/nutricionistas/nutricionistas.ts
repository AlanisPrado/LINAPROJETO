import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para *ngFor, *ngIf
import { FormsModule } from '@angular/forms'; // Para [(ngModel)]

// 1. Defina a interface (Boa prática de tipagem)
interface Nutricionista {
  nome: string;
  especialidade: string;
  localidade: string;
  telefone: string;
  email: string;
  pacientesAtendidos: number;
  avaliacao: number;
}

// 2. Defina o componente Standalone
@Component({
  selector: 'app-nutricionistas',
  standalone: true,
  // 💡 Importante: Use templateUrl e styleUrls para referenciar os arquivos separados
  templateUrl: './nutricionistas.html',
  styleUrls: ['./nutricionistas.css'],

  // Importe os módulos que o template usará
  imports: [
    CommonModule,
    FormsModule
  ]
})
// 3. Defina a classe do componente
export class Nutricionistas implements OnInit {
  // Dados de exemplo (em um cenário real, isso viria de um serviço)
  nutricionistas: Nutricionista[] = [
    { nome: 'Dra. Ana Paula Santos', especialidade: 'Diabetes e Nutrição Clínica', localidade: 'São Paulo, SP', telefone: '(11) 98765-4321', email: 'ana.santos@nutricao.com', pacientesAtendidos: 320, avaliacao: 4.9 },
    { nome: 'Dr. Carlos Eduardo Lima', especialidade: 'Nutrição Esportiva e Diabetes', localidade: 'Rio de Janeiro, RJ', telefone: '(21) 97654-3210', email: 'carlos.lima@nutricao.com', pacientesAtendidos: 285, avaliacao: 4.8 },
    { nome: 'Dra. Mariana Costa', especialidade: 'Intolerâncias Alimentares', localidade: 'Belo Horizonte, MG', telefone: '(31) 99876-5432', email: 'mariana.costa@nutricao.com', pacientesAtendidos: 150, avaliacao: 4.9 },
    { nome: 'Dr. Pedro Henrique Alves', especialidade: 'Doença Celíaca e Diabetes', localidade: 'São Paulo, SP', telefone: '(11) 98123-4567', email: 'pedro.alves@nutricao.com', pacientesAtendidos: 400, avaliacao: 4.7 },
    { nome: 'Dr. Henrique Alves', especialidade: 'Doença Celíaca', localidade: 'Rio de Janeiro, RJ', telefone: '(21) 98123-5676', email: 'henrique.alves@nutricao.com', pacientesAtendidos: 400, avaliacao: 4.7 },
    { nome: 'Dra. Aline Mendes', especialidade: 'Intolerâncias Alimentares', localidade: 'São Paulo, SP', telefone: '(11) 98143-4532', email: 'aline.mendes@nutricao.com', pacientesAtendidos: 452, avaliacao: 4.9 },
    { nome: 'Dra. Letícia Fernandes', especialidade: 'Nutrição Infantil e Diabetes', localidade: 'Curitiba, PR', telefone: '(41) 98765-1234', email: 'leticia.fernandes@nutricao.com', pacientesAtendidos: 220, avaliacao: 4.8 },
    { nome: 'Dr. Rafael Souza', especialidade: 'Nutrição Esportiva', localidade: 'Porto Alegre, RS', telefone: '(51) 97654-9876', email: 'rafael.souza@nutricao.com', pacientesAtendidos: 310, avaliacao: 4.7 },

    // NOVOS COM CIDADES NOVAS
    { nome: 'Dra. Carla Nunes', especialidade: 'Nutrição Funcional', localidade: 'Campinas, SP', telefone: '(19) 98321-1111', email: 'carla.nunes@nutricao.com', pacientesAtendidos: 280, avaliacao: 4.8 },
    { nome: 'Dr. Marcelo Teixeira', especialidade: 'Nutrição Clínica', localidade: 'Sorocaba, SP', telefone: '(15) 98244-2222', email: 'marcelo.teixeira@nutricao.com', pacientesAtendidos: 200, avaliacao: 4.7 },
    { nome: 'Dra. Renata Martins', especialidade: 'Diabetes e Nutrição', localidade: 'Niterói, RJ', telefone: '(21) 98273-3333', email: 'renata.martins@nutricao.com', pacientesAtendidos: 260, avaliacao: 4.9 }
  ];



  nutricionistasFiltrados: Nutricionista[] = [];

  // Variáveis para os filtros
  estadoSelecionado: string = '';
  cidadeSelecionada: string = '';
  avaliacaoMinima: number = 0;


  // Lista de estados de exemplo (poderia vir de um serviço)
  estados: string[] = [
    'Todos os estados',
    'São Paulo, SP',
    'Rio de Janeiro, RJ',
    'Belo Horizonte, MG',
    'Curitiba, PR',
    'Porto Alegre, RS'
  ];

  cidades: string[] = [
    'Todas as cidades',
    'São Paulo',
    'Campinas',
    'Sorocaba',
    'Rio de Janeiro',
    'Niterói',
    'Belo Horizonte',
    'Curitiba',
    'Porto Alegre'
  ];

  constructor() { }

  ngOnInit(): void {
    // Inicialmente, a lista filtrada é a lista completa
    this.nutricionistasFiltrados = [...this.nutricionistas];
  }

  /**
   * Função que aplica o filtro (Estado/Cidade) na lista de nutricionistas.
   */
  filtrarProfissionais(): void {
  let temp = this.nutricionistas;

  // FILTRO ESTADO
  if (this.estadoSelecionado && this.estadoSelecionado !== 'Todos os estados') {
    temp = temp.filter(n => n.localidade.includes(this.estadoSelecionado.split(',')[1].trim()));
  }

  // FILTRO CIDADE
  if (this.cidadeSelecionada && this.cidadeSelecionada !== 'Todas as cidades') {
    temp = temp.filter(n => n.localidade.includes(this.cidadeSelecionada));
  }

  // FILTRO ESTRELAS
  if (this.avaliacaoMinima > 0) {
    temp = temp.filter(n => n.avaliacao >= this.avaliacaoMinima);
  }

  this.nutricionistasFiltrados = temp;
}


}
