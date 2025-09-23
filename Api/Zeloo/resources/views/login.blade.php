<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="{{url('css/main.css')}}">
</head>
<body>
    <div class="page">
    <form action="{{ url('/login') }}" method="post" class="formLogin">
    @csrf
    <h1>Login</h1>
    <p>Digite os seus dados de acesso no campo abaixo.</p>

    <label for="email">E-mail</label>
    <input type="email" name="email" placeholder="Digite seu e-mail" autofocus required />

    <label for="password">Senha</label>
    <input type="password" name="password" placeholder="Digite sua senha" required />

    <input type="submit" value="Acessar" class="btn" />
</form>
    </div>
    
</body>
</html>