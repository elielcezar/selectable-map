const vm = new Vue({
  el: "#app",
  data: {
    estados: "",
    estado: "",
    lojas: "",
    lojaID: "",
    loja: "",
    fetchUrl: "../api/lojas.json"
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
      this.loja = "";    
      
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
    makeSafeForCSS(name) {
      return name.replace(/[^a-z0-9]/g, function (s) {
        var c = s.charCodeAt(0);
        if (c == 32) return "-";
        if (c >= 65 && c <= 90) return s.toLowerCase();
        return c.toString(16).slice(-4);
      });
    },
    fetchLoja(lojaID) {
      fetch(this.fetchUrl)
        .then((r) => r.json())
        .then((r) => {
          const filtroLoja = r.find((item) => item.loja_id == `${lojaID}`);
          this.loja = filtroLoja;        
        });
    },
  },
  created() {
    this.fetchEstados();
  },
});
