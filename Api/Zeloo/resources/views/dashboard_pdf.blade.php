<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Relatório Dashboard</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 14px;
            background-color: #f5f7fa;
            margin: 0;
            padding: 0;
        }

        .header {
            background-color: #007BFF;
            color: #fff;
            padding: 15px;
            text-align: center;
            border-bottom: 4px solid #0056b3;
        }

        h1 {
            margin: 0;
            font-size: 26px;
            letter-spacing: 1px;
        }

        .container {
            padding: 25px 40px;
        }

        .card {
            background: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.15);
            margin-bottom: 20px;
        }

        .card h2 {
            color: #007BFF;
            margin-bottom: 15px;
            font-size: 20px;
        }

        .info p {
            font-size: 16px;
            margin: 8px 0;
            padding: 8px 12px;
            background: #eef3ff;
            border-left: 4px solid #007BFF;
            border-radius: 5px;
        }

        .footer {
            text-align: center;
            margin-top: 30px;
            padding: 12px;
            font-size: 12px;
            color: #555;
        }

    </style>
</head>
<body>

    <div class="header">
        <h1>Relatório do Dashboard</h1>
    </div>

    <div class="container">

        <div class="card">
            <h2>Informações Gerais</h2>

            <div class="info">
                <p><strong>Total de Reclamações:</strong> {{ $totalReclamacoes }}</p>
                <p><strong>Total de Cuidadores:</strong> {{ $totalCuidadores }}</p>
                <p><strong>Total de Idosos:</strong> {{ $totalIdosos }}</p>
                <p><strong>Total de Serviços:</strong> {{ $totalServicos }}</p>

            </div>
        </div>

    </div>

    <div class="footer">
        Relatório gerado automaticamente — {{ date('d/m/Y H:i') }}
    </div>

</body>
</html>
