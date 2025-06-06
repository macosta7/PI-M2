# 🏫 Checkin Room

Sistema web para automação do processo de **reserva de salas em ambientes acadêmicos**. A plataforma possibilita que estudantes, professores e coordenadores verifiquem a disponibilidade de salas em tempo real, realizem reservas com antecedência e recebam notificações automáticas quando a solicitação for aprovada ou recusada. Administradores têm acesso a um painel de controle com gestão de solicitações.

---

## ✅ Funcionalidades

- Login para diferentes perfis de usuário (aluno, professor, coordenador, recepção)
- Cadastro e edição de dados pessoais
- Consulta de horários disponíveis por sala
- Realização de reservas com data e horário
- Painel administrativo com aprovações de solicitações
- Notificações automáticas para usuários
- Testes unitários com Jest

---

## 📁 Estrutura de Pastas

PI-M2/              
├── assets/                        # Pasta para armazenar imagens        
├── config/                        # Configurações gerais                      
│   └── db.js                      # Conexão com o banco de dados PostgreSQL                     
│                     
├── controllers/                   # Lógica das requisições HTTP (entrada das rotas)                  
│   └── ReservaController.js                         
│   └── UsuarioController.js                    
│   └── NotificacaoController.js                            
│                            
├── models/                        # Esquemas de validação de dados com Joi                     
│   └── reservaModel.js                            
│   └── usuarioModel.js                                 
│   └── notificacaoModel.js                                  
│                             
├── repositories/                  # Acesso ao banco de dados (consultas SQL)                          
│   └── reservaRepository.js                                 
│   └── usuarioRepository.js                                       
│   └── notificacaoRepository.js                         
│                                    
├── routes/                        # Definição das rotas da aplicação                                  
│   └── reservas.js                                                
│   └── usuarios.js                                       
│   └── notificacoes.js                                   
│   └── horarios.js                                               
│   └── salas.js                                                   
│                                              
├── services/                      # Regras de negócio e lógica entre controller e repository                                       
│   └── reservaService.js                                        
│   └── usuarioService.js                                                     
│   └── notificacaoService.js                                                              
│                                                              
├── views/                         # Arquivos EJS com as páginas da aplicação (front-end)                                          
│   └── login.ejs                                              
│   └── cadastro.ejs                                                
│   └── reserva.ejs                                                 
│   └── painelAdmin.ejs                                                    
│   └── editarPerfil.ejs                                       
│   └── notificacoes.ejs                                                
│                                     
├── scripts/                       # Scripts utilitários opcionais                                           
│   └── init.sql                   # Script para criação/inicialização das tabelas                                     
│   └── runsql.js                  # Script para rodar o SQL via Node                                      
│                                        
├── public/                        # Arquivos públicos (CSS, imagens, etc)                          
│   └── css/                                         
│       └── style.css              # Estilização da aplicação (layout responsivo com base no protótipo)                                           
│                                    
├── .env                           # Variáveis de ambiente (credenciais DB, porta, etc)                                         
├── .gitignore                     # Arquivos e pastas ignorados pelo Git                                         
├── package.json                   # Scripts e dependências do projeto                                              
├── package-lock.json              # Versões travadas das dependências                                                   
├── server.js                      # Arquivo principal para iniciar o servidor Express                                        
├── readme.md                      # Documentação do projeto                                           
└── PI-WAD.md                      # Entregável da disciplina/documentação formal                                    

## 🖼️ Interface do Sistema

### Telas do Usuário
![Login](assets/login-checkin-room.png)
![Cadastro](assets/cadastro-checkin-room.png)
![Reservas](assets/reservas-checkin-room.png)
![Notificações](assets/notificacoes-checkin-room.png)
![Editar Perfil](assets/editar-checkin-room.png)

### Tela do Administrador
![Painel de Controle](assets/painel-checkin-room.png)

## 🎥 Vídeo de Demonstração

- [▶️ Fluxo do Usuário](https://github.com/user-attachments/assets/cde74a6e-47de-4f04-9d8f-d545dbca0927)
- [🛠️ Fluxo do Administrador](https://github.com/user-attachments/assets/a218fae5-fdf1-4355-872f-1e989789b817)


## 🛠️ Tecnologias Utilizadas

- Node.js
- Express
- EJS (Embedded JavaScript Templates)
- PostgreSQL
- Supabase (alternativa ao PostgreSQL)
- Multer + UUID (upload e identificação de imagens de perfil)
- dotenv (variáveis de ambiente)
- Joi (validação de dados)
- CSS customizado

## ▶️ Como Executar o Projeto Localmente

### 🔧 Pré-requisitos

- [Node.js](https://nodejs.org/)
- Banco de dados PostgreSQL ou Supabase
- Um terminal compatível com comandos `npm`

---

### ⚙️ Instalação

1. **Clone o repositório**

```bash
git clone https://github.com/macosta7/PI-M2.git
cd PI-M2
```  

2. **Instale as dependências**
```bash
npm install
npm init -y
npm install express ejs
npm install joi
npm install express-session
npm install dotenv
npm install pg
npm install multer uuid
```  

### 🗃️ Inicializar o Banco de Dados

Antes de rodar a aplicação, inicialize o banco com o comando:

```bash
npm run init-db
```

### 🚀 Executar o Servidor

1. Inicie a aplicação com:

```bash
node server.js
```

2. O servidor estará rodando em:

```arduino
http://localhost:3000
```

