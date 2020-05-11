// Importamos a biblioteca crawler
const Crawler = require("crawler");

// Declaramos uma variável para armazenar o site do G1
const urlSite = "https://g1.globo.com/";

// Instanciamos o crawler
var webCrawler = new Crawler({
  maxConnections: 1,
});

function callBackG1(error, res, done){
  if (error) {
    console.log("Ocorreu um erro ao acessar o webSite: " + urlSite);
  } else {
    // Colocamos o jQuery na variável $
    var $ = res.$;

    // Armazenamos em os títulos em um Array<String> utilizando jQuery
    // Nesse caso, pegamos todas as tags HTML que utilizam
    // a classe "feed-post-link" e pegamos o texto delas
    const arrayTitulos = $('.feed-post-link').toArray().map(element => element.children[0].data);

    // Imprimimos na tela os títulos das notícias do G1
    arrayTitulos.forEach((titulo, index) => {
      console.log(`Título ${index + 1}: ${titulo}`);
    });

    // Finalizamos o crawler
    done();
  }
}

// Enfileiramos para o crawler acessar o site do G1
webCrawler.queue({
  // Em uri vamos colocar a Url do site
  uri: urlSite,
  // Se você for usar jQuery deixe como true
  // Nesse caso vamos utilizar :)
  jQuery: true,
  // Em callback vamos tratar a ação que o crawler vai tomar
  // Devemos declarar uma função que irá receber error, res e done
  // Error: Se ocorreu um erro essa variável irá vir com o valor do erro
  // res: A resposta que tivemos acessando o site
  // done: Função que chamamos ao terminar o processo
  callback: callBackG1,
});
