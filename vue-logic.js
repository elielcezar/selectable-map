export default {
  data: {
    estados: "",
    estado: "",
    lojas: "",
    lojaID: "",
    loja: "",
    listaEncontra: "",
    fetchUrl: "https://eliel.dev/api/assai/lojas.json"
  },
  methods: {
    fetchEstados() {
      fetch(this.fetchUrl)
        .then((r) => r.json())
        .then((r) => {
          const unique = [...new Set(r.map((item) => item.estado))];
          this.estados = unique;
        });
    },
    fetchLojasMapa(estado) {
      this.estado = estado;
      this.lojaID = "";
      fetch(this.fetchUrl)
        .then((r) => r.json())
        .then((r) => {
          /* atualiza o mapa */
          document.querySelectorAll("#svg-map a").forEach((item) => {
            item.classList.remove("selecionado");
          });
          document
            .querySelector('#svg-map a[aria-label="' + estado + '"]')
            .classList.toggle("selecionado");

          /* atualiza o select de lojas por estado */
          const filtroLoja = r.filter((item) => item.estado === estado);
          this.lojas = filtroLoja;
        });
    },
    fetchLoja(lojaID) {
      fetch(this.fetchUrl)
        .then((r) => r.json())
        .then((r) => {
          const filtroLoja = r.find((item) => item.loja_id === `${lojaID}`);
          this.loja = filtroLoja;
          this.listaEncontra = this.loja.field_voce_encontra.split(",");
          this.listaSustentaveis = this.loja.field_ico_sust.split(",");
        });
    }
  },
  created() {
    this.fetchEstados();
  }
};