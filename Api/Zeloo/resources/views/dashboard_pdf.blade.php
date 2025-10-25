<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Relatório Dashboard</title>
    <style>
        body { font-family: Arial, sans-serif; }
        h1 { text-align: center; }
        .info { margin-bottom: 15px; }
        .info p { font-size: 16px; }
    </style>
</head>
<body>
    <h1>Relatório do Dashboard</h1>

    <div class="info">
        <p><strong>Total de Reclamações:</strong> {{ $totalReclamacoes }}</p>
        <p><strong>Total de Cuidadores:</strong> {{ $totalCuidadores }}</p>
        <p><strong>Total de Serviços:</strong> {{ $totalServicos }}</p>
    </div>
</body>
</html>
