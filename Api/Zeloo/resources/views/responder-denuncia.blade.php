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
                margin-left: 230px !important;
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
                background: white;
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
            .btn-reativar {
            background-color: #206bb6 !important;
            border-color: #206bb6 !important;
            color: white !important;
}

           .btn-reativar:hover {
            background-color: #185996 !important;
            border-color: #185996 !important;
}
            .logout{
                color:red;
            }

            .mensagem{
    font-style: italic;
    text-decoration: underline;
    margin-top:10%;
    text-align: center;
}


        </style>
    </head>
    <body>


      <!--MJODAL DE CONFIRMAÇÃO-->

      <div class="modal" id="meuModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Usúario Reativado!</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>O usuário foi reativado com sucesso</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Fechar</button>
      </div>
    </div>
  </div>
</div>
    
    <!-- Sidebar -->
    <div class="sidebar">
        <div class="sidebar-header">
            <img src="{{url('images/zeloo-light.png')}}" alt="Zeloo" height="60">
        </div>

        <ul class="sidebar-menu">
            <li>
                <a href="{{url('/dashboard')}}" >
                    <i class="bi bi-speedometer2"></i> Dashboard
                </a>
            </li>
            <li>
                <a href="{{url('denuncias')}}">
                    <i class="bi bi-shield-exclamation"></i> Analisar Denúncias
                </a>
            </li>
            <li>
                <a href="{{url('denunciados')}}" class="active">
                    <i class="bi bi-clipboard-check"></i> Reativação
                </a>
            </li>
            <li class="logout">
                <a href="{{url('/logoutUser')}}">
                    <i class="bi bi-box-arrow-right"></i> Logout
                </a>
            </li>
        </ul>
     </div> <!-- Sidebar -->
     <div class="main-content" style="padding: 0px;">
       


        <!-- Header da Seção -->
     <div class="container-fluid py-3" style="background-color: #206bb6;">  
            <div class="container">
              <h2 class="h4 mb-0 text-white">
                    <i class="bi bi-shield-exclamation me-2"></i>
                    Reativação
                </h2>
                 <p class="mb-0 mt-1" style="color: #e6e6e6;">Análise e reative todos os usuários banidos</p>
            </div>
        </div>


        <div class="container my-4">
    <form action="" method="GET" 
          class="d-flex justify-content-center"
          style="gap: 8px; max-width: 450px; margin: 0 auto;">
        
        <input type="text" name="q" 
               class="form-control"
               style="height: 38px; font-size: 14px;"
               placeholder="Pesquisar por nome do usuário"
               value="{{ request('q') }}">

        <button class="btn btn-success" style="height: 38px; padding: 5px 12px; font-size: 14px; background-color:#206bb6; border-color:#28a745">
            <i class="bi bi-search"></i>
        </button>
    </form>
</div>


    <!--CARDS DO BIXOOO!!!-->


    @if($usuarios->isEmpty())
    <p class="mensagem">Nenhum usuário encontrado</p>
    @else
    <table class="table">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Nome</th>
      <th scope="col">Motivo Denúncia</th>
      <th scope="col">Tipo de Usuario</th>
      <th scope="col">Reativar</th>
    </tr>
  </thead>
  <tbody>
@foreach ($usuarios as $usuario)
    <tr>
        <th scope="row">{{$usuario->id}}</th>
        <td>{{$usuario->nome}}</td>
        <td>{{$usuario->motivo}}</td>
        <td>{{$usuario->origem}}</td>
        <td>
            <a href="#" class="btn btn-reativar btn-sm"
            onclick="abrirModalBanir(
    '{{ $usuario->id }}',
    '{{ $usuario->nome }}',
    '', 
    '{{ $usuario->motivo }}',
    '{{ $usuario->desc }}',
    '{{ $usuario->evidencia }}',
    '{{ $usuario->origem }}'
)">
               Reativar
            </a>
        </td>
    </tr>
@endforeach
</tbody>
</table>
@endif 

 

    <!--MODAL DE BANIMENTO!!!-->
    <div class="modal fade" id="banUserModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header bg-danger text-white">
                        <h5 class="modal-title">
                            <i class="bi bi-person-x"></i> Reativar Usuário
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
                                        <input type="text" class="form-control" id="banUserOrigem" readonly>
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
                            <i class="bi bi-person-x"></i> Confirmar Reativação
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>    
    
    
  


@if(session('mostrarModal'))
<script>
    document.addEventListener("DOMContentLoaded", function () {
        var myModal = new bootstrap.Modal(document.getElementById('meuModal'));
        myModal.show();
    });
</script>
@endif
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/js/bootstrap.bundle.min.js"></script>
    <script>

document.querySelector('input[name="q"]').addEventListener('keyup', function() {
    let valor = this.value.trim();
    let linhas = document.querySelectorAll("table tbody tr");

    linhas.forEach(tr => {
        let id = tr.querySelector("th").innerText;

        if (id.includes(valor) || valor === "") {
            tr.style.display = "";
        } else {
            tr.style.display = "none";
        }
    });
});
        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('mainNavbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        function abrirModalBanir(id, nome, tipo, motivo, desc, evidencia, origem){
            document.getElementById('banUserId').value = id;
            document.getElementById('banUserName').value = nome;
     
            document.getElementById('banUserMotivo').value = motivo;
            document.getElementById('banUserDesc').value = desc;
            document.getElementById('banUserEvidencia').value = evidencia;
           document.getElementById('banUserOrigem').value = origem;

           let form = document.getElementById('banForm');

        if (origem === 'usuario') {
            form.action = `/desbanir/${id}`;
        } else {
            form.action = `/desbanirFree/${id}`;
        }
           
            const modal = new bootstrap.Modal(document.getElementById('banUserModal'));
            modal.show();
        }
    </script>
</body>
</html>