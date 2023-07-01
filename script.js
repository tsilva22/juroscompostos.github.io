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

function formatarValor(input) {
  // Remove todos os caracteres não numéricos do valor digitado
  let valor = input.value.replace(/|\$/g, "").replace(/\D/g, "");

  // Formata o valor adicionando os separadores de milhar e a vírgula decimal
  valor = (valor / 100).toLocaleString("pt-BR", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Atualiza o valor no campo de input
  input.value = valor;
}

function formatarTx(input) {
  // Remove todos os caracteres não numéricos do valor digitado
  let valor = input.value.replace(/\D/g, "");

  // Formata o valor adicionando os separadores de milhar e a vírgula decimal
  valor = valor.replace(/(\d)(?=(\d{2})+(?!\d))/g, "$1,");
  valor = valor.replace(/\./g, ",");

  // Atualiza o valor no campo de input
  input.value = valor;
}

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

  // Variáveis para armazenar os dados do gráfico
  const totalAportadoData = [];
  const totalJurosData = [];
  const totalData = [];
  const totalContribuitionData = [];

  //selecionando as variáveis para os calculos
  // Seleciona o campo de input
  const principalInput = document.getElementById("principal").value;
  const principal = parseFloat(principalInput.replace(".", ""));

  const contributionInput = document.getElementById("contribution").value || 0;
  const contribution = parseFloat(contributionInput.replace(".", ""));

  const interestInput = document.getElementById("interest");
  let interest = parseFloat(interestInput.value.replace(",", ".")) / 100;
  let years = parseFloat(document.getElementById("years").value);

  if (
    botao1.textContent === "Selic Anual" ||
    botao1.textContent === "CDI Anual"
  ) {
    interest /= 12;
  }
  if (botao2.textContent === "Anos") {
    years *= 12;
  }

  //calculos
  let totalAcumulado = principal; // Valor inicial é o valor principal
  let totalContribuition = principal; //Valor inicial é o aporte mensal do primeiro mês
  let totalJurosMensal = 0;
  for (let i = 0; i < years; i++) {
    // Calculando o juros para o mês atual
    const jurosMensal = totalAcumulado * interest;
    totalJurosMensal += jurosMensal;

    //Atualizando os valores aportados
    totalContribuition += contribution;

    // Atualizando os valores acumulados
    totalAcumulado += contribution + jurosMensal;

    // Adicionando os valores aos arrays de dados
    totalAportadoData.push(contribution);
    totalJurosData.push(totalJurosMensal);
    totalData.push(totalAcumulado);
    totalContribuitionData.push(totalContribuition);
  }

  const total = totalData[totalData.length - 1];
  const formattedTotal = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  const totalAportado =
    principal +
    totalAportadoData.reduce(
      (acumulador, elemento) => acumulador + elemento,
      0
    );
  const totalJuros = totalJurosData[totalJurosData.length - 1];

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

  // Obtendo a referência para o elemento canvas
  const canvas = document.getElementById("graphics");

  // Criando o contexto do gráfico
  const ctx = canvas.getContext("2d");

  // Configurando os dados do gráfico
  const labels = [];
  for (let i = 1; i <= years; i++) {
    labels.push(`Mês ${i}`);
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Aportes Mensais",
        data: totalContribuitionData,
        backgroundColor: "rgba(0,0,139, 0.5)", // Cor de preenchimento das barras
        borderColor: "rgba(0,0,139, 1)", // Cor da borda das barras
        borderWidth: 1, // Espessura da borda das barras
      },
      {
        label: "Juros",
        data: totalJurosData,
        backgroundColor: "rgba(0,128,0, 0.5)", // Cor de preenchimento das barras
        borderColor: "rgba(0,128,0, 1)", // Cor da borda das barras
        borderWidth: 1, // Espessura da borda das barras
      },
    ],
  };

  // Configurando as opções do gráfico
  const options = {
    responsive: true, // Tornar o gráfico responsivo ao tamanho do contêiner
    scales: {
      x: {
        stacked: true, // Barras empilhadas horizontalmente
        grid: {
          display: false, // Remover linhas de grade vertical
        },
      },
      y: {
        stacked: true, // Barras empilhadas verticalmente
        grid: {
          display: false,
        },
      },
    },
  };

  // Criando o gráfico de barras
  const barChart = new Chart(ctx, {
    type: "bar",
    data: data,
    options: options,
  });

  // Obtendo uma referência para o elemento da tabela onde você deseja inserir os dados
  const tabela = document.getElementById("table");
  tabela.style.borderSpacing = "0 10px";

  // Criando o cabeçalho da tabela
  const cabecalho = tabela.createTHead();
  const formatoMoeda = {
    style: "currency",
    currency: "BRL",
  };
  const cabecalhoRow = cabecalho.insertRow();
  cabecalhoRow.innerHTML =
    '<th style="padding: 0 20px;">Mês</th><th style="padding: 0 20px;">Total Investido</th><th style="padding: 0 20px;">Total de Juros</th><th style="padding: 0 20px;">Total Acumulado</th>';

  // Criando as linhas da tabela com os dados
  const corpo = tabela.createTBody();
  for (let i = 0; i < years; i++) {
    const linha = corpo.insertRow();
    const celulaMes = linha.insertCell();
    celulaMes.style.textAlign = "center";
    celulaMes.style.verticalAlign = "middle";
    celulaMes.innerHTML = i + 1;

    const celulaTotalInvestido = linha.insertCell();
    celulaTotalInvestido.style.textAlign = "center";
    celulaTotalInvestido.style.verticalAlign = "middle";
    celulaTotalInvestido.innerHTML = totalContribuitionData[i].toLocaleString(
      "pt-BR",
      formatoMoeda
    );

    const celulaTotalJuros = linha.insertCell();
    celulaTotalJuros.style.textAlign = "center";
    celulaTotalJuros.style.verticalAlign = "middle";
    celulaTotalJuros.innerHTML = totalJurosData[i].toLocaleString(
      "pt-BR",
      formatoMoeda
    );

    const celulaTotalAcumulado = linha.insertCell();
    celulaTotalAcumulado.style.textAlign = "center";
    celulaTotalAcumulado.style.verticalAlign = "middle";
    celulaTotalAcumulado.innerHTML = totalData[i].toLocaleString(
      "pt-BR",
      formatoMoeda
    );

    // Adicionar classe para estilização das células
    celulaMes.classList.add("grade-cell");
    celulaTotalInvestido.classList.add("grade-cell");
    celulaTotalJuros.classList.add("grade-cell");
    celulaTotalAcumulado.classList.add("grade-cell");
    celulaTotalInvestido.classList.add("background-aporte");
    celulaTotalJuros.classList.add("background-juros");
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
