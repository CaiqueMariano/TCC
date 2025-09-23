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

        .titulo{
            margin-top:10%;
            text-align:center;
            color:gray;
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
                        <a class="nav-link active" href="{{url('/dashboard')}}">
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
                <i class="bi bi-shield-exclamation me-2"></i>
                Denúncias
            </h2>
            <p class="text-muted mb-0 mt-1">Gerencie e analise todas as denúncias do sistema</p>
        </div>
    </div>



    <!--CARDS DO BIXOOO!!!-->
    <div class="titulo">
   <h1 class="titulo-texto">NÃO EXISTE DENUNCIAS!</h1>
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

    </script>
</body>
</html>
