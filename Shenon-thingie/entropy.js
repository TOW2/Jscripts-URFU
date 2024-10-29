function entropy(alph,n){
    let sum = 0;
    for (let i in alph){
        sum+=alph[i]*Math.log(alph[i]);
    }
    return sum/Math.log(n);
}
let s = prompt("Введите строку.")
console.log("Ваша строка: "+s)
let alph = {};
let n = s.length;
for (let i=0;i<n;i++){
    if (!alph[s.charAt(i)])
        alph[s.charAt(i)]=1;
    else alph[s.charAt(i)]++;
}
for (let i in alph){
    alph[i]=alph[i]/n;
    console.log(i+"  "+alph[i])
}
let result = (-1)*entropy(alph,n);
console.log("Энтропия Шеннона для данной строки равна: "+result);
