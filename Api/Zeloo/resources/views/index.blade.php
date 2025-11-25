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
            --primary-blue: #206bb6;
            --light-blue: #1876d4c7;
            --lighter-blue: #5b97d3ff;
            --very-light-blue: #78abdfff;
            --white: #ffffff;
            --light-gray: #f8f9fa;
            --text-dark: #2c3e50;
            --text-muted: #6c757d;
        }
        
        body {
            background-color: var(--white);
            color: var(--text-dark);
        }
        /* SIDEBAR */
    .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    width: 230px;
    height: 100%;
    background: 'white';
    padding: 20px 0;
    border-right: 1px solid #eee;
    box-shadow: 2px 0 20px rgba(0, 0, 0, 0.05);
    z-index: 1000;
    }

   .sidebar-header {
    text-align: center;
    margin-bottom: 30px;
}

  .sidebar-menu {
    list-style: none;
    padding: 0;
    margin: 0;
}

  .sidebar-menu li {
    margin-bottom: 5px;
}

.sidebar-menu a {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 20px;
    text-decoration: none;
    color: #2c3e50;
    font-weight: 500;
    font-size: 15px;
    transition: .3s;
}

.sidebar-menu a:hover {
    background: #f1f8f2;
    color: #206bb6;
}

.sidebar-menu a.active {
    background: #e8f5e9;
    color: #206bb6;
    font-weight: 700;
    }

        .sidebar-menu i {
    font-size: 1.2rem;
     }

      .sidebar .logout a {
    color: red !important;
    }

/* Empurrar todo o conteúdo da página para o lado: */
body {
    margin-left: 230px !important;
      }
        .btn-primary {
            background-color: var(--primary-blue);
            border-color: var(--primary-blue);
        }
        .btn-primary:hover {
            background-color: var(--light-blue);
            border-color: var(--light-blue);
        }
        
        .btn-outline-primary {
            color: var(--primary-blue);
            border-color: var(--primary-blue);
        }
        .btn-outline-primary:hover {
            background-color: var(--primary-blue);
            border-color: var(--primary-blue);
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
            background-color: var(--primary-blue) !important;
        }
        
        .bg-success {
            background-color: var(--light-blue) !important;
        }
        
        .text-success {
            color: var(--primary-blue) !important;
        }
        
        .table-light {
            background-color: var(--very-light-blue) !important;
        }
        
        .badge.bg-primary {
            background-color: var(--primary-blue) !important;
        }
        
        .badge.bg-success {
            background-color: var(--light-blue) !important;
        }
        .text-primary {
        color: var(--primary-green) !important;
}

        .logout{
            color:red;
        }
    </style>
</head>
<body>
        <!-- Sidebar -->
<div class="sidebar">
    <div class="sidebar-header">
        <img src="{{url('images/zeloo-light.png')}}" alt="Zeloo" height="60">
        
    </div>

    <ul class="sidebar-menu">
        <li>
            <a href="{{url('/dashboard')}}" class="active">
                <i class="bi bi-speedometer2"></i> Dashboard
            </a>
        </li>

        <li>
            <a href="{{url('denuncias')}}">
                <i class="bi bi-shield-exclamation"></i> Analisar Denúncias
            </a>
        </li>

        <li>
            <a href="{{url('denunciados')}}">
                <i class="bi bi-clipboard-check"></i> Analisar Respostas
            </a>
        </li>

        <li class="logout">
            <a href="{{url('/logoutUser')}}">
                <i class="bi bi-box-arrow-right"></i> Logout
            </a>
        </li>
    </ul>
</div>

       <!-- Header da Seção -->
<div class="container-fluid py-3" style="background-color: #206bb6;">

    <div class="container">
        <h2 class="h4 mb-0 text-white">
            <i class="bi bi-shield-check me-2"></i>
            Sistema de Administração SPLIT
        </h2>

        <p class="mb-0 mt-1" style="color: #e6e6e6;">
            Visão geral do sistema de cuidado aos idosos
        </p>
    </div>
</div>

     <!-- Cards de Estatísticas Rápidas -->
     <div class="container my-4">
        <div class="row">
                         <div class="col-lg-6 col-md-6 mb-4">
                 <div class="card stats-card border-0 shadow-sm h-100">
                     <div class="card-body">
                         <div class="d-flex align-items-center">
                             <div class="flex-grow-1 ms-3">
                             <h6 class="card-title text-muted mb-1">Total de Idosos</h6>
                             <h3 class="mb-0 fw-bold text-primary" id="cardIdosos">0</h3>
                                 
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
                             </div>
                             <div class="flex-grow-1 ms-3">
                             <h6 class="card-title text-muted mb-1">Total de Cuidadores</h6>
                             <h3 class="mb-0 fw-bold text-success" id="cardCuidadores">0</h3>
                                
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
                             </div>
                             <div class="flex-grow-1 ms-3">
                             <h6 class="card-title text-muted mb-1">Atendimentos Realizados</h6>
                             <h3 class="mb-0 fw-bold text-success" id="cardContratos">0</h3>
                                
                             </div>
                         </div>
                     </div>
                 </div>
             </div>

            
        </div>
    </div>

      <div style="text-align: center; margin-top: 20px;">
    <a href="{{ route('download.dashboard.pdf') }}" 
       class="btn btn-primary" 
       style="display:inline-block; background-color:#206bb6; color:#fff; padding:10px 20px; border-radius:8px; text-decoration:none; font-weight:bold; transition:0.3s;">
       📄 Baixar Relatório PDF
    </a>
</div>


<div class="container my-4">
    <div class="row">
        <!-- Gráfico de Idosos Ativos -->
        <div class="col-lg-6 mb-4">
            <div class="card border-0 shadow-sm h-100">
                <div class="card-header bg-white border-0 py-3">
                    <h5 class="mb-0">
                        <i class="bi bi-heart-pulse text-primary me-2"></i>
                        Idosos Ativos
                    </h5>
                    <p class="text-muted mb-0 mt-1">Situação atual do sistema</p>
                </div>
                <div class="card-body">
                    <div class="chart-container">
                        <canvas id="idososAtivosChart"></canvas>
                    </div>
                </div>
            </div>
        </div>

   
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
document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch("{{ url('/dashboard-data') }}");
        const data = await response.json();
        const receitaCtx = document.getElementById('receitaChart');

new Chart(receitaCtx, {
    type: 'bar',
    data: {
        labels: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
        datasets: [{
            label: 'Receita (R$)',
            data: Object.values(data.meses),
            backgroundColor: '#206bb6'
        }]
    },
    options: { 
        responsive: true, 
        maintainAspectRatio: false 
    }
});
        document.getElementById("cardIdosos").innerText = data.totalIdosos;
        document.getElementById("cardCuidadores").innerText = data.totalCuidadores;
        document.getElementById("cardContratos").innerText = data.contratos;
        if (data.semDados) {
            const aviso = document.createElement("div");
            aviso.innerText = "Sem dados disponíveis no momento.";
            aviso.style.textAlign = "center";
            aviso.style.fontWeight = "bold";
            aviso.style.color = "gray";
            document.body.prepend(aviso);
            return;
        }
       
       
        const idososAtivosCtx = document.getElementById('idososAtivosChart');
        new Chart(idososAtivosCtx, {
            type: 'doughnut',
            data: {
                labels: ['Ativos', 'Inativos'],
                datasets: [{
                    data: [data.idososAtivos, data.idososInativos],
                    backgroundColor: ['#206bb6', '#C8E6C9'],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom' } }
            }
        });

    

    
        const reclamacoesCtx = document.getElementById('reclamacoesChart');
        new Chart(reclamacoesCtx, {
            type: 'line',
            data: {
                labels: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
                datasets: [{
                    label: 'Reclamações',
                    data: data.reclamacoesPorMes,
                    borderColor: '#206bb6',
                    backgroundColor: 'rgba(76,175,80,0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });

        // === Cuidadores ===
        const cuidadoresCtx = document.getElementById('cuidadoresChart');
        new Chart(cuidadoresCtx, {
            type: 'bar',
            data: {
                labels: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
                datasets: [{
                    label: 'Cuidadores Ativos',
                    data: data.cuidadoresAtivos,
                    backgroundColor: '#206bb6'
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });

        // === Tipos de Reclamações ===
        const tiposCtx = document.getElementById('tiposReclamacoesChart');
        new Chart(tiposCtx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(data.tiposReclamacoes),
                datasets: [{
                    data: Object.values(data.tiposReclamacoes),
                    backgroundColor: ['#206bb6','#5b97d3ff','#78abdfff','#C8E6C9','#E8F5E9']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom' } }
            }
        });

        // === Receita Mensal ===
    
        // === Rentabilidade Anual ===
        const rentabilidadeCtx = document.getElementById('rentabilidadeChart');
        new Chart(rentabilidadeCtx, {
            type: 'line',
            data: {
                labels: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
                datasets: [{
                    label: 'Rentabilidade (%)',
                    data: data.rentabilidadeAnual,
                    borderColor: '#206bb6',
                    backgroundColor: 'rgba(76,175,80,0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });

    } catch (error) {
        console.error("Erro ao carregar dados do dashboard:", error);
        alert("Ocorreu um erro ao carregar o gráfico.");
    }
});
</script>
</body>
</html>
