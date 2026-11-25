/*fonte*/
const MINIMO = 0.8;   
const MAXIMO = 1.5;  
const PASSO = 0.1;

const botaoMenos = document.getElementById('fonte-menos');
const botaoMais = document.getElementById('fonte-mais');
const botaoReset = document.getElementById('fonte-reset');

let escala = 1;
try {
  escala = parseFloat(localStorage.getItem('escala')) || 1;
} catch (e) {}

function aplicarEscala(valor) {
  escala = Math.min(MAXIMO, Math.max(MINIMO, Math.round(valor * 10) / 10));

  document.documentElement.style.setProperty('--escala', escala);

  botaoMenos.disabled = escala <= MINIMO;
  botaoMais.disabled = escala >= MAXIMO;

  try {
    localStorage.setItem('escala', escala);
  } catch (e) {}
}

botaoMenos.addEventListener('click', function () { aplicarEscala(escala - PASSO); });
botaoMais.addEventListener('click', function () { aplicarEscala(escala + PASSO); });
botaoReset.addEventListener('click', function () { aplicarEscala(1); });

aplicarEscala(escala);

/*Tema*/
const botao = document.getElementById('botao-tema');
const raiz = document.documentElement;

function aplicarTema(tema) {
  raiz.setAttribute('data-tema', tema);

  if (tema === 'escuro') {
    botao.textContent = '☀️';
    botao.setAttribute('aria-label', 'Mudar para modo claro');
  } else {
    botao.textContent = '🌙';
    botao.setAttribute('aria-label', 'Mudar para modo escuro');
  }

  try {
    localStorage.setItem('tema', tema);
  } catch (e) {
  }
}

botao.addEventListener('click', function () {
  const atual = raiz.getAttribute('data-tema');
  aplicarTema(atual === 'escuro' ? 'claro' : 'escuro');
});

aplicarTema(raiz.getAttribute('data-tema') || 'claro');

/*login*/
const minhaconta = document.getElementById("minhaconta");
const caixaConta = document.getElementById("caixaConta");

const login = document.getElementById("login");
const cadastro = document.getElementById("cadastro");
const perfil = document.getElementById("perfil");

const mensagem = document.getElementById("mensagem");

minhaconta.addEventListener("click", function () {

    if (caixaConta.style.display === "block") {
        caixaConta.style.display = "none";
    } else {
        caixaConta.style.display = "block";

        const usuarioSalvo = localStorage.getItem("usuarioCadastrado");

        if (usuarioSalvo) {
            mostrarPerfil();
        } else {
            login.style.display = "block";
            cadastro.style.display = "none";
            perfil.style.display = "none";
        }
    }
});

function abrirCadastro() {
    login.style.display = "none";
    cadastro.style.display = "block";
    perfil.style.display = "none";
    mensagem.innerText = "";
}

function voltarLogin() {
    cadastro.style.display = "none";
    login.style.display = "block";
    mensagem.innerText = "";
}

function finalizarCadastro() {

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;

    if (nome === "" || email === "" || senha === "" || confirmarSenha === "") {
        mensagem.innerText = "Preencha todos os campos!";
        return;
    }

    if (!email.includes("@")) {
        mensagem.innerText = "O email precisa conter @!";
        return;
    }

    if (senha.length < 8) {
        mensagem.innerText = "A senha deve ter pelo menos 8 caracteres!";
        return;
    }

    if (senha !== confirmarSenha) {
        mensagem.innerText = "As senhas não coincidem!";
        return;
    }

    const usuario = {
        nome: nome,
        email: email,
        senha: senha
    };

    localStorage.setItem("usuarioCadastrado", JSON.stringify(usuario));

    mensagem.innerText = "Cadastro realizado com sucesso!";

    caixaConta.style.display = "none";
}
function entrar() {

    const usuarioDigitado = document.getElementById("usuario").value;
    const senhaDigitada = document.getElementById("senhaLogin").value;

    const usuarioSalvo = localStorage.getItem("usuarioCadastrado");

    if (!usuarioSalvo) {
        mensagem.innerText = "Nenhum usuário cadastrado!";
        return;
    }

    const usuario = JSON.parse(usuarioSalvo);

    if (
        usuarioDigitado === usuario.email &&
        senhaDigitada === usuario.senha
    ) {
        mostrarPerfil();
    } else {
        mensagem.innerText = "Usuário ou senha incorretos!";
    }
}

function mostrarPerfil() {

    const usuarioSalvo = localStorage.getItem("usuarioCadastrado");
    const usuario = JSON.parse(usuarioSalvo);

    login.style.display = "none";
    cadastro.style.display = "none";
    perfil.style.display = "block";

    document.getElementById("nomePerfil").innerText =
        "Nome: " + usuario.nome;

    document.getElementById("emailPerfil").innerText =
        "Email: " + usuario.email;

    mensagem.innerText = "";
}
function sair() {
    login.style.display = "block";
    perfil.style.display = "none";
    cadastro.style.display = "none";
    mensagem.innerText = "";
}