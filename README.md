# 📋 Projeto Simples de Lista de Tarefas (To-Do List)

Este é um projeto de lista de tarefas desenvolvido em **Vanilla JavaScript, HTML e CSS**, utilizando o **Bootstrap 5** para estilização e responsividade. O objetivo é fornecer uma aplicação web simples, mas funcional, para gerenciar tarefas diárias com controle de datas e status.

## ✨ Funcionalidades

O projeto inclui as seguintes features principais, todas implementadas sem a necessidade de frameworks de front-end complexos (apenas JavaScript puro):

* **Persistência de Dados:** Todas as tarefas são salvas automaticamente no `localStorage` do navegador e recarregadas ao abrir a página.
* **Controle de Status Automático:**
    * **Em Andamento (`on-going`):** Status padrão para novas tarefas.
    * **Concluído (`done`):** Aplicado ao marcar o checkbox.
    * **Atrasado (`late`):** Calculado automaticamente ao carregar ou a cada 24 horas. O sistema compara a data de vencimento da tarefa com a data atual.
* **Filtro por Status:** Permite visualizar tarefas **Finalizadas**, **Atrasadas** ou **Todas** usando o seletor (dropdown).
* **Priorização Visual:** As tarefas são marcadas com um círculo colorido (Vermelho, Amarelo, Azul) que indica o nível de prioridade (Alta, Média, Baixa).
* **Manipulação do DOM Otimizada:** Utiliza `insertAdjacentHTML` para adicionar novos elementos com melhor performance.

## 🚀 Como Executar o Projeto

Como este é um projeto em HTML, CSS e JavaScript puro (Vanilla JS), você não precisa de nenhuma configuração complexa de ambiente:

1.  **Clone o Repositório:**
    ```bash
    git clone [https://www.youtube.com/watch?v=X49Wz3icO3E](https://www.youtube.com/watch?v=X49Wz3icO3E)
    ```
2.  **Abra o Arquivo HTML:** Navegue até a pasta do projeto e abra o arquivo `index.html` diretamente no seu navegador.
3.  **Comece a Usar:** A lista de tarefas será carregada, ou você pode adicionar novas tarefas e começar a gerenciá-las.

## ⚙️ Estrutura do Código

Os principais arquivos e funções que orquestram a aplicação são:

| Arquivo | Descrição |
| :--- | :--- |
| `index.html` | Estrutura principal da interface e inclusão de links do Bootstrap e scripts. |
| `style.css` | Arquivo CSS customizado com o layout e temas de cores. |
| `script.js` | Contém toda a lógica da aplicação (o código que você desenvolveu). |

### Funções Chave em `script.js`:

* **`task(name, date, priority, index, status)`:** Função construtora para criar um novo objeto de tarefa.
* **`addTask(...)`:** Cria e insere o novo elemento `<li>` no DOM (`orderList`) e salva o objeto no `taskArray`.
* **`checkStatus()`:** **Função central de verificação de atraso.** Compara a data de vencimento de todas as tarefas com a data atual e atualiza o `status` para `'late'` se necessário.
* **`getDays(formatedDate)`:** Função auxiliar para converter datas em um formato numérico para fácil comparação.
* **Manipuladores de Eventos (`addEventListener`):** Gerenciam cliques na lista (checkbox e delete), envio de formulário e a lógica de filtro.

## 🤝 Contribuições

Sinta-se à vontade para sugerir melhorias, como otimizações de performance, novas funcionalidades (Ex: Search Bar) ou ajustes de estilo.

1.  Faça um Fork do projeto.
2.  Crie uma branch para sua funcionalidade (`git checkout -b feature/NovaFuncionalidade`).
3.  Commit suas mudanças (`git commit -m 'feat: Adiciona Nova Funcionalidade'`).
4.  Faça o Push para a branch (`git push origin feature/NovaFuncionalidade`).
5.  Abra um Pull Request.

---

Enzo Giacomini - 2025
