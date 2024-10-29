let s = prompt("Введите строку")
let a = prompt("Введите подстроку")
let answ = new Array();

//t=,abaxabaz>
let m = a.length
let alph = new Array()

//Определяем алфавит строки a
for(let i=0;i<m;i++)
    alph[a.charAt(i)]=0

//В двумерном массиве del храним таблицу переходов
let del = new Array(m+1)
for (let j=0 ; j<=m ; j++)
    del[j] = new Array()

//Инициализируем таблицу переходов
for(let i in alph){
    del [0][i] = 0
}

//Формируем таблицу переходов
for(let j = 0;j < m; j++){
    let prev = del[j][a.charAt(j)]
    del[j][a.charAt(j)] = j + 1
    for(let i in alph)
        del[j+1][i]  = del[prev][i]
}

/*//Выводим таблицу переходов
console.log(alph)
for(let j=0; j<=m; j++){
    let out=''
    for(let i in alph)
        out += del[j][i] + ' '
    console.log(j+ " " + out)
}*/

//ищем вхождения подстрок
let num = 0;
for (let i = 0; i<s.length;i++){
    if (del[num][s[i]] == undefined)
        num = 0;
    else {
    num = del[num][s[i]]
    }
    if (num == m) answ.push(i-m+1);
}
console.log(s);
console.log(a);
if (answ.length == 1)
console.log("Answer is " + answ);
else console.log("Answers are "+ answ);