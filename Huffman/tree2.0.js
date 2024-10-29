function Node(freq, letter, used, code, lson, rson) {
    this.freq = freq; 
    this.letter = letter;
    this.used = used;
    this.code = code;
    this.lson = lson;
    this.rson = rson
}
  
function pair(freq, iter){
  this.freq = freq;
  this.iter = iter;
}
let result="";

let str= prompt()
  
let tree = new Array()
  
let alph = new Object();
  
for (i = 0; i < str.length; i++) {
  if (alph[str.charAt(i)])
  alph[str.charAt(i)] ++;
else 
  alph[str.charAt(i)] = 1
}
  
for (let i in alph){
  console.log(i, alph[i])
  let n = new Node(alph[i], i, 0, "0", -1, -1);
  tree.push(n) 
}
if (tree.length==1){
  for (let i = 0; i<str.length;i++){
    result+="0";
  }
}
else{
  let size = tree.length;
  let count = 0;                                                        //считает количество точек с отцами

  //создаем отцов для всех точек
  while (count < tree.length-1){                                        
    let a = new pair(str.length + 1, -1)                                //запоминает индекс элемента с минимальным freq
    let b = new pair(str.length + 1, -1)                                //запоминает индекс 2го по меньшинству freq элемента
      for (let i = 0; i < tree.length; i++) {                           //этот for ищет 2 элемента массива с самым минимальным freq у которых нет отцов
          if (tree[i].used == 0 && tree[i].freq <= a.freq){             
            b.freq = a.freq;
            b.iter = a.iter;
            a.freq = tree[i].freq;
            a.iter = i;
          }
          else if (tree[i].used == 0 && tree[i].freq < b.freq && tree[i].freq >= a.freq) {
            b.freq = tree[i].freq;
            b.iter = i;
          } 
      }
      count += 2;                                                       //для 2х элементов создали отца => количество элементов с отцами увеличивается на 2
      let n = new Node( tree[a.iter].freq + tree[b.iter].freq,  tree[a.iter].letter + tree[b.iter].letter,  0,  "1",  a.iter,  b.iter);
      tree.push(n)                                                      //создаем новый объект и добавляем его в массив
      tree[a.iter].used = 1;
      tree[b.iter].used = 1;
      tree[a.iter].code = "0";
      tree[b.iter].code = "1";                 
  }

  //корень имеет код 0
  tree[tree.length - 1].code = "";              
  //трясем дерево хехехе
  for (let i = tree.length - 1; i >= size; i--){                 
    if (tree[i].lson !=-1)
      tree[tree[i].lson].code = tree[i].code + tree[tree[i].lson].code;
    if (tree[i].rson !=-1)
      tree[tree[i].rson].code = tree[i].code + tree[tree[i].rson].code;
  }

  //кодировка сообщения
  for (let i=0; i<str.length; i++){                           
    for (let j=0;j<size;j++){
      if (tree[j].letter==str[i]){
        result+=tree[j].code;
        break;
      }
    }
  }
}

//вывод закодированного сообщения
console.log(result);                                          

//вывод сетки декодироки
for (let i in tree){                                          
  if (tree[i].letter.length == 1)
    console.log(tree[i].letter + "   " + tree[i].code)
  else break;
} 

//декодировка сообщения
let OriginalString = "";                                      //сюда потом запишется оригинальная строка)
let place = tree.length - 1;
for (let i=0;i < result.length;i++){                                    //спускаемся по дереву вниз
  if (result[i] == "1"){
    place = tree[place].rson;
    if (tree[place].rson==-1){
      OriginalString += tree[place].letter;
      place = tree.length - 1;
    }
  } 
  else {
    place = tree[place].lson;
    if (tree[place].lson==-1){
      OriginalString += tree[place].letter;
      place = tree.length - 1;
    }
  }
}
console.log(OriginalString);                                  //вывод оригинальной строки
 