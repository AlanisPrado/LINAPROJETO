#  **LINA PROJETO**

O **Lina** é um projeto desenvolvido para auxiliar pessoas com restrições alimentares na rotina diária.  
A plataforma recomenda **pratos personalizados** para cada refeição, de acordo com as necessidades do usuário.  
Ao final, o sistema também gera automaticamente uma **lista de ingredientes**, facilitando o processo de compras.

----------

## 📋 **Pré-requisitos**

Antes de iniciar o projeto, certifique-se de ter instalado:

-   **Node.js** (versão 18 ou superior)
    
-   **npm** (incluso no Node.js)
    

Para verificar as versões instaladas:

```bash
node --version
npm --version

```
----------

## 🚀 **Instalação e Execução**

### **Passo 1: Clonar o repositório**

```bash
git clone https://github.com/usuario/meu-projeto.git

```

Ou, caso já tenha baixado os arquivos:

```bash
cd LINAPROJETO-main

```

----------

### **Passo 2: Instalar dependências**

```bash
npm install

```

Este comando instalará todas as dependências necessárias, incluindo o Angular 20.

----------

### **Passo 3: Iniciar o servidor de desenvolvimento**

```bash
ng serve

```

----------

### **Passo 4: Acessar a aplicação**

Após iniciar o servidor, o projeto estará disponível em:

```
http://localhost:4200

```

O navegador deve abrir automaticamente. Caso isso não aconteça, acesse o endereço manualmente.

----------

## 🛠️ **Tecnologias Utilizadas**

-   **Angular** 20.2.2
    
-   **TypeScript** 
    
-   **Bootstrap** 
    
----------

## 📁 **Estrutura do Projeto**

```
LINAPROJETO-main/
├── src/
│   ├── app/
│   │   ├── boleto/               # Tela de boleto
│   │   ├── cardapio-semanal/     # Cardápio semanal
│   │   ├── entrar/               # Tela de login
│   │   ├── registrar/            # Tela de cadastro
│   │   ├── home/                 # Página inicial
│   │   ├── lista/                # Lista de itens
│   │   ├── meu-cardapio/         # Meu cardápio
│   │   ├── nutricionistas/       # Consultar nutricionistas
│   │   ├── pix/                  # Tela de pagamento PIX
│   │   ├── tela-assinatura/      # Tela de assinatura
│   │   └── services/             # Serviços da aplicação
│   ├── index.html
│   └── main.ts
├── public/                       # Arquivos estáticos
├── angular.json                  # Configuração do Angular
├── package.json                  # Dependências do projeto
└── tsconfig.json                 # Configuração do TypeScript

```
----------

## 🎯 **Funcionalidades**

-   ✅ Página inicial (Home)
    
-   ✅ Cadastro de usuário
    
-   ✅ Login
    
-   ✅ Criar cardápio
    
-   ✅ Exibir cardápio
    
-   ✅ Consultar nutricionistas
    
-   ✅ Sistema de pagamento (Boleto e PIX)
    
-   ✅ Assinatura (Divulgação e Ativa)
    
