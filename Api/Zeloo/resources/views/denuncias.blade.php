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
    transition: 0.3s;
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

.tipo {
    border: 1px;
    border-color: red;
}

.card-text {
    color: red;
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
        <li><a href="{{url('/dashboard')}}" class="active"><i class="bi bi-speedometer2"></i> Dashboard</a></li>
        <li><a href="{{url('denuncias')}}"><i class="bi bi-shield-exclamation"></i> Analisar Denúncias</a></li>
        <li><a href="{{url('denunciados')}}"><i class="bi bi-clipboard-check"></i> Analisar Respostas</a></li>
        <li class="logout"><a href="{{url('/logoutUser')}}"><i class="bi bi-box-arrow-right"></i> Logout</a></li>
    </ul>
</div>

<!-- Header -->
<div class="container-fluid py-3" style="background-color: #206bb6;">
    <div class="container">
        <h2 class="h4 mb-0 text-white">
            <i class="bi bi-shield-exclamation me-2"></i> Denúncias
        </h2>
        <p class="mb-0 mt-1" style="color: #e6e6e6;">Gerencie e analise todas as denúncias do sistema</p>
    </div>
</div>

<!-- Busca -->
<div class="container mt-4">
    <form action="{{ url('denuncias') }}" method="GET" class="d-flex">
        <input type="text" name="search" class="form-control me-2" placeholder="Buscar denunciado pelo nome..." value="{{ request('search') }}">
        <button class="btn btn-primary"><i class="bi bi-search"></i></button>
    </form>
</div>

<!-- Tabela -->
@if($usuarios->isEmpty())
<p class="text-center mt-4">Nenhuma denúncia encontrada.</p>
@else
<table class="table mt-4">
    <thead>
        <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Motivo</th>
            <th>Status</th>
            <th>Banir</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($usuarios as $usuario)
        <tr>
            <td>{{ $usuario->id }}</td>
            <td>{{ $usuario->nome }}</td>
            <td>{{ $usuario->motivo }}</td>
            <td>{{ $usuario->status }}</td>
            <td>
                <a href="#" class="btn btn-primary" onclick="abrirModalBanir('{{ $usuario->id }}','{{ $usuario->nome }}','{{ $usuario->motivo }}','{{ $usuario->desc }}','{{ $usuario->evidencia }}','usuario')">Banir usuário</a>
            </td>
            <td>
                <a href="#" class="btn btn-primary" onclick="abrirModalBanir('{{ $usuario->id }}','{{ $usuario->nome }}','{{ $usuario->motivo }}','{{ $usuario->desc }}','{{ $usuario->evidencia }}','profissional')">Banir profissional</a>
            </td>
        </tr>
        @endforeach
    </tbody>
</table>
<div class="d-flex justify-content-center">{{ $usuarios->links('pagination::bootstrap-5') }}</div>
@endif

<!-- Modal -->
<div class="modal fade" id="banUserModal" tabindex="-1">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bg-danger text-white">
                <h5 class="modal-title"><i class="bi bi-person-x"></i> Banir Usuário/Profissional</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <form id="banForm" method="POST" action="{{ route('banir.usuario') }}">
                    @csrf
                    <input type="hidden" name="_method" id="banFormMethod" value="POST">
                    <input type="hidden" name="origem" id="banFormOrigem" value="">

                    <div class="row">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label class="form-label">ID</label>
                                <input type="text" id="banUserId" name="idUsuario" class="form-control" readonly>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Nome</label>
                                <input type="text" id="banUserName" class="form-control" readonly>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Origem</label>
                                <input type="text" id="banUserOrigem" class="form-control" readonly>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label class="form-label">Motivo do banimento *</label>
                                <textarea id="banUserMotivo" name="motivoDenuncia" class="form-control" rows="2" placeholder="Descreva o motivo principal" required></textarea>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Descrição detalhada *</label>
                                <textarea id="banUserDesc" name="descDenuncia" class="form-control" rows="3" placeholder="Contextualize a denúncia" required></textarea>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Evidências</label>
                                <textarea id="banUserEvidencia" name="evidenciaDenuncia" class="form-control" rows="3" placeholder="Links, prints ou outras provas"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="submit" class="btn btn-danger"><i class="bi bi-person-x"></i> Confirmar Banimento</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/js/bootstrap.bundle.min.js"></script>
<script>
const banirUsuarioRoute = "{{ route('banir.usuario') }}";

function abrirModalBanir(id, nome, motivo, desc, evidencia, origem) {
    const form = document.getElementById('banForm');
    const methodInput = document.getElementById('banFormMethod');
    const origemHidden = document.getElementById('banFormOrigem');

    if (origem === 'usuario') {
        form.action = banirUsuarioRoute;
        methodInput.value = 'POST';
    } else {
        form.action = "/excluirPerfilFree/" + id;
        methodInput.value = 'DELETE';
    }

    document.getElementById('banUserId').value = id;
    document.getElementById('banUserName').value = nome;
    document.getElementById('banUserMotivo').value = motivo;
    document.getElementById('banUserDesc').value = desc;
    document.getElementById('banUserEvidencia').value = evidencia;
    document.getElementById('banUserOrigem').value = origem;
    origemHidden.value = origem;

    new bootstrap.Modal(document.getElementById('banUserModal')).show();
}
</script>

</body>
</html>
