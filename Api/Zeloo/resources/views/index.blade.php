<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Cuidado aos Idosos</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-LN+7fdVzj6u52u30Kp6M/trliBMCMKTyK833zpbD+pXdCLuTusPj697FH4R/5mcr" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        :root {
            --primary-green: #4CAF50;
            --light-green: #81C784;
            --lighter-green: #A5D6A7;
            --very-light-green: #C8E6C9;
            --white: #ffffff;
            --light-gray: #f8f9fa;
            --text-dark: #2c3e50;
            --text-muted: #6c757d;
        }
        
        body {
            background-color: var(--white);
            color: var(--text-dark);
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
             background-color: rgba(255, 255, 255, 0.95) !important;
             backdrop-filter: blur(10px);
             transition: all 0.3s ease;
         }
         
         .navbar.scrolled {
             background-color: rgba(255, 255, 255, 0.98) !important;
             box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
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
        
        .btn-primary {
            background-color: var(--primary-green);
            border-color: var(--primary-green);
        }
        .btn-primary:hover {
            background-color: var(--light-green);
            border-color: var(--light-green);
        }
        
        .btn-outline-primary {
            color: var(--primary-green);
            border-color: var(--primary-green);
        }
        .btn-outline-primary:hover {
            background-color: var(--primary-green);
            border-color: var(--primary-green);
        }
        
        .stats-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            background-color: var(--white);
        }
        .stats-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(76, 175, 80, 0.15) !important;
        }
        
        .chart-container {
            position: relative;
            height: 300px;
            margin: 20px 0;
        }
        
        .dashboard-header {
            background: linear-gradient(135deg, var(--primary-green) 0%, var(--light-green) 100%);
            color: white;
            padding: 40px 0;
        }
        
        .card {
            background-color: var(--white);
            border: 1px solid #e9ecef;
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
        
        .table-light {
            background-color: var(--very-light-green) !important;
        }
        
        .badge.bg-primary {
            background-color: var(--primary-green) !important;
        }
        
        .badge.bg-success {
            background-color: var(--light-green) !important;
        }
        .logout{
            color:red;
        }
    </style>
</head>
<body>
         <!-- Navbar -->
     <nav class="navbar navbar-expand-lg navbar-light sticky-top" id="mainNavbar">
        <div class="container">
            <a class="navbar-brand" href="index.php">
                <img src="{{url('images/zeloo-light.png')}}" alt="Zeloo" height="40">
            </a>
            <!-- Botão do menu mobile -->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <!-- Itens do menu -->
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="{{url('/dashboard')}}">
                            <i class="bi bi-speedometer2 me-1"></i>
                            Dashboard
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{url('denuncias')}}">
                            <i class="bi bi-shield-exclamation me-1"></i>
                            Analisar Denúncias
                        </a>
                    </li>
                   
                </ul>
                <a class="nav-link" href="{{url('/logoutUser')}}">
                           <t class="logout"> LOGOUT</t>
                </a>
                
            </div>
        </div>
    </nav>



         <!-- Header da Seção -->
     <div class="container-fluid bg-light py-3">
    <div class="container">
             <h2 class="h4 mb-0 text-primary">
                 <i class="bi bi-speedometer2 me-2"></i>
                 Dashboard
             </h2>
             <p class="text-muted mb-0 mt-1">Visão geral do sistema de cuidado aos idosos</p>
         </div>
     </div>

     <!-- Cards de Estatísticas Rápidas -->
     <div class="container my-4">
        <div class="row">
                         <div class="col-lg-6 col-md-6 mb-4">
                 <div class="card stats-card border-0 shadow-sm h-100">
                     <div class="card-body">
                         <div class="d-flex align-items-center">
                             <div class="flex-shrink-0">
                                 <div class="bg-danger bg-opacity-10 rounded-circle p-3">
                                     <i class="bi bi-exclamation-triangle text-danger" style="font-size: 1.5rem;"></i>
                                 </div>
                             </div>
                             <div class="flex-grow-1 ms-3">
                                                                  <h6 class="card-title text-muted mb-1">Total de Reclamações</h6>
                                  <h3 class="mb-0 fw-bold text-danger">847</h3>
                                  <small class="text-danger">
                                      <i class="bi bi-arrow-up me-1"></i>+12% este mês
                                  </small>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>

                         <div class="col-lg-6 col-md-6 mb-4">
                 <div class="card stats-card border-0 shadow-sm h-100">
                     <div class="card-body">
                         <div class="d-flex align-items-center">
                             <div class="flex-shrink-0">
                                 <div class="bg-success bg-opacity-10 rounded-circle p-3">
                                     <i class="bi bi-currency-dollar text-success" style="font-size: 1.5rem;"></i>
                                 </div>
                             </div>
                             <div class="flex-grow-1 ms-3">
                                                                  <h6 class="card-title text-muted mb-1">Cuidadores Ativos</h6>
                                  <h3 class="mb-0 fw-bold text-success">156</h3>
                                  <small class="text-success">
                                      <i class="bi bi-arrow-up me-1"></i>+8% este mês
                                  </small>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>

            
        </div>
    </div>

    <!-- Gráficos -->
    <div class="container mb-5">
        <div class="row">
            <!-- Gráfico de Reclamações -->
            <div class="col-lg-6 mb-4">
                <div class="card border-0 shadow-sm h-100">
                    <div class="card-header bg-white border-0 py-3">
                                                 <h5 class="mb-0">
                             <i class="bi bi-exclamation-triangle text-danger me-2"></i>
                             Reclamações por Mês
                         </h5>
                         <p class="text-muted mb-0 mt-1">Evolução das reclamações de cuidado aos idosos</p>
                    </div>
                    <div class="card-body">
                        <div class="chart-container">
                            <canvas id="reclamacoesChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>

                         <!-- Gráfico de Cuidadores Ativos -->
             <div class="col-lg-6 mb-4">
                 <div class="card border-0 shadow-sm h-100">
                     <div class="card-header bg-white border-0 py-3">
                                                  <h5 class="mb-0">
                              <i class="bi bi-people text-success me-2"></i>
                              Cuidadores Ativos
                          </h5>
                          <p class="text-muted mb-0 mt-1">Evolução de cuidadores ativos por mês</p>
                     </div>
                     <div class="card-body">
                         <div class="chart-container">
                             <canvas id="cuidadoresChart"></canvas>
                         </div>
                     </div>
                 </div>
             </div>

             <!-- Gráfico de Receita -->
             <div class="col-lg-6 mb-4">
                 <div class="card border-0 shadow-sm h-100">
                     <div class="card-header bg-white border-0 py-3">
                                                  <h5 class="mb-0">
                              <i class="bi bi-cash-stack text-success me-2"></i>
                              Receita Mensal
                          </h5>
                          <p class="text-muted mb-0 mt-1">Receita total dos últimos 6 meses</p>
                     </div>
                     <div class="card-body">
                         <div class="chart-container">
                             <canvas id="receitaChart"></canvas>
                         </div>
                     </div>
                 </div>
             </div>

             <!-- Gráfico de Rentabilidade -->
             <div class="col-lg-6 mb-4">
                 <div class="card border-0 shadow-sm h-100">
                     <div class="card-header bg-white border-0 py-3">
                                                  <h5 class="mb-0">
                              <i class="bi bi-graph-up text-primary me-2"></i>
                              Rentabilidade Anual
                          </h5>
                          <p class="text-muted mb-0 mt-1">Evolução da rentabilidade ao longo do ano</p>
                     </div>
                     <div class="card-body">
                         <div class="chart-container">
                             <canvas id="rentabilidadeChart"></canvas>
                         </div>
                     </div>
                 </div>
             </div>

                          <!-- Gráfico de Pizza - Tipos de Reclamações -->
              <div class="col-lg-6 mb-4">
                <div class="card border-0 shadow-sm h-100">
                    <div class="card-header bg-white border-0 py-3">
                                                 <h5 class="mb-0">
                             <i class="bi bi-pie-chart text-info me-2"></i>
                             Tipos de Reclamações
                         </h5>
                         <p class="text-muted mb-0 mt-1">Distribuição por categoria de cuidado</p>
                    </div>
                    <div class="card-body">
                        <div class="chart-container">
                            <canvas id="tiposReclamacoesChart"></canvas>
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
             const navbar = document.getElementById('mainNavbar');
             if (window.scrollY > 50) {
                 navbar.classList.add('scrolled');
             } else {
                 navbar.classList.remove('scrolled');
             }
         });
     </script>
     
     <script>
         // Aguardar o carregamento da página
         document.addEventListener('DOMContentLoaded', function() {
             // Gráfico de Reclamações
             const reclamacoesCtx = document.getElementById('reclamacoesChart');
             if (reclamacoesCtx) {
                 new Chart(reclamacoesCtx, {
                     type: 'line',
                     data: {
                         labels: ['Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                         datasets: [{
                             label: 'Reclamações',
                             data: [120, 145, 135, 160, 180, 200],
                             borderColor: '#4CAF50',
                             backgroundColor: 'rgba(76, 175, 80, 0.1)',
                             borderWidth: 3,
                             fill: true,
                             tension: 0.4
                         }]
                     },
                     options: {
                         responsive: true,
                         maintainAspectRatio: false,
                         plugins: {
                             legend: {
                                 display: false
                             }
                         },
                         scales: {
                             y: {
                                 beginAtZero: true,
                                 grid: {
                                     color: 'rgba(0,0,0,0.05)'
                                 }
                             },
                             x: {
                                 grid: {
                                     display: false
                                 }
                             }
                         }
                     }
                 });
             }

                           // Gráfico de Cuidadores Ativos
              const cuidadoresCtx = document.getElementById('cuidadoresChart');
              if (cuidadoresCtx) {
                  new Chart(cuidadoresCtx, {
                      type: 'bar',
                      data: {
                          labels: ['Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                          datasets: [{
                              label: 'Cuidadores Ativos',
                              data: [140, 145, 150, 148, 152, 156],
                              backgroundColor: [
                                  'rgba(76, 175, 80, 0.8)',
                                  'rgba(76, 175, 80, 0.8)',
                                  'rgba(76, 175, 80, 0.8)',
                                  'rgba(76, 175, 80, 0.8)',
                                  'rgba(76, 175, 80, 0.8)',
                                  'rgba(76, 175, 80, 0.8)'
                              ],
                              borderColor: '#4CAF50',
                              borderWidth: 1
                          }]
                      },
                      options: {
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                              legend: {
                                  display: false
                              }
                          },
                          scales: {
                              y: {
                                  beginAtZero: true,
                                  grid: {
                                      color: 'rgba(0,0,0,0.05)'
                                  }
                              },
                              x: {
                                  grid: {
                                      display: false
                                  }
                              }
                          }
                      }
                  });
              }

              // Gráfico de Receita
              const receitaCtx = document.getElementById('receitaChart');
              if (receitaCtx) {
                  new Chart(receitaCtx, {
                      type: 'bar',
                      data: {
                          labels: ['Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                          datasets: [{
                              label: 'Receita (R$)',
                              data: [32000, 38000, 42000, 45000, 48000, 52000],
                              backgroundColor: [
                                  'rgba(129, 199, 132, 0.8)',
                                  'rgba(129, 199, 132, 0.8)',
                                  'rgba(129, 199, 132, 0.8)',
                                  'rgba(129, 199, 132, 0.8)',
                                  'rgba(129, 199, 132, 0.8)',
                                  'rgba(129, 199, 132, 0.8)'
                              ],
                              borderColor: '#81C784',
                              borderWidth: 1
                          }]
                      },
                      options: {
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                              legend: {
                                  display: false
                              }
                          },
                          scales: {
                              y: {
                                  beginAtZero: true,
                                  grid: {
                                      color: 'rgba(0,0,0,0.05)'
                                  }
                              },
                              x: {
                                  grid: {
                                      display: false
                                  }
                              }
                          }
                      }
                  });
              }

              // Gráfico de Rentabilidade
              const rentabilidadeCtx = document.getElementById('rentabilidadeChart');
              if (rentabilidadeCtx) {
                  new Chart(rentabilidadeCtx, {
                      type: 'line',
                      data: {
                          labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                          datasets: [{
                              label: 'Rentabilidade (%)',
                              data: [18.5, 19.2, 20.1, 21.3, 22.0, 21.8, 22.5, 23.1, 23.8, 24.2, 23.9, 23.5],
                              borderColor: '#A5D6A7',
                              backgroundColor: 'rgba(165, 214, 167, 0.1)',
                              borderWidth: 3,
                              fill: true,
                              tension: 0.4
                          }]
                      },
                      options: {
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                              legend: {
                                  display: false
                              }
                          },
                          scales: {
                              y: {
                                  beginAtZero: true,
                                  grid: {
                                      color: 'rgba(0,0,0,0.05)'
                                  }
                              },
                              x: {
                                  grid: {
                                      display: false
                                  }
                              }
                          }
                      }
                  });
              }

             // Gráfico de Pizza - Tipos de Reclamações
             const tiposReclamacoesCtx = document.getElementById('tiposReclamacoesChart');
             if (tiposReclamacoesCtx) {
                 new Chart(tiposReclamacoesCtx, {
                     type: 'doughnut',
                     data: {
                         labels: ['Negligência no Cuidado', 'Atraso no Atendimento', 'Má Comunicação', 'Assédio', 'Outros'],
                         datasets: [{
                             data: [35, 25, 20, 15, 5],
                             backgroundColor: [
                                 '#4CAF50',
                                 '#81C784',
                                 '#A5D6A7',
                                 '#C8E6C9',
                                 '#E8F5E8'
                             ],
                             borderWidth: 0
                         }]
                     },
                     options: {
                         responsive: true,
                         maintainAspectRatio: false,
                         plugins: {
                             legend: {
                                 position: 'bottom',
                                 labels: {
                                     padding: 20,
                                     usePointStyle: true
                                 }
                             }
                         }
                     }
                 });
             }
         });
     </script>
</body>
</html>
