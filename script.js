document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const vagaLista = document.getElementById("vagaLista");

  if (searchInput && vagaLista) {
    searchInput.addEventListener("keyup", () => {
      const termo = searchInput.value.toLowerCase();
      const vagas = vagaLista.getElementsByClassName("vaga");
      Array.from(vagas).forEach(vaga => {
        const texto = vaga.innerText.toLowerCase();
        vaga.style.display = texto.includes(termo) ? "block" : "none";
      });
    });
  }

  const adminForm = document.getElementById("adminForm");
  if (adminForm) {
    adminForm.addEventListener("submit", e => {
      e.preventDefault();
      const vaga = {
        empresa: document.getElementById("empresa").value,
        titulo: document.getElementById("titulo").value,
        local: document.getElementById("local").value,
        salario: document.getElementById("salario").value,
        descricao: document.getElementById("descricao").value,
      };
      let vagas = JSON.parse(localStorage.getItem("vagas")) || [];
      vagas.push(vaga);
      localStorage.setItem("vagas", JSON.stringify(vagas));
      alert("✅ Vaga cadastrada com sucesso!");
      adminForm.reset();
      carregarVagasAdmin();
    });
  }

  function carregarVagasAdmin() {
    const adminVagas = document.getElementById("adminVagas");
    if (adminVagas) {
      adminVagas.innerHTML = "";
      let vagas = JSON.parse(localStorage.getItem("vagas")) || [];
      vagas.forEach((vaga, index) => {
        const div = document.createElement("div");
        div.classList.add("vaga");
        div.innerHTML = `
          <h3>${vaga.titulo}</h3>
          <p><strong>Empresa:</strong> ${vaga.empresa}</p>
          <p><strong>Local:</strong> ${vaga.local}</p>
          <p><strong>Salário:</strong> ${vaga.salario}</p>
          <p>${vaga.descricao}</p>
          <button onclick="removerVaga(${index})">❌ Remover</button>
        `;
        adminVagas.appendChild(div);
      });
    }
  }
  carregarVagasAdmin();

  window.removerVaga = function (index) {
    let vagas = JSON.parse(localStorage.getItem("vagas")) || [];
    vagas.splice(index, 1);
    localStorage.setItem("vagas", JSON.stringify(vagas));
    carregarVagasAdmin();
  };

  if (vagaLista) {
    let vagas = JSON.parse(localStorage.getItem("vagas")) || [];
    vagas.forEach(vaga => {
      const div = document.createElement("div");
      div.classList.add("vaga");
      div.innerHTML = `
        <h3>${vaga.titulo}</h3>
        <p><strong>Empresa:</strong> ${vaga.empresa}</p>
        <p><strong>Local:</strong> ${vaga.local}</p>
        <p><strong>Salário:</strong> ${vaga.salario}</p>
        <p>${vaga.descricao}</p>
      `;
      vagaLista.appendChild(div);
    });
  }

  const contatoForm = document.getElementById("contatoForm");
  if (contatoForm) {
    contatoForm.addEventListener("submit", e => {
      e.preventDefault();
      alert("📩 Mensagem enviada com sucesso!");
      contatoForm.reset();
    });
  }

  const vagaForm = document.getElementById("vagaForm");
  if (vagaForm) {
    vagaForm.addEventListener("submit", e => {
      e.preventDefault();
      alert("✅ Vaga enviada para análise!");
      vagaForm.reset();
    });
  }
});