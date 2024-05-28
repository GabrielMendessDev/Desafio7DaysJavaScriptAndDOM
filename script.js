document.addEventListener('DOMContentLoaded', () => {
    
const nome = document.getElementById("name");
const birthDate = document.getElementById("birth-date");
const btnSubmit = document.getElementById("btnSubmit");



function showInputs(event){
    event.preventDefault(); // Previne o comportamento padrão do botão de envio
    alert("Nome: " + nome.value);
    alert("Data de Nascimento: " + birthDate.value);
}

btnSubmit.addEventListener("click",showInputs);
});