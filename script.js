document.addEventListener("DOMContentLoaded", () => {
  const nome = document.getElementById("name");
  const birthDate = document.getElementById("birth-date");
  const btnSubmit = document.getElementById("btnSubmit");
  const btnClear = document.getElementById("clear");
  const btnEdit = document.getElementById("btnEdit");
  const caixaAlerta = document.getElementById("caixa-alerta");
  const dadosTabela = document.getElementById("dadosTabela");
  let indexEdit = null;

  function salvarDados(event) {
    event.preventDefault(); // Previne o comportamento padrão do botão de envio

    if (!nome.checkValidity()) {
      if(nome.validationMessage === "É preciso que o formato corresponda ao exigido."){
        nome.focus();
        mostrarAlerta("Não são permitidos números, espaços ou caracteres especiais no campo nome.");
      }else if(nome.validationMessage === "Preencha este campo."){
        mostrarAlerta("Um dos campos estão vazios. Não é permitido o envio de somente um campo.");
      }else{
        mostrarAlerta(nome.validationMessage);
      }
    } else if (!birthDate.checkValidity()) {
        if(birthDate.validationMessage === "Preencha este campo."){
          mostrarAlerta("Um dos campos estão vazios. Não é permitido o envio de somente um campo.");
        }else{
        mostrarAlerta(birthDate.validationMessage);
        }
    } else {
      const pessoa = {
        nome: nome.value,
        birthDate: birthDate.value,
      };

      let listaPessoas = JSON.parse(localStorage.getItem("listaPessoas")) || [];

      if (indexEdit !== null) {
        listaPessoas[indexEdit] = pessoa;
        indexEdit = null;
      } else {
        listaPessoas.push(pessoa);
      }

      localStorage.setItem("listaPessoas", JSON.stringify(listaPessoas));

      exibirDados();
      limparCampos();
      resetarBotoes();
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
          <td align="center" colspan="2">
            <button class="deletar fa fa-times-circle" title="Editar" onclick="direcionarUsuario(${index})"><img src="img/editar.png"></button>
          </td>
          <td align="center" colspan="3"><button class="deletar fa fa-times-circle" title="Deletar" onclick="deletarPessoa(${index})"><img src="img/excluir.png"></button></td>
        </tr>`;
      dadosTabela.innerHTML += pessoaElement;
    });
  }

  function estilosBotoesEdicao(){
    btnSubmit.style.backgroundColor = "rgb(56, 56, 56)";
    btnSubmit.style.boxShadow = "none";
    btnSubmit.setAttribute("disabled", "");
    btnEdit.style.boxShadow = "-8px 4px 47px -4px rgb(62, 166, 6)";
    btnEdit.style.background = "rgb(90, 238, 11)";
    btnEdit.removeAttribute("disabled");
    btnClear.style.backgroundColor = "rgb(56, 56, 56)";
    btnClear.style.boxShadow = "none";
    btnClear.setAttribute("disabled", "");
  }

  function resetarBotoes(){
    btnSubmit.style.backgroundColor = "";
    btnSubmit.style.boxShadow = "";
    btnSubmit.removeAttribute("disabled");
    btnEdit.style.background = "rgb(56, 56, 56)";
    btnEdit.style.boxShadow = "none";
    btnEdit.setAttribute("disabled", "");
    btnClear.style.backgroundColor = "";
    btnClear.style.boxShadow = "";
    btnClear.removeAttribute("disabled");
  }

  window.direcionarUsuario = function(index){
    const listaPessoas = JSON.parse(localStorage.getItem("listaPessoas")) || [];
    nome.value = listaPessoas[index].nome;
    birthDate.value = listaPessoas[index].birthDate;
    nome.focus();
    indexEdit = index;
    estilosBotoesEdicao();
  }

  function editarPessoa(){
    salvarDados(new Event('submit'));
  }

  window.deletarPessoa = function(index) {
    let listaPessoas = JSON.parse(localStorage.getItem("listaPessoas")) || [];
    listaPessoas.splice(index, 1);
    localStorage.setItem("listaPessoas", JSON.stringify(listaPessoas));
    exibirDados();
  }

  btnSubmit.addEventListener("click", salvarDados);
  btnClear.addEventListener("click", limparCampos);
  btnEdit.addEventListener("click", editarPessoa);
  exibirDados();
});
