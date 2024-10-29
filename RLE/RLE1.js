function RLEin(a) {                                       
  let coded = '';                                       
  let count = 1;                                        
  for (let i = 0; i < a.length; i++) {                  
    if (a[i] === a[i + 1]) {                            
      let j = i;                                        
      count = 1;                                        
      while (a[j] === a[j + 1] && count < 255) {        
        count++;                                       
        j++;
      }
      if (count <= 3) {                                 
        for (let iter = i; iter <= j; iter++) {
          coded = coded + a[iter];
        }
        i = j;
      } else {
        let symbol = String.fromCharCode(count);      
        coded = coded + '#' + symbol + a[i];          
        i = j;
      }
    } else {
      coded = coded + a[i];                             
    }
  }
  return coded;
}

const fs = require('fs');
const filePath = './inText.txt';

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const str = data;
  let message = RLEin(str);
  console.log("Не сжатая строка: " + str);               
  console.log("Сжатая строка: " + message);                
});