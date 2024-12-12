const dataBase1 = "./broken_database_1.json";
const dataBase2 = "./broken_database_2.json";

function ajustingData(data)
{
  return data.map(item => {
    if(item.marca)
    {
      item.marca = item.marca.replace(/æ/g, 'a').replace(/ø/g, 'o');
    }
    if(item.nome){
      item.nome = item.nome.replace(/æ/g, 'a').replace(/ø/g, 'o');
    }

    if(typeof item.vendas === "string")
    {
      item.vendas = parseInt(item.vendas);
    }

    return item
  });
}


function readJson(path)
{
  return fetch(path)
    .then(res => {
      if(!res){
        throw new Error("Json not accepted! Please try again");
      }
      return res.json()
    })

    .then(data => {
      
      const correctData = ajustingData(data);

      console.log(correctData);
    })
}




Promise.all([
  readJson(dataBase1),
  readJson(dataBase2),
])
  .then(() => {
    console.log('Json files fixed');
  });