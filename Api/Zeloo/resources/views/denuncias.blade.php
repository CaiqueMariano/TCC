<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Analisar Denúncias</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
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

        .btn-outline-success {
            color: var(--primary-green);
            border-color: var(--primary-green);
        }
        .btn-outline-success:hover {
            background-color: var(--primary-green);
            border-color: var(--primary-green);
            color: white;
        }

        .stats-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            background-color: var(--white);
        }
        .stats-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(76, 175, 80, 0.15) !important;
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

        .table-hover tbody tr:hover {
            background-color: rgba(76, 175, 80, 0.05);
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

        .tipo{

            border: 1px;
            border-color:red;
        }

        .card-text{
           
            color:red ;
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
            <a class="navbar-brand" href="#">
                <img src="{{url('images/zeloo-light.png')}}" alt="Zeloo" height="40">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="{{url('/dashboard')}}">
                            <i class="bi bi-speedometer2 me-1"></i>
                            Dashboard
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="{{url('denuncias')}}">
                            <i class="bi bi-shield-exclamation me-1"></i>
                            Analisar Denúncias
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="{{url('denunciados')}}">
                            <i class="bi bi-shield-exclamation me-1"></i>
                            Analisar Respostas
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
                <i class="bi bi-shield-exclamation me-2"></i>
                Denúncias
            </h2>
            <p class="text-muted mb-0 mt-1">Gerencie e analise todas as denúncias do sistema</p>
        </div>
    </div>



    <!--CARDS DO BIXOOO!!!-->



    <table class="table">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Nome</th>
      <th scope="col">Motivo Denúncia</th>
      <th scope="col">Banir Usuario</th>
    </tr>
  </thead>
  <tbody>
    <tr>
        @foreach ($usuarios as $usuario)
      <th scope="row">{{$usuario->idUsuario}}</th>
      <td>{{$usuario->nomeUsuario}}</td>
      <td>{{$usuario->motivoDenuncia}}</td>
      <td><a href="#" 
   class="btn btn-primary" 
   onclick="abrirModalBanir('{{ $usuario->idUsuario }}', '{{ $usuario->nomeUsuario }}', '{{ $usuario->tipoUsuario }}', '{{$usuario->motivoDenuncia}}', '{{$usuario->descDenuncia}}', '{{$usuario->evidenciaDenuncia}}')">
   Banir
</a></td>
    </tr>
    @endforeach
  </tbody>
</table>
    <!--
    <div class="card">
  <h5 class="card-header">{{$usuario->idUsuario}}</h5>
  <div class="card-body">
    <h5 class="card-title">{{$usuario->nomeUsuario}}</h5>
    <div class="tipo">
    <p class="card-text">{{$usuario->motivoDenuncia}}</p>
    <div class="tipo">

    
    <a href="#" 
   class="btn btn-primary" 
   onclick="abrirModalBanir('{{ $usuario->idUsuario }}', '{{ $usuario->nomeUsuario }}', '{{ $usuario->tipoUsuario }}', '{{$usuario->motivoDenuncia}}', '{{$usuario->descDenuncia}}', '{{$usuario->evidenciaDenuncia}}')">
   Banir
</a>
    
  </div>
</div>
<BR>

        </div>
    </div>-->


    <div class="d-flex justify-content-center">
    {{ $usuarios->links('pagination::bootstrap-5') }}
</div>

    <!--MODAL DE BANIMENTO!!!-->
    <div class="modal fade" id="banUserModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header bg-danger text-white">
                        <h5 class="modal-title">
                            <i class="bi bi-person-x"></i> Banir Usuário
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="banForm" method="POST">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label">ID do Usuário</label>
                                        <input type="text" class="form-control" id="banUserId" readonly>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Nome do Usuário</label>
                                        <input type="text" class="form-control" id="banUserName" readonly>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Tipo de Usuário</label>
                                        <input type="text" class="form-control" id="banUserType" readonly>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                    <label class="form-label">Motivo do Banimento</label>
                                    <input type="text" class="form-control" id="banUserMotivo" readonly>
                                    </div>
                            
                            <div class="mb-3">
                            <label class="form-label">Descrição</label>
                            <textarea class="form-control" id="banUserDesc" readonly></textarea>
                            </div>
                            <div class="mb-3">
                            <label class="form-label">Evidências</label>
                            <textarea class="form-control" id="banUserEvidencia" readonly></textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-info" id="backToDenunciaBtn" style="display: none;" onclick="backToDenuncia()">
                            <i class="bi bi-arrow-left"></i> Voltar à Denúncia
                        </button>
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-danger">
                            <i class="bi bi-person-x"></i> Confirmar Banimento
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>         

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/js/bootstrap.bundle.min.js"></script>
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

        function abrirModalBanir(idUsuario, nomeUsuario, tipoUsuario, motivoDenuncia, descDenuncia, evidenciaDenuncia){
            document.getElementById('banUserId').value = idUsuario;
            document.getElementById('banUserName').value = nomeUsuario;
            document.getElementById('banUserType').value = tipoUsuario;
            document.getElementById('banUserMotivo').value = motivoDenuncia;
            document.getElementById('banUserDesc').value = descDenuncia;
            document.getElementById('banUserEvidencia').value = evidenciaDenuncia;
            document.getElementById('banForm').action = '/excluirPerfil/' + idUsuario;
            const modal = new bootstrap.Modal(document.getElementById('banUserModal'));
            modal.show();
        }
    </script>
</body>
</html>
