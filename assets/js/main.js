class converterMoeda {
  constructor() {
    this.form = document.querySelector("form");
    this.iniciar();
  }

  iniciar() {
    this.handleEvents();
  }

  handleEvents() {
    this.form.addEventListener("click", (e) => {
      let el = e.target;
      let tag = el.tagName.toLowerCase();

      if (tag == "button") {
        e.preventDefault();
        console.log("Btn clicado !");
        this.addToResult(this.handleEntries());

        const objConfig = {
          method: "GET",
          url: `https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL`,
        };

        this.request(objConfig).then((obj) => {
          let valorDolar = this.getDolarValue(obj);
          let convertido = this.handleEntries(valorDolar);
          this.addToResult(convertido);
        });
      }
    });
  }

  handleEntries(valorMoeda) {
    let qtdMoeda = this.form.querySelector(".qtdMoeda").value;
    let select = this.form.querySelector("select").value;

    if (select == "Real - Dólar") {
      return `R$ ${qtdMoeda} para US :  ${(qtdMoeda / valorMoeda).toFixed(2)}`;
    } else {
      return `US ${qtdMoeda} para R$ : ${(qtdMoeda * valorMoeda).toFixed(2)}`;
    }
  }

  addToResult(valor) {
    let resultado = document.querySelector(".resultado");
    resultado.innerHTML = valor;
  }

  request(obj) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open(obj.method, obj.url, true);
      xhr.send();

      xhr.addEventListener("load", (e) => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response);
        } else {
          reject(xhr.statusText);
        }
      });
    });
  }

  getDolarValue(obj) {
    let objConverted = JSON.parse(obj);
    return objConverted.USDBRL.high;
  }
}

const convert = new converterMoeda();
convert.iniciar();
