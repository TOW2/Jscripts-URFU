let s = prompt ("Введите зашифрованную строку.");
console.log("Закодированная строка: " + s);
let alph = {};
let ENfreq = {};
ENfreq[97] = 0.082;   //a
ENfreq[98] = 0.015;   //b
ENfreq[99] = 0.028;   //c
ENfreq[100] = 0.043;  //d
ENfreq[101] = 0.127;  //e
ENfreq[102] = 0.022;  //f
ENfreq[103] = 0.020;  //g
ENfreq[104] = 0.061;  //h
ENfreq[105] = 0.070;  //i
ENfreq[106] = 0.0015;  //j
ENfreq[107] = 0.0077; //k
ENfreq[108] = 0.04;   //l
ENfreq[109] = 0.024;  //m
ENfreq[110] = 0.067;  //n
ENfreq[111] = 0.075;  //o
ENfreq[112] = 0.019;  //p
ENfreq[113] = 0.00095;//q
ENfreq[114] = 0.06;   //r
ENfreq[115] = 0.063;  //s
ENfreq[116] = 0.091;  //t
ENfreq[117] = 0.028;  //u
ENfreq[118] = 0.0098; //v
ENfreq[119] = 0.024;  //w
ENfreq[120] = 0.0015; //x
ENfreq[121] = 0.02;   //y
ENfreq[122] = 0.00074;//z

function Node(key, freqDif){
    this.key = key;
    this.freqDif = freqDif;
}
let minimum = new Array();
minimum.length = 26;
for (let i = 0;i<26;i++) minimum[i] = new Node();

for (let i in ENfreq){
    alph[i] = 0;   
}
//////////////////////////////////////////////////////////////////
//       Находим частоту каждого символа в нашей строке         //
//////////////////////////////////////////////////////////////////
let count = 0;
for (let i of s){
    let vsp = i.charCodeAt(0);
    if (vsp >= 97 && vsp <= 122){
        alph[vsp]++;
        count++;
    }
}
for (let i in alph){
    alph[i] = alph[i]/count;
}
//////////////////////////////////////////////////////////////////
//                    Считаем разницу                           //
//////////////////////////////////////////////////////////////////
for (let p = 0; p < 26; p++){
    let summ = 0;
    for (let i in ENfreq){
        i*=1;
        p*=1;
        summ += (ENfreq[i] - alph[(((i+p - 97)%26)+97) +""]) * (ENfreq[i] - alph[(((i+p - 97)%26)+97) +""]);
    }
    minimum[p].freqDif = summ;
    minimum[p].key = p;
}
//////////////////////////////////////////////////////////////////
//                       Сортируем                              //
//////////////////////////////////////////////////////////////////
minimum.sort((a, b) => {
    return a.freqDif - b.freqDif;
  });
//////////////////////////////////////////////////////////////////
//                         Декод                                //
//////////////////////////////////////////////////////////////////
let statistic = prompt("Введите количество наиболее вероятных вариантов, которые вы хотите увидеть.")
console.log("Далее Вам будут представлены " + statistic + " наиболее вероятных корректных дешифровок:")
for (let c = 0; c < statistic; c++){
    let a = minimum[c].key;
    let answ = ""
    for (let i of s){
        let vsp = i.charCodeAt(0);
        if (vsp >= 97 && vsp <= 122){
            answ = answ + String.fromCharCode((((vsp - a - 97) + 26) % 26) + 97)
        }
        else if (vsp >= 65 && vsp <= 90){
            answ = answ + String.fromCharCode((((vsp - a - 65) + 26) % 26) + 65)
        }
        else answ += i;
    }
    console.log((c+1) + ")  " + answ);
    console.log ("Ключ данной шифровки: " + minimum[c].key)
}
