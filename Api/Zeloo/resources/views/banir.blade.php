<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Banir Usuários - Admin</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css" rel="stylesheet">
    <style>
        :root {
            --primary-green: #4CAF50;
            --light-green: #81C784;
            --dark-green: #228B22;
            --lighter-green: #A5D6A7;
            --very-light-green: #C8E6C9;
            --white: #ffffff;
            --light-gray: #f8f9fa;
            --text-dark: #2c3e50;
            --text-muted: #6c757d;
        }

        body {
            background-color: var(--white);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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

        .nav-link {
            color: var(--text-dark) !important;
            font-weight: 500;
            margin: 0 15px;
            transition: color 0.3s ease;
        }

        .nav-link:hover, .nav-link.active {
            color: var(--primary-green) !important;
        }

        .card {
            border: 1px solid #e9ecef;
            border-radius: 15px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            background: white;
        }

        .card-header {
            background: white;
            border: none;
            border-radius: 15px 15px 0 0 !important;
            color: var(--text-dark);
            font-weight: 600;
        }

        .btn-primary {
            background-color: var(--primary-green);
            border-color: var(--primary-green);
            color: white;
        }

        .btn-primary:hover {
            background-color: var(--light-green);
            border-color: var(--light-green);
        }

        .btn-danger {
            background-color: #dc3545;
            border-color: #dc3545;
        }

        .btn-danger:hover {
            background-color: #c82333;
            border-color: #bd2130;
        }

        .btn-outline-primary {
            color: var(--primary-green);
            border-color: var(--primary-green);
        }
        .btn-outline-primary:hover {
            background-color: var(--primary-green);
            border-color: var(--primary-green);
            color: white;
        }

        .btn-outline-secondary {
            color: var(--text-muted);
            border-color: var(--text-muted);
        }
        .btn-outline-secondary:hover {
            background-color: var(--text-muted);
            border-color: var(--text-muted);
        }

        .search-box {
            background: var(--light-gray);
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .user-card {
            transition: transform 0.2s ease;
        }

        .user-card:hover {
            transform: translateY(-2px);
        }

        .status-badge {
            font-size: 0.8rem;
            padding: 5px 10px;
        }

        .ban-form {
            background: white;
            border-radius: 15px;
            padding: 25px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .text-primary {
            color: var(--primary-green) !important;
        }

        .bg-primary {
            background-color: var(--primary-green) !important;
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
    <nav class="navbar navbar-expand-lg navbar-light sticky-top" id="mainNavbar">
        <div class="container">
            <a class="navbar-brand" href="index.php">
                <img src="images/zeloo-light.png" alt="Zeloo" height="40">
            </a>
            <!-- Botão do menu mobile -->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <!-- Itens do menu -->
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="{{url('/')}}">
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
                    <li class="nav-item">
                        <a class="nav-link" href="{{url('banir')}}">
                            <i class="bi bi-person-x me-1"></i>
                            Banir Usuários
                        </a>
                    </li>
                    
                </ul>

                
            </div>
        </div>
    </nav>

    <!-- Header da Seção -->
    <div class="container-fluid bg-light py-3" style="margin-top: 80px;">
        <div class="container">
            <h2 class="h4 mb-0 text-primary">
                <i class="bi bi-person-x me-2"></i>
                Gerenciamento de Usuários
            </h2>
            <p class="text-muted mb-0 mt-1">Pesquise e gerencie usuários do sistema</p>
        </div>
    </div>

    <!-- Search Section -->
    <div class="container my-4">
        <div class="search-box">
            <div class="row">
                <div class="col-md-6">
                    <div class="input-group">
                        <span class="input-group-text">
                            <i class="bi bi-search"></i>
                        </span>
                        <input type="text" class="form-control" id="searchInput" placeholder="Pesquisar por ID, nome ou email...">
                        <button class="btn btn-primary" type="button" onclick="searchUsers()">
                            <i class="bi bi-search"></i> Pesquisar
                        </button>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="d-flex justify-content-end">
                        <button class="btn btn-outline-primary me-2" onclick="showAllUsers()">
                            <i class="bi bi-list"></i> Ver Todos
                        </button>
                        <button class="btn btn-success" onclick="exportUsers()">
                            <i class="bi bi-download"></i> Exportar
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Users List -->
        <div class="row" id="usersList">
            <!-- User cards will be populated here -->
        </div>
    </div>

    <!-- Ban User Modal -->
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
                        <form id="banForm">
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
                                        <label class="form-label">Motivo do Banimento *</label>
                                        <select class="form-select" id="banReason" required>
                                            <option value="">Selecione um motivo</option>
                                            <option value="violacao_termos">Violação dos Termos de Uso</option>
                                            <option value="comportamento_inadequado">Comportamento Inadequado</option>
                                            <option value="denuncias_multiplas">Múltiplas Denúncias</option>
                                            <option value="negligencia">Negligência no Cuidado</option>
                                            <option value="assedio">Assédio ou Abuso</option>
                                            <option value="fraude">Fraude ou Falsificação</option>
                                            <option value="outros">Outros</option>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Duração do Banimento</label>
                                        <select class="form-select" id="banDuration">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Descrição Detalhada *</label>
                                <textarea class="form-control" id="banDescription" rows="4" placeholder="Descreva detalhadamente o motivo do banimento..." required></textarea>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Evidências (opcional)</label>
                                <textarea class="form-control" id="banEvidence" rows="3" placeholder="Liste as evidências que justificam o banimento..."></textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-info" id="backToDenunciaBtn" style="display: none;" onclick="backToDenuncia()">
                            <i class="bi bi-arrow-left"></i> Voltar à Denúncia
                        </button>
                        <button type="button" class="btn btn-danger" onclick="confirmBan()">
                            <i class="bi bi-person-x"></i> Confirmar Banimento
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>                               <option value="temporario">Temporário (7 dias)</option>
                                            <option value="medio">Médio (30 dias)</option>
                                            <option value="permanente">Permanente</option>
                                        </select>
                                    </div>
                                </div>
             

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        // Sample users data
        const users = [
            { id: "001", name: "Maria Silva", email: "maria@email.com", type: "Cuidador", status: "Ativo", joinDate: "2024-01-15", complaints: 0 },
            { id: "002", name: "João Santos", email: "joao@email.com", type: "Familiar", status: "Ativo", joinDate: "2024-02-20", complaints: 2 },
            { id: "003", name: "Ana Costa", email: "ana@email.com", type: "Cuidador", status: "Suspenso", joinDate: "2024-01-10", complaints: 3 },
            { id: "004", name: "Pedro Lima", email: "pedro@email.com", type: "Familiar", status: "Ativo", joinDate: "2024-03-05", complaints: 1 },
            { id: "005", name: "Lucia Ferreira", email: "lucia@email.com", type: "Cuidador", status: "Banido", joinDate: "2023-12-01", complaints: 5 },
            { id: "006", name: "Carlos Oliveira", email: "carlos@email.com", type: "Familiar", status: "Ativo", joinDate: "2024-02-28", complaints: 0 },
            { id: "007", name: "Fernanda Rocha", email: "fernanda@email.com", type: "Cuidador", status: "Ativo", joinDate: "2024-01-25", complaints: 1 },
            { id: "008", name: "Roberto Alves", email: "roberto@email.com", type: "Familiar", status: "Suspenso", joinDate: "2024-02-10", complaints: 4 }
        ];

        let filteredUsers = [...users];

        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Initialize page
        document.addEventListener('DOMContentLoaded', function() {
            displayUsers(filteredUsers);
            
            // Check if user was redirected from denuncia page
            const banSource = sessionStorage.getItem('banSource');
            if (banSource === 'denuncia') {
                const userId = sessionStorage.getItem('banUserId');
                const userName = sessionStorage.getItem('banUserName');
                const userType = sessionStorage.getItem('banUserType');
                const denunciaId = sessionStorage.getItem('denunciaId');
                
                // Auto-open ban modal with pre-filled data
                setTimeout(() => {
                    banUser(userId, userName, userType);
                    
                    // Add denuncia context to description
                    const descriptionField = document.getElementById('banDescription');
                    if (descriptionField) {
                        descriptionField.value = `Banimento relacionado à denúncia #${denunciaId}.\n\n`;
                    }
                    
                    // Clear session storage
                    sessionStorage.removeItem('banUserId');
                    sessionStorage.removeItem('banUserName');
                    sessionStorage.removeItem('banUserType');
                    sessionStorage.removeItem('banSource');
                    sessionStorage.removeItem('denunciaId');
                }, 500);
            }
        });

        function displayUsers(userList) {
            const container = document.getElementById('usersList');
            container.innerHTML = '';

            userList.forEach(user => {
                const statusClass = getStatusClass(user.status);
                const card = `
                    <div class="col-lg-6 col-xl-4 mb-4">
                        <div class="card user-card">
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-start mb-3">
                                    <div>
                                        <h6 class="card-title mb-1">${user.name}</h6>
                                        <p class="text-muted mb-0">ID: ${user.id}</p>
                                        <small class="text-muted">${user.email}</small>
                                    </div>
                                    <span class="badge ${statusClass} status-badge">${user.status}</span>
                                </div>
                                <div class="row text-center mb-3">
                                    <div class="col-6">
                                        <small class="text-muted">Tipo</small>
                                        <div class="fw-bold">${user.type}</div>
                                    </div>
                                    <div class="col-6">
                                        <small class="text-muted">Denúncias</small>
                                        <div class="fw-bold">${user.complaints}</div>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center">
                                    <small class="text-muted">Membro desde: ${formatDate(user.joinDate)}</small>
                                    ${user.status !== 'Banido' ? `
                                        <button class="btn btn-sm btn-danger" onclick="banUser('${user.id}', '${user.name}', '${user.type}')">
                                            <i class="bi bi-person-x"></i> Banir
                                        </button>
                                    ` : `
                                        <button class="btn btn-sm btn-success" onclick="unbanUser('${user.id}')">
                                            <i class="bi bi-person-check"></i> Desbanir
                                        </button>
                                    `}
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                container.innerHTML += card;
            });
        }

        function getStatusClass(status) {
            switch(status) {
                case 'Ativo': return 'bg-success';
                case 'Suspenso': return 'bg-warning';
                case 'Banido': return 'bg-danger';
                default: return 'bg-secondary';
            }
        }

        function formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('pt-BR');
        }

        function searchUsers() {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            filteredUsers = users.filter(user => 
                user.id.toLowerCase().includes(searchTerm) ||
                user.name.toLowerCase().includes(searchTerm) ||
                user.email.toLowerCase().includes(searchTerm)
            );
            displayUsers(filteredUsers);
        }

        function showAllUsers() {
            filteredUsers = [...users];
            document.getElementById('searchInput').value = '';
            displayUsers(filteredUsers);
        }

        function banUser(userId, userName, userType) {
            document.getElementById('banUserId').value = userId;
            document.getElementById('banUserName').value = userName;
            document.getElementById('banUserType').value = userType;
            
            // Show back button if coming from denuncia
            const backBtn = document.getElementById('backToDenunciaBtn');
            if (sessionStorage.getItem('banSource') === 'denuncia') {
                backBtn.style.display = 'inline-block';
            } else {
                backBtn.style.display = 'none';
            }
            
            const modal = new bootstrap.Modal(document.getElementById('banUserModal'));
            modal.show();
        }

        function backToDenuncia() {
            const denunciaId = sessionStorage.getItem('denunciaId');
            if (denunciaId) {
                window.location.href = `responder-denuncia.php?id=${denunciaId}`;
            } else {
                window.location.href = 'denuncias.php';
            }
        }

        function confirmBan() {
            const userId = document.getElementById('banUserId').value;
            const reason = document.getElementById('banReason').value;
            const description = document.getElementById('banDescription').value;
            
            if (!reason || !description) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }

            // Update user status
            const userIndex = users.findIndex(u => u.id === userId);
            if (userIndex !== -1) {
                users[userIndex].status = 'Banido';
            }

            // Close modal and refresh display
            const modal = bootstrap.Modal.getInstance(document.getElementById('banUserModal'));
            modal.hide();
            
            // Reset form
            document.getElementById('banForm').reset();
            
            // Refresh display
            displayUsers(filteredUsers);
            
            // Check if we should redirect back to denuncia
            const banSource = sessionStorage.getItem('banSource');
            if (banSource === 'denuncia') {
                const denunciaId = sessionStorage.getItem('denunciaId');
                alert(`Usuário ${userId} foi banido com sucesso!`);
                
                // Ask if user wants to go back to denuncia
                if (confirm('Deseja voltar à página da denúncia?')) {
                    if (denunciaId) {
                        window.location.href = `responder-denuncia.php?id=${denunciaId}`;
                    } else {
                        window.location.href = 'denuncias.php';
                    }
                }
            } else {
                alert(`Usuário ${userId} foi banido com sucesso!`);
            }
        }

        function unbanUser(userId) {
            if (confirm('Deseja realmente desbanir este usuário?')) {
                const userIndex = users.findIndex(u => u.id === userId);
                if (userIndex !== -1) {
                    users[userIndex].status = 'Ativo';
                }
                displayUsers(filteredUsers);
                alert(`Usuário ${userId} foi desbanido com sucesso!`);
            }
        }

        function exportUsers() {
            const csvContent = "data:text/csv;charset=utf-8," 
                + "ID,Nome,Email,Tipo,Status,Data de Entrada,Denúncias\n"
                + users.map(user => 
                    `${user.id},${user.name},${user.email},${user.type},${user.status},${user.joinDate},${user.complaints}`
                ).join("\n");
            
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "usuarios.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        // Search on Enter key
        document.getElementById('searchInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchUsers();
            }
        });
    </script>
</body>
</html>
