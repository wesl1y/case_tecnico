const dataBase1 = "./broken_database_1.json";
const dataBase2 = "./broken_database_2.json";
const btnDownload = document.querySelector('#download');


function replaceChars(str){
  return str
    .replace('æ', 'a')
    .replace('ø', 'o');
}

function ajustingData(data)
{
  return data.map(item => {
    if(item.marca){
      item.marca = replaceChars(item.marca);
    }
    if(item.nome){
      item.nome = replaceChars(item.nome);
    }
    if(typeof item.vendas === "string"){
      item.vendas = parseInt(item.vendas);
    }

    return item
  });
}


function saveFile(){
  const a = document.createElement('a');
  a.style = 'display: none';
  document.body.appendChild(a);
  
  return function(data, fileName){
    const blob = new Blob([JSON.stringify(data)], {type: 'application/json'});
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();

    URL.revokeObjectURL(url);
  }
}


function readJson(path, fileName)
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

      btnDownload.addEventListener('click', function(){
        saveFile()(correctData, fileName);
      });
    });
}


Promise.all([
  readJson(dataBase1, "correct_database_1.json"),
  readJson(dataBase2, "correct_database_2.json"),
])
  .then(() => {
    console.log('Json files fixed');
  });