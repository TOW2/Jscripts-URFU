//кодировка из 10-ной системы во float
//все вспомогательные функции
function pow(a,b){   //возведение в степень
    if (b == 0) return 1;
    if (b == 1) return a;
    if (b%2==0) return pow(a,b/2)*pow(a,b/2);
    if (b%2==1) return a*pow(a,b-1);
}
function positionOfPoint(a){  //вычисляет позицию точки
    let i=0;
    for (let j=i;j<a.length;j++){
        if (a[j]=='.')
        return j;
    }
    return a.length;
}
function sign(a){//определяет знак
    return a[0]=='-';
}
function integer(a){//отделяет целую часть от числа
    let i;
    let answ="";
    let n=positionOfPoint(a);
    if (sign(a))
        i=1;
    else i=0;
    while(i!=n){
        answ+=a[i++];
    }
    return answ*1;
}
function fraction(a){//отделяет дробную часть от числа
    let i;
    let answ = "0.";
    let n=positionOfPoint(a);
    for (i=n+1; i<a.length; i++)
        answ+=a[i];
    return answ*1;
}

function tenToTwoInt(a){//переводит целую часть в двоичный код
    let answ = '';
    let n = 0;
    while (pow(2,n)<=a)
        n++;
    n-=1;
    while(n!=-1){
        if (pow(2,n)<=a){
            a-=pow(2,n);
            answ += '1';
        }
        else answ += '0';
        n--;
    }
    if (answ.length==0) return '0'
    else return answ;
}
function tenToTwoFrac(a){//переводит дробную часть в двоичный код
    let answ = '';
    let n = 1;
    while (a!=0){
        if (pow(0.5,n)<=a){
            a-=pow(0.5,n);
            answ+='1';
        }
        else answ+='0';
        n++;
    }
    return answ;
}
function findMove(){//вычисляет смещение
    let intCode = tenToTwoInt(integer(a));
    let fracCode = tenToTwoFrac(fraction(a));
    for (let i = 0;i<intCode.length;i++){
        if (intCode[i] == '1'){
             return (intCode.length-1-i)*1;
        }
    }
    for (let i = 0;i<fracCode.length;i++){
        if (fracCode[i]=='1'){ 
            return (i+1)*(-1);
        }
    }
    return 0;
}
function findMantis(n){//строит мантису
    n-=127;
    let intCode = tenToTwoInt(integer(a));
    let fracCode = tenToTwoFrac(fraction(a));
    let answ = '';
    count=0
    if (n>=0){
        for (let i=intCode.length-n;i<intCode.length;i++){
            if (count==23) return answ;
            count++;
            answ+=(intCode[i]+'');
        }
        for (let i=0;i<fracCode.length;i++){
            if (count==23) return answ;
            count++;
            answ+=(fracCode[i]+'');
        }
        while(answ.length!=23)
        answ+='0';
        return answ;
    }
    else {
        for (let i=0-n;i<fracCode.length;i++){
            if (count==23) return answ;
            count++;
            answ+=fracCode[i]+'';
        }
    }
    while(answ.length!=23)
        answ+='0';
    return answ;
}
//функции закончились, дальше их применение

let a = prompt("Введите число.")
console.log("Ваше число:  " + a);
function float(sign,move,mantis){
    this.sign=sign;
    this.move=move;
    this.mantis=mantis;
}
let result = new float();
if (a == '0' || a == '+0'){
    result.sign = "0";
    result.mantis="00000000";
    result.move  = "00000000000000000000000";
}
else if (a == '-0'){
    result.sign = "1";
    result.mantis="00000000";
    result.move  = "00000000000000000000000";
}
else {
    if (sign(a)) result.sign=1;
    else result.sign=0;
    result.move = findMove()*1 + 127;
    result.mantis=findMantis(result.move);
    result.move  = tenToTwoInt(result.move);
    if (result.move.length<8){
        let b = '';
        for (let i=0;i<8-result.move.length;i++){
            b+='0';
        }
        result.move = b + result.move
    }
}
console.log("float: " + result.sign + result.move + result.mantis);
console.log("Вариант с табуляцией:");
console.log("float: " + result.sign + " " + result.move + " " + result.mantis);
a=result.sign + result.move + result.mantis;

//декодировка из float в десятичный
//вспомогательные функции
function twoToTenInt(a){//переводит целую части из 2 в 10
    let answ = 0;
    for (let i=a.length-1;i>=0;i--){
        if (a[i]=='1'){
            answ+=pow(2,a.length-1-i);
        }
    }
    return answ;
}
function twoToTenFrac(a){//переводит дробную часть из 2 в 10
    let answ = 0;
    for (let i=0;i<a.length;i++){
        if (a[i]=='1'){
            answ+=pow(0.5,i+1);
        }
    }
    return answ;
}
function mintissaToNumber(a){//находит число по мантиссе и смещению без знака
    let answ='';
    let int='';
    let frac = '';
    if (a>=0){
        if (a<=23){
        for (let i=0;i<=a;i++)
            int+=str.mantis[i];
        for (let i=a+1;i<23;i++){
            frac+=str.mantis[i];
        }
        }
        else {
            str.move++; //это тут нужно, так как мы в мантиссу вставляем 1 в самое начало, а подрузамевается, что . стоит после этой 1 (стр 224)
            for (let i=0;i<str.mantis.length;i++){
                int+=str.mantis[i];
                str.move--;
            }
            while(str.move!=0){
                str.move--;
                int+='0';
            }
            answ=twoToTenInt(int);
        }
    }
    else {
        while(a++<-1)
        frac+='0';
        for (let i in str.mantis)
        frac+=str.mantis[i];
    }
    answ = twoToTenInt(int) + twoToTenFrac(frac) +'';
    return answ;
}
function correctInput(a){
    for (let i=0;i<a.length;i++){
        if (a[i]!='0' && a[i]!='1')
        return false;
    }
    return true;
}
//дальше дешифровка с помощью функций

let w = prompt("Введите 1, если хотите ввести свой input для перевода его в десятичную систему.")
if (w == '1'){
    do{
    a = prompt("Введите число типа float. (4 байта, без пробелов, можно использовать только 0 и 1)")
    }while(a.length!=32 || correctInput(a) == false);
    console.log("Ваше число, закодированное в типе float: " + a);
}

let str = new float();
str.sign = a[0];
str.move='';
str.mantis='1';
for (let i=1;i<=8;i++){
    str.move+=a[i];
}
for (let i=9;i<=31;i++){
    str.mantis+=a[i];
}
str.move=twoToTenInt(str.move)-127;
let answer = '';
if (str.sign == '1') answer = '-';
answer += mintissaToNumber(str.move);
console.log("Первоначальное число было: " + answer);