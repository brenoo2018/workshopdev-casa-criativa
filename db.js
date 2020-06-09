const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database('./ws.db')

db.serialize(function () {
  //criar tabela

  /*
  db.run(`
    CREATE TABLE IF NOT EXISTS ideas( 
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image TEXT,
      title TEXT,
      category TEXT,
      description TEXT,
      link TEXT
    );
  `)
  */
  //inserir dados

  /*
  const query = `
  INSERT INTO ideas(
  image,
  title,
  category,
  description,
  link
  ) VALUES (?, ?, ?, ?, ?);`

  const values = [
    "https://image.flaticon.com/icons/svg/2729/2729027.svg",
    "Meditação",
    "Mentalidade",
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita nisi voluptates omnis in, tempora praesentium quia ullam alias non! Perferendis numquam alias ab beatae asperiores nesciunt sit sint, cumque fuga.",
    "https://google.com"
  ]

  */

   //db.run(query, values, (err) => err ? console.log(err) : console.log(this))

  //consultar dados
  
  /*
  db.all(`SELECT * FROM ideas`, (err, rows) => {
    if (err) return console.log(err);

    console.log(rows)
  })
  */

  //deletar dados
  /*
  db.run(
    `DELETE FROM ideas where id = ?`, 
    [1], 
    (err) => err ? console.log(err) : console.log('deletei', this)
  )
  */
})

module.exports = db;