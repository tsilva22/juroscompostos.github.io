// Autores: Thaís Oliveira & Johnathan Soares
// Data: 24/02/2023

//Seleciona os elementos
const botao1 = document.querySelector(".button1");
const botao2 = document.querySelector(".button2");
const menu1 = document.querySelector(".input-suspenso1");
const menu2 = document.querySelector(".input-suspenso2");

//adiciona o event listener para o botão 1
botao1.addEventListener("click", () => {
  // ativa o menu suspenso do botão 1 e desativa o do botão 2
  menu1.classList.add("ativo");
  menu2.classList.remove("ativo");
  // adiciona a classe de botão ativo no botão 1 e remove do botão 2
  botao1.classList.add("ativo");
  botao2.classList.remove("ativo");
});

//// adiciona o event listener para o botão 2
botao2.addEventListener("click", () => {
  // ativa o menu suspenso do botão 2 e desativa o do botão 1
  menu2.classList.add("ativo");
  menu1.classList.remove("ativo");
  // adiciona a classe de botão ativo no botão 2 e remove do botão 1
  botao2.classList.add("ativo");
  botao1.classList.remove("ativo");
});

//verificando se o usuário clicar em outra parte do site para desativar o menu suspenso
document.addEventListener("click", function (event) {
  const isClickInside1 = botao1.contains(event.target);
  const isClickInside2 = botao2.contains(event.target);

  if (!isClickInside1) {
    menu1.classList.remove("ativo");
    botao1.classList.remove("ativo");
  }
  if (!isClickInside2) {
    menu2.classList.remove("ativo");
    botao2.classList.remove("ativo");
  }
});

//escolhendo as opções do menu suspenso
const taxa = document.querySelectorAll(".input-suspenso1-taxa");
const periodo = document.querySelectorAll(".input-suspenso2-periodo");

taxa.forEach((taxa) => {
  taxa.addEventListener("click", () => {
    botao1.textContent = taxa.textContent;
  });
});

periodo.forEach((periodo) => {
  periodo.addEventListener("click", () => {
    botao2.textContent = periodo.textContent;
  });
});

//Calculo juros compostos
//Selecionado o formulário e a div que trará o resultado
const form = document.querySelector("form");
const divResult = document.querySelector("#result");
const resultAporte = document.querySelector(".result-aporte");
const resultJuros = document.querySelector(".result-juros");
const resultTotal = document.querySelector(".result-total");

//Adicionando o event listener para cálculo
form.addEventListener("submit", function (e) {
  e.preventDefault();

  //selecionando as variáveis para os calculos
  const principal = parseFloat(document.getElementById("principal").value);
  const contribution =
    parseFloat(document.getElementById("contribution").value) || 0;

  const interestInput = document.getElementById("interest");
  const interest = parseFloat(interestInput.value.replace(",", ".")) / 100;

  const years = parseFloat(document.getElementById("years").value);

  //calculos com verificações
  if (botao1.textContent === "Anual" && botao2.textContent === "Anos") {
    const total =
      principal * Math.pow(1 + interest / 12, years * 12) +
      contribution *
        ((Math.pow(1 + interest / 12, years * 12) - 1) / (interest / 12));
    const formattedTotal = total.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    const totalAportado = principal + contribution * (years * 12);
    const totalJuros = total - totalAportado;

    const formattedTotalAportado = totalAportado.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    const formattedTotalJuros = totalJuros.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    if (!divResult.classList.contains("ativo")) {
      divResult.classList.add("ativo");
    }
    resultAporte.innerHTML = formattedTotalAportado;
    resultJuros.innerHTML = formattedTotalJuros;
    resultTotal.innerHTML = formattedTotal;
  } else if (botao1.textContent === "Anual" && botao2.textContent === "Meses") {
    const total =
      principal * Math.pow(1 + interest / 12, years) +
      contribution *
        ((Math.pow(1 + interest / 12, years) - 1) / (interest / 12));
    const formattedTotal = total.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    const totalAportado = principal + contribution * years;
    const totalJuros = total - totalAportado;

    const formattedTotalAportado = totalAportado.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    const formattedTotalJuros = totalJuros.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    if (!divResult.classList.contains("ativo")) {
      divResult.classList.add("ativo");
    }
    resultAporte.innerHTML = formattedTotalAportado;
    resultJuros.innerHTML = formattedTotalJuros;
    resultTotal.innerHTML = formattedTotal;
  } else if (botao1.textContent === "Mensal" && botao2.textContent === "Anos") {
    const total =
      principal * Math.pow(1 + interest, years * 12) +
      contribution * ((Math.pow(1 + interest, years * 12) - 1) / interest);
    const formattedTotal = total.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    const totalAportado = principal + contribution * (years * 12);
    const totalJuros = total - totalAportado;

    const formattedTotalAportado = totalAportado.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    const formattedTotalJuros = totalJuros.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    if (!divResult.classList.contains("ativo")) {
      divResult.classList.add("ativo");
    }
    resultAporte.innerHTML = formattedTotalAportado;
    resultJuros.innerHTML = formattedTotalJuros;
    resultTotal.innerHTML = formattedTotal;
  } else if (
    botao1.textContent === "Mensal" &&
    botao2.textContent === "Meses"
  ) {
    const total =
      principal * Math.pow(1 + interest, years) +
      contribution * ((Math.pow(1 + interest, years) - 1) / interest);
    const formattedTotal = total.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    const totalAportado = principal + contribution * years;
    const totalJuros = total - totalAportado;

    const formattedTotalAportado = totalAportado.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    const formattedTotalJuros = totalJuros.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    if (!divResult.classList.contains("ativo")) {
      divResult.classList.add("ativo");
    }
    resultAporte.innerHTML = formattedTotalAportado;
    resultJuros.innerHTML = formattedTotalJuros;
    resultTotal.innerHTML = formattedTotal;
  }
});

//Limpeza dos campos através do botão 'limpar'
const limpar = document.getElementById("limpar");

limpar.addEventListener("click", function () {
  const inputs = form.querySelectorAll("input");

  inputs.forEach(function (input) {
    input.value = "";
  });
  divResult.classList.remove("ativo");
});
