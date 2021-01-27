# Tabela Price (Sistema Francês de Amortizações)

Projeto para calcular o valor das prestações referente a valores financiados.

### Características

- Calculo do valor da parcela a ser pago
- Possibilidade de calcular uma renegociação com parcelas pagas e novo período de pagamento
- Visualizar total a ser pago, total de juros, juros mensais, amortização, saldo devedor

### Tecnologias

- Desenvolvido em Javascript com Node.js para API e React para o Client
- Utilização do Babel para transpilação do código ECMAScript
- Utilização de imagem Docker MongoDB para desenvolvimento
- Express, Mongoose, Nodemon, Bootstrap, Styled Components

### Validações

- Validar regra de negócio referente ao cálculo

### Melhorias

- TypeScript (substituir uso dos plugins do Babel para "adicionar" features a linguagem)
- Testes (garantir confiabilidade, regras de negócio válidas e menos suscetíveis a erros)

### Requerimentos

- Node.js
- Docker e Docker Compose

### Configurações para desenvolvimento/testes

- Se necessário configurar as variáveis de ambiente nos arquivos .env, para API e Client, docker-compose.yml para o banco

### Setup MongoDB

Rodar os comandos abaixo a partir da raiz do repositório

```sh
$ docker-compose up -d
```

### Setup API

```sh
$ cd api
$ npm install
$ npm run dev
```

### Setup Client

```sh
$ cd client
$ npm install
$ npm start
```
