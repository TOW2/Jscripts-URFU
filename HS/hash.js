//создаем объект со строкой и нужной хеш информацией
function superString(string, hash){
    this.string = string
    this.hash = hash
}

//вводим строку в объект
let s = new superString();
s.string = prompt("Введите строку. ");
console.log("Ваша строка:    "+ s.string)
//считаем сумму хешей для каждого элемента (префиксная сумма хешей)
s.hash = new Array();
s.hash.length = s.string.length + 1;
s.hash[0]=0;
for (let i=1; i<s.hash.length; i++){
    s.hash[i] = (s.hash[i-1] + s.string.charCodeAt(i-1)) % 383;
}

//объявляем и вводим подстроку
let a = new superString();
a.string = prompt("Введите подстроку, которую хотите найти. ");
console.log("Ваша подстрока: "+ a.string)
a.hash = 0;

//считаем сумму хешей подстроки
for (let i = 0; i< a.string.length ; i++){
    a.hash =(a.hash + a.string.charCodeAt(i)) % 383;
}

//сравниваем префиксную сумму строки длинной m (длина подстроки) с хеш суммой подстроки
let bigflag = 0;                       //основной "флаг" смотрит нашли ли мы вообще подстроку
const del = a.string.length;
for (let i = 0; i < s.hash.length - del; i++){
    if (s.hash[i+del] - s.hash[i] == a.hash){
        let flag = 1;                  //локальный флаг проверяющий 2 одинаковые суммы хешей (префиксная сумма хешей строки и сумма хешей подстроки)
        for (let j=i; j< i+del; j++){
            if (s.string[j]!=a.string[j-i]){
                flag = 0;
                break;
            }
        }
        if (flag == 1){
            bigflag = 1;
            console.log("Искомая подстрока начинается с " + (i+1) + " места.");
        }
    }
}

if (bigflag == 0) console.log ("Данная подстрока в этой строке не содержится.")
