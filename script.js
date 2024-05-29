document.addEventListener("DOMContentLoaded", () => {
  const nome = document.getElementById("name");
  const birthDate = document.getElementById("birth-date");
  const btnSubmit = document.getElementById("btnSubmit");
  const caixaAlerta = document.getElementById("caixa-alerta");
  const clearC = document.getElementById("clear");

  function showInputs(event) {
    event.preventDefault(); // Previne o comportamento padrão do botão de envio
    if (!nome.checkValidity()) {
      caixaAlerta.innerHTML = `
                  <p id="message">${nome.validationMessage}</p>
              `;
      caixaAlerta.style.background = "rgb(146, 5, 5)";
      caixaAlerta.style.boxShadow = "-8px 4px 47px -4px rgba(255, 2, 2, 0.56)";
    } else if (!birthDate.checkValidity()) {
      caixaAlerta.innerHTML = `
                    <p id="message">${birthDate.validationMessage}</p>
                `;
      caixaAlerta.style.background = "rgb(146, 5, 5)";
      caixaAlerta.style.boxShadow = "-8px 4px 47px -4px rgba(255, 2, 2, 0.56)";
    } else if (nome.checkValidity() && birthDate.checkVisibility()) {
      caixaAlerta.innerHTML = `
                  <p id="message">Nome: ${nome.value}<br>
                      Data de nascimento: ${birthDate.value}
                  </p>
              `;
      caixaAlerta.style.background = "rgb(5, 5, 188)";
      caixaAlerta.style.boxShadow = "-8px 4px 47px -4px rgba(67, 6, 165, 0.56)";
    } else {
      caixaAlerta.innerHTML = ""; // Limpa a mensagem se o valor estiver correto
    }
    setTimeout(() => {
        caixaAlerta.innerHTML = "";
        caixaAlerta.style.background = ""; // Opcional: Reseta o estilo do fundo
        caixaAlerta.style.boxShadow = ""; // Opcional: Reseta o estilo da sombra
      }, 3000);
  }

  clearC.addEventListener("click", () => {
    nome.value = "";
      birthDate.value = "";
  })
  

  btnSubmit.addEventListener("click", showInputs);
});
