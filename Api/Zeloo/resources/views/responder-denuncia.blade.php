<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Responder Denúncia #1234</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-LN+7fdVzj6u52u30Kp6M/trliBMCMKTyK833zpbD+pXdCLuTusPj697FH4R/5mcr" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <style>
                 :root {
             --primary-green: #90EE90;
             --light-green: #E8F5E8;
             --dark-green: #228B22;
             --lighter-green: #A5D6A7;
             --very-light-green: #C8E6C9;
             --white: #ffffff;
             --light-gray: #f8f9fa;
             --text-dark: #2c3e50;
             --text-muted: #6c757d;
         }
        
                 body {
             background-color: var(--light-green);
             color: var(--text-dark);
             font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
         }
        
        .navbar-nav .nav-link {
            font-weight: 500;
            transition: color 0.3s ease;
        }
        .navbar-nav .nav-link:hover {
            color: var(--primary-green) !important;
        }
                 .navbar-nav .nav-link.active {
             color: var(--primary-green) !important;
         }
         
         .navbar {
             background-color: rgba(255, 255, 255, 0.9) !important;
             backdrop-filter: blur(10px);
             transition: all 0.3s ease;
         }
         
         .navbar.scrolled {
             background-color: rgba(255, 255, 255, 0.95) !important;
             box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
         }
         
         .navbar-nav {
             margin: 0 auto;
         }

         .navbar-brand {
             padding: 0;
             margin-right: 2rem;
         }

         .navbar-brand img {
             transition: opacity 0.3s ease;
         }

         .navbar-brand:hover img {
             opacity: 0.8;
         }
         
         .nav-link {
             color: var(--dark-green) !important;
             font-weight: 500;
             margin: 0 15px;
             transition: color 0.3s ease;
         }
         
         .nav-link:hover, .nav-link.active {
             color: var(--primary-green) !important;
         }
        
                 .btn-primary {
             background-color: var(--primary-green);
             border-color: var(--primary-green);
             color: white;
         }
         .btn-primary:hover {
             background-color: var(--dark-green);
             border-color: var(--dark-green);
         }
        
        .btn-outline-primary {
            color: var(--primary-green);
            border-color: var(--primary-green);
        }
        .btn-outline-primary:hover {
            background-color: var(--primary-green);
            border-color: var(--primary-green);
        }
        
        .btn-outline-secondary {
            color: var(--text-muted);
            border-color: var(--text-muted);
        }
        .btn-outline-secondary:hover {
            background-color: var(--text-muted);
            border-color: var(--text-muted);
        }
        
        .status-pending {
            background-color: var(--very-light-green);
            color: var(--primary-green);
        }
        .status-reviewed {
            background-color: var(--lighter-green);
            color: var(--text-dark);
        }
        .status-resolved {
            background-color: var(--light-green);
            color: white;
        }
        .status-urgent {
            background-color: #ffcdd2;
            color: #c62828;
        }
        
                 .denuncia-details {
             background-color: var(--light-green);
             border-radius: 10px;
             padding: 20px;
         }
        
                 .card {
             border: none;
             border-radius: 15px;
             box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
             background: white;
         }
        
        .text-primary {
            color: var(--primary-green) !important;
        }
        
        .bg-primary {
            background-color: var(--primary-green) !important;
        }
        
        .bg-success {
            background-color: var(--light-green) !important;
        }
        
        .text-success {
            color: var(--primary-green) !important;
        }
        
        .badge.bg-primary {
            background-color: var(--primary-green) !important;
        }
        
        .badge.bg-success {
            background-color: var(--light-green) !important;
        }
        
        .badge.bg-danger {
            background-color: #ffcdd2 !important;
            color: #c62828 !important;
        }
        
        .badge.bg-warning {
            background-color: #fff3e0 !important;
            color: #ef6c00 !important;
        }
        
        .badge.bg-info {
            background-color: var(--lighter-green) !important;
            color: var(--text-dark) !important;
        }
        
        .badge.bg-secondary {
            background-color: #e0e0e0 !important;
            color: #424242 !important;
        }
        
        .form-control:focus {
            border-color: var(--primary-green);
            box-shadow: 0 0 0 0.2rem rgba(76, 175, 80, 0.25);
        }
        
        .form-select:focus {
            border-color: var(--primary-green);
            box-shadow: 0 0 0 0.2rem rgba(76, 175, 80, 0.25);
        }
    </style>
</head>
<body>
              <!-- Navbar -->
     <nav class="navbar navbar-expand-lg fixed-top">
         <div class="container">
             <a class="navbar-brand" href="index.php">
                 <img src="images/zeloo-light.png" alt="Zeloo" height="40">
             </a>
             <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                 <span class="navbar-toggler-icon"></span>
             </button>
             <div class="collapse navbar-collapse" id="navbarNav">
                 <ul class="navbar-nav">
                     <li class="nav-item">
                         <a class="nav-link" href="index.php">
                             <i class="bi bi-speedometer2 me-1"></i> Dashboard
                         </a>
                     </li>
                     <li class="nav-item">
                         <a class="nav-link active" href="denuncias.php">
                             <i class="bi bi-shield-exclamation me-1"></i> Analisar Denúncias
                         </a>
                     </li>
                     <li class="nav-item">
                         <a class="nav-link" href="banir.php">
                             <i class="bi bi-person-x me-1"></i> Banir Usuários
                         </a>
                     </li>
                 </ul>
             </div>
         </div>
     </nav>

         <div class="container mt-5 pt-5">
         <!-- Header -->
         <div class="row mb-4">
             <div class="col-12">
                 <div class="d-flex justify-content-between align-items-center">
                     <div>
                         <nav aria-label="breadcrumb">
                             <ol class="breadcrumb mb-0">
                                 <li class="breadcrumb-item"><a href="denuncias.php" class="text-decoration-none">Denúncias</a></li>
                                 <li class="breadcrumb-item active" aria-current="page">Responder Denúncia #1234</li>
                             </ol>
                         </nav>
                         <h2 class="mb-0 mt-2">
                             <i class="bi bi-chat-dots text-primary me-2"></i>
                             Responder Denúncia #1234
                         </h2>
                     </div>
                     <a href="denuncias.php" class="btn btn-outline-secondary">
                         <i class="bi bi-arrow-left me-1"></i>
                         Voltar às Denúncias
                     </a>
                 </div>
             </div>
         </div>

                      <div class="row">
             <!-- Detalhes da Denúncia -->
            <div class="col-lg-4 mb-4">
                <div class="card border-0 shadow-sm">
                    <div class="card-header bg-white border-0 py-3">
                        <h5 class="mb-0">
                            <i class="bi bi-info-circle text-primary me-2"></i>
                            Detalhes da Denúncia
                        </h5>
                    </div>
                    <div class="card-body">
                        <div class="denuncia-details">
                            <div class="mb-3">
                                <strong>ID:</strong> #1234
                            </div>
                            <div class="mb-3">
                                <strong>Status:</strong> 
                                <span class="badge status-urgent">Urgente</span>
                            </div>
                            <div class="mb-3">
                                <strong>Tipo:</strong> 
                                <span class="badge bg-danger">Negligência no Cuidado</span>
                            </div>
                            <div class="mb-3">
                                <strong>Data:</strong> 15/01/2024 às 14:30
                            </div>
                            <div class="mb-3">
                                <strong>Denunciante:</strong> Maria Santos
                            </div>
                        </div>

                        <hr>

                        <div class="mb-3">
                            <strong>Usuário Denunciado:</strong>
                            <div class="d-flex align-items-center mt-2">
                                <div class="bg-primary bg-opacity-10 rounded-circle p-2 me-2">
                                    <i class="bi bi-person text-primary"></i>
                                </div>
                                <div>
                                    <div class="fw-semibold">João Silva</div>
                                    <small class="text-muted">@joaosilva</small>
                                </div>
                            </div>
                            <div class="mt-3">
                                <button type="button" class="btn btn-danger btn-sm me-2" onclick="banUser('joaosilva', 'João Silva', 'Cuidador')">
                                    <i class="bi bi-person-x"></i> Banir Cuidador
                                </button>
                                <button type="button" class="btn btn-warning btn-sm" onclick="banUser('mariasantos', 'Maria Santos', 'Familiar')">
                                    <i class="bi bi-person-x"></i> Banir Denunciante
                                </button>
                            </div>
                        </div>

                        <div class="mb-3">
                            <strong>Descrição da Denúncia:</strong>
                            <p class="text-muted mt-2 mb-0">
                                Cuidador não está fornecendo os cuidados básicos necessários ao idoso, incluindo medicação, 
                                alimentação adequada e higiene pessoal. Família relatou sinais de negligência.
                            </p>
                        </div>

                        <div class="mb-3">
                            <strong>Evidências:</strong>
                            <ul class="text-muted mt-2 mb-0">
                                <li>Fotos do estado do idoso</li>
                                <li>Relatório médico</li>
                                <li>Depoimento da família</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Formulário de Resposta -->
            <div class="col-lg-8">
                <div class="card border-0 shadow-sm">
                    <div class="card-header bg-white border-0 py-3">
                        <h5 class="mb-0">
                            <i class="bi bi-chat-dots text-primary me-2"></i>
                            Formulário de Resposta
                        </h5>
                    </div>
                    <div class="card-body">
                        <form>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="statusSelect" class="form-label fw-semibold">Status da Resolução:</label>
                                        <select class="form-select" id="statusSelect" required>
                                            <option value="">Escolha um status...</option>
                                            <option value="pendente">Pendente</option>
                                            <option value="em_analise">Em Análise</option>
                                            <option value="resolvida">Resolvida</option>
                                            <option value="rejeitada">Rejeitada</option>
                                            <option value="urgente" selected>Urgente</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="acaoSelect" class="form-label fw-semibold">Ação a Ser Tomada:</label>
                                        <select class="form-select" id="acaoSelect" required>
                                            <option value="">Escolha uma ação...</option>
                                            <option value="advertencia">Enviar Advertência</option>
                                            <option value="suspensao">Suspender Usuário (7 dias)</option>
                                            <option value="banimento" selected>Banir Usuário Permanente</option>
                                            <option value="remover_conteudo">Remover Conteúdo</option>
                                            <option value="sem_acao">Nenhuma Ação Necessária</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="respostaTextarea" class="form-label fw-semibold">Resposta/Justificativa:</label>
                                <textarea class="form-control" id="respostaTextarea" rows="6" placeholder="Digite sua resposta ou justificativa para a ação tomada..." required>Prezado João Silva,

Após análise da denúncia #1234, foi constatado que você está violando os termos de uso da plataforma através do envio de mensagens em massa com conteúdo suspeito.

Ação tomada: Banimento permanente da conta devido à gravidade da violação e risco à segurança dos demais usuários.

Esta decisão é irrevogável.

Atenciosamente,
Equipe de Moderação</textarea>
                            </div>

                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label fw-semibold">Notificar:</label>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" id="notificarDenunciante" checked>
                                            <label class="form-check-label" for="notificarDenunciante">
                                                Denunciante (Maria Santos)
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" id="notificarDenunciado" checked>
                                            <label class="form-check-label" for="notificarDenunciado">
                                                Usuário Denunciado (João Silva)
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="prioridadeSelect" class="form-label fw-semibold">Prioridade:</label>
                                        <select class="form-select" id="prioridadeSelect">
                                            <option value="baixa">Baixa</option>
                                            <option value="media">Média</option>
                                            <option value="alta" selected>Alta</option>
                                            <option value="critica">Crítica</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="d-flex gap-2">
                                <button type="submit" class="btn btn-primary">
                                    <i class="bi bi-send me-1"></i>
                                    Enviar Resposta
                                </button>
                                <button type="button" class="btn btn-outline-secondary">
                                    <i class="bi bi-save me-1"></i>
                                    Salvar como Rascunho
                                </button>
                                <button type="button" class="btn btn-outline-warning">
                                    <i class="bi bi-clock me-1"></i>
                                    Marcar para Revisão
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <!-- Histórico de Ações -->
                <div class="card border-0 shadow-sm mt-4">
                    <div class="card-header bg-white border-0 py-3">
                        <h5 class="mb-0">
                            <i class="bi bi-clock-history text-primary me-2"></i>
                            Histórico de Ações
                        </h5>
                    </div>
                    <div class="card-body p-0">
                        <div class="list-group list-group-flush">
                            <div class="list-group-item border-0">
                                <div class="d-flex justify-content-between align-items-start">
                                    <div>
                                        <h6 class="mb-1">Denúncia criada</h6>
                                        <p class="text-muted mb-1">Denúncia registrada por Maria Santos</p>
                                        <small class="text-muted">15/01/2024 14:30</small>
                                    </div>
                                    <span class="badge bg-secondary">Criada</span>
                                </div>
                            </div>
                            <div class="list-group-item border-0">
                                <div class="d-flex justify-content-between align-items-start">
                                    <div>
                                        <h6 class="mb-1">Status alterado para Urgente</h6>
                                        <p class="text-muted mb-1">Alterado por Admin Silva</p>
                                        <small class="text-muted">15/01/2024 15:45</small>
                                    </div>
                                    <span class="badge status-urgent">Urgente</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

         <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/js/bootstrap.bundle.min.js" integrity="sha384-ndDqU0Gzau9qJ1lfW4pNLlhNTkCfHzAVBReH9diLvGRem5+R9g2FzA8ZGN954O5Q" crossorigin="anonymous"></script>
     
     <script>
                   // Navbar scroll effect
          window.addEventListener('scroll', function() {
              const navbar = document.querySelector('.navbar');
              if (window.scrollY > 50) {
                  navbar.classList.add('scrolled');
              } else {
                  navbar.classList.remove('scrolled');
              }
          });

         // Function to ban user and redirect to ban page
         function banUser(userId, userName, userType) {
             // Store ban information in sessionStorage for the ban page
             sessionStorage.setItem('banUserId', userId);
             sessionStorage.setItem('banUserName', userName);
             sessionStorage.setItem('banUserType', userType);
             sessionStorage.setItem('banSource', 'denuncia');
             sessionStorage.setItem('denunciaId', '1234');
             
             // Redirect to ban page
             window.location.href = 'banir.php';
         }
     </script>
</body>
</html>
