const fs = require('fs');



fs.readFile('./broken_database_1.json', (err, data) => {
  if (err) {
    console.error('Erro ao ler o arquivo:', err);
    return;
  }
  try {
    const jsonData = JSON.parse(data); // Converte string para objeto JSON
    console.log(jsonData);
  } catch (parseError) {
    console.error('Erro ao analisar o JSON:', parseError);
  }
});
