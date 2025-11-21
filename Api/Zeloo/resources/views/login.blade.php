<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <title>Login</title>
    <link rel="stylesheet" href="{{url('css/main.css')}}">
</head>

    <style>
        body {
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #3BAAFF, #0955a0ff);
            font-family: Arial, Helvetica, sans-serif;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .formContainer {
            background: #fff;
            padding: 40px;
            border-radius: 20px;
            width: 350px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            animation: fadeIn .4s ease;
        }

        @keyframes fadeIn {
            from {opacity: 0; transform: translateY(20px);}
            to {opacity: 1; transform: translateY(0);}
        }

        h1 {
            text-align: center;
            color: #206bb6;
            margin-bottom: 10px;
        }

        p {
            text-align: center;
            font-size: 14px;
            color: #777;
            margin-bottom: 25px;
        }

        label {
            font-weight: bold;
            font-size: 14px;
            color: #333;
        }

        input {
            width: 100%;
            padding: 12px;
            margin-top: 5px;
            margin-bottom: 20px;
            border: 1px solid #bbb;
            border-radius: 10px;
            font-size: 15px;
            outline: none;
            transition: .3s;
        }

        input:focus {
            border-color: #3BAAFF;
            box-shadow: 0 0 6px #3BAAFF88;
        }

        .btn {
            background-color: #3BAAFF; 
            color: black; 
            padding: 14px;
            border: none; 
            border-radius: 15px; 
            font-size: 16px; 
            cursor: pointer; 
            width: 100%; 
            transition: .3s; 
            font-weight: bold;
        }

        .btn:hover {
            background-color: #206bb6; 
        }
    </style>
</head>

<body>
    <form action="{{ url('/login') }}" method="post" class="formContainer">
        @csrf
        <h1>Login</h1>
        <p>Digite seus dados de acesso.</p>

        <label for="email">E-mail</label>
        <input type="email" name="email" placeholder="Digite seu e-mail" required />

        <label for="password">Senha</label>
        <input type="password" name="password" placeholder="Digite sua senha" required />

        <input type="submit" value="Acessar" class="btn" />
    </form>
</body>
</html>