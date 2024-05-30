document.addEventListener("DOMContentLoaded", () => {
  const nome = document.getElementById("name");
  const birthDate = document.getElementById("birth-date");
  const btnSubmit = document.getElementById("btnSubmit");
  const caixaAlerta = document.getElementById("caixa-alerta");
  const clearC = document.getElementById("clear");
  const dadosTabela = document.getElementById("dadosTabela");

  function salvarDados(event) {
    event.preventDefault(); // Previne o comportamento padrão do botão de envio

    if (!nome.checkValidity()) {
      mostrarAlerta(nome.validationMessage);
    } else if (!birthDate.checkValidity()) {
      mostrarAlerta(birthDate.validationMessage);
    } else {
      const pessoa = {
        nome: nome.value,
        birthDate: birthDate.value,
      };

      let listaPessoas = JSON.parse(localStorage.getItem("listaPessoas")) || [];
      listaPessoas.push(pessoa);
      localStorage.setItem("listaPessoas", JSON.stringify(listaPessoas));

      exibirDados();
      limparCampos();
    }
  }

  function mostrarAlerta(mensagem) {
    caixaAlerta.innerHTML = `<p id="message">${mensagem}</p>`;
    caixaAlerta.style.background = "rgb(146, 5, 5)";
    caixaAlerta.style.boxShadow = "-8px 4px 47px -4px rgba(255, 2, 2, 0.56)";

    setTimeout(() => {
      caixaAlerta.innerHTML = "";
      caixaAlerta.style.background = ""; // Opcional: Reseta o estilo do fundo
      caixaAlerta.style.boxShadow = ""; // Opcional: Reseta o estilo da sombra
    }, 3000);
  }

  function limparCampos() {
    nome.value = "";
    birthDate.value = "";
  }

  function exibirDados() {
    const listaPessoas = JSON.parse(localStorage.getItem("listaPessoas")) || [];
    dadosTabela.innerHTML = '';

    listaPessoas.forEach((pessoa, index) => {
      const pessoaElement = `
        <tr>
          <td align="center">${pessoa.nome}</td>
          <td align="center">${pessoa.birthDate}</td>
          <td align="center">
            <button class="deletar fa fa-times-circle" title="Deletar" onclick="deletarPessoa(${index})">Deletar</button>
          </td>
        </tr>`;
      dadosTabela.innerHTML += pessoaElement;
    });
  }

  window.deletarPessoa = function(index) {
    let listaPessoas = JSON.parse(localStorage.getItem("listaPessoas")) || [];
    listaPessoas.splice(index, 1);
    localStorage.setItem("listaPessoas", JSON.stringify(listaPessoas));
    exibirDados();
  }

  btnSubmit.addEventListener("click", salvarDados);
  clearC.addEventListener("click", limparCampos);
  exibirDados();
});
