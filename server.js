//express p/ criar e configurar servidor
const express = require("express");
const server = express();

const db = require("./db");

/*
const ideias = [
  {
    img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
    title: "Meditação",
    category: "Mentalidade",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita nisi voluptates omnis in, tempora praesentium quia ullam alias non! Perferendis numquam alias ab beatae asperiores nesciunt sit sint, cumque fuga.",
    url: "https://google.com"
  },
  {
    img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
    title: "Exercícios",
    category: "Saúde",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita nisi voluptates omnis in, tempora praesentium quia ullam alias non! Perferendis numquam alias ab beatae asperiores nesciunt sit sint, cumque fuga.",
    url: "https://google.com"
  },
  {
    img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
    title: "Cursos de programação",
    category: "Estudo",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita nisi voluptates omnis in, tempora praesentium quia ullam alias non! Perferendis numquam alias ab beatae asperiores nesciunt sit sint, cumque fuga.",
    url: "https://google.com"
  },
  {
    img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
    title: "Meditação",
    category: "Mentalidade",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita nisi voluptates omnis in, tempora praesentium quia ullam alias non! Perferendis numquam alias ab beatae asperiores nesciunt sit sint, cumque fuga.",
    url: "https://google.com"
  },
]
*/

//configura arquivos estáticos
server.use(express.static("public"));

//habilitar req.body
server.use(express.urlencoded({extended: true}));

//configuraão nunjucks
const nunjucks = require("nunjucks");
nunjucks.configure("views", {
  express: server,
  noCache: true,
})

//rotas
server.get('/', (req, res) => {

  db.all(`SELECT * FROM ideas`, (err, rows) => {
    if (err) {
      console.log(err);
      return res.send("Erro no banco de dados")
    }

    const reversedIdeias = [...rows].reverse();
    let lastIdeias = []
  
    for (let ideia of reversedIdeias) {
      if (lastIdeias.length < 2) {
        lastIdeias.push(ideia)
      }
    }
  
    return res.render("index.html", {ideias: lastIdeias})
  })


})

server.get('/ideias', (req, res) => {

  db.all(`SELECT * FROM ideas`, (err, rows) => {

    if (err) {
      console.log(err);
      return res.send("Erro no banco de dados")
    }

    const reversedIdeias = [...rows].reverse();

    return res.render("ideias.html", {ideias: reversedIdeias})

  })


})

server.post('/', (req, res) => {

  const query = `
  INSERT INTO ideas(
  image,
  title,
  category,
  description,
  link
  ) VALUES (?, ?, ?, ?, ?);`

  const {
    image,
    title,
    category,
    description,
    link
  } = req.body

  const values = [
    image,
    title,
    category,
    description,
    link
  ]

   db.run(query, values, (err) => {
    if (err) {
      console.log(err);
      return res.send("Erro no banco de dados")
    }

    return res.redirect("/ideias");
   })
})

server.listen(3000)