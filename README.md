# 📉 PreçoCerto - Monitor de Preços Inteligente

O **PreçoCerto** é uma plataforma inteligente de monitoramento e análise de preços projetada para ajudar usuários a acompanhar variações de valores em grandes e-commerces, capturar quedas de preço e otimizar economias de forma automatizada e visual.

---

## 📱 Status do Projeto: Em Construção 

O sistema conta com uma versão Web (Desktop) robusta, funcional e com interface 100% validada. O módulo Mobile está atualmente em fase de construção e refinamento de layout, preparando a base para futuras integrações responsivas completas.

---

## 📸 Demonstração Visual

| 💻 Interface Desktop (Concluída) | 📱 Interface Mobile (Em Construção) |
| :---: | :---: |
| <img src="./frontend/src/assets/0625.gif" width="420" alt="Dashboard Desktop"> | <img src="./frontend/src/assets/tela 1 mobile.png" width="145" alt="telas"> <img src="./frontend/src/assets/mobile 2.png" width="145" alt="telas"> <br><br> <img src="./frontend/src/assets/mobile3.png" width="145" alt="telas"> <img src="./frontend/src/assets/mobile4.png" width="145" alt="telas"> <br><br> <img src="./frontend/src/assets/mobile5.png" width="145" alt="telas"> <img src="./frontend/src/assets/mobile 6.png" width="145" alt="telas"> |

## 🛠️ Tecnologias Utilizadas

### Frontend & Mobile
*   **React.js** com **TypeScript** (Garantindo tipagem estática e segurança no código)
*   **React Router Dom** (Gerenciamento de rotas e navegação interna)
*   **React Icons (Fi Icons / Hi Icons)** (Biblioteca de vetores e ícones modernos)
*   **CSS-in-JS (Inline Styles Dinâmicos)** (Customização de temas e responsividade manual avançada)

### Backend & Banco de Dados
*   **Node.js** com **Express** (Construção da API REST e rotas de feed)
*   **Supabase / PostgreSQL** (Banco de dados relacional para persistência de produtos e históricos)

---

## ⚡ Mecânicas e Funcionalidades Implementadas

### 🎯 Calculadora Universal de Descontos
Algoritmo inteligente integrado que varre o histórico de alterações do produto, identifica o maior preço registrado ou o valor original de referência e calcula a porcentagem exata de desconto real (`↓ X%`), eliminando falsas promoções.

### 🔔 Sistema de Notificações com Trava de Segurança
Geração automática de alertas de **Alta** ou **Queda** baseada estritamente na comparação cronológica do banco de dados (Preço Atual vs Preço Anterior do histórico). Possui persistência via `localStorage`, garantindo que notificações marcadas como "Lidas" não dupliquem ou reapareçam ao atualizar a página (F5).


### 📊 Dashboard Analítico & Sincronização em Tempo Real
*   **Cards Indicadores:** Exibição dinâmica de métricas acumuladas (Total economizado, Alertas ativos, Alertas disparados).
*   **Gráfico Vetorial Dinâmico:** SVG responsivo inline simulando a progressão financeira de economia do usuário nos últimos 6 meses.
*   **Carrossel de Ofertas:** Componente de transição manual horizontal para exibição de descontos por e-commerce.

---

## Como Executar o Projeto Localmente

### Pré-requisitos
*   Node.js instalado
*   Gerenciador de pacotes (NPM ou Yarn)

### Passos
1.  **Clonar o repositório:**
    ```bash
    git clone [https://github.com/AnnieRyder/Monitorador-De-Preco.git](https://github.com/AnnieRyder/Monitorador-De-Preco.git)
    cd Monitorador-De-Preco
    ```

2.  **Configurar e rodar o Backend:**
    ```bash
    cd backend
    npm install
    npm start
    ```

3.  **Configurar e rodar o Frontend:**
    ```bash
    cd ../frontend
    npm install
    npm start
    ```

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---
<p align="center">Desenvolvido por <strong>Rayane Vitoria</strong> ✨</p>