# 📦 SIG-WMS (Sistema Integrado de Gestão de Armazém)

![Java](https://img.shields.io/badge/Java-17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2+-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)

## 🎯 Sobre o Projeto

O **SIG-WMS** é uma aplicação web Full Stack desenvolvida para simplificar e modernizar o controle de inventário, com foco inicial no ecossistema de uma loja de eletrônicos. 

Diferente de um controle de estoque estático, este sistema atua como um verdadeiro WMS (Warehouse Management System), garantindo a rastreabilidade das movimentações, controle de saldos em tempo real e, futuramente, gestão inteligente de lotes e endereçamento logístico.

### 📚 Contexto Acadêmico
Este projeto está sendo desenvolvido como requisito de avaliação da disciplina de **DIM0510 - PROCESSOS DE SOFTWARE**. A gestão de tarefas, Sprints e Backlog do Produto está sendo conduzida utilizando metodologias ágeis (Kanban) através do **[GitHub Projects[(https://github.com/users/Biramon/projects/3/views/1)**.

---

## 🚀 Funcionalidades (MVP - Sprint 1)

* **Gestão de Produtos:** Cadastro completo de itens (SKU, Nome, Descrição, Unidade de Medida).
* **Controle de Saldo:** Visualização da quantidade atual disponível em estoque.
* **Movimentações:** Registro de entradas e saídas de mercadorias.
* **API RESTful:** Backend robusto com respostas padronizadas e tratamento de exceções.

---

## 🛠️ Arquitetura e Tecnologias

A aplicação é dividida em dois blocos principais, comunicando-se via API REST:

* **Back-end:** Java 17 + Spring Boot (Web, Data JPA).
* **Front-end:** React.js + Vite (com Axios e React Router).
* **Banco de Dados:** PostgreSQL 16 (Conteinerizado).
* **Infraestrutura:** Docker e Docker Compose para padronização do ambiente local.