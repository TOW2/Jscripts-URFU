console.log('Если хотите найти n-ое число Фибоначчи, то введите 1')
console.log('Если хотите найти НОК 2х чисел, то введите 2')

const readline = require('readline-sync');
const aboba = readline.question('');

if (aboba == 1){
//чтение файла
let fs = require('fs');

let mem = new Array();

inText = fs.readFileSync('./fib.slm')
inText = inText.toString();
//console.log(inText);
}
else {
    //чтение файла
let fs = require('fs');

let mem = new Array();

inText = fs.readFileSync('./nok.slm')
inText = inText.toString();
}
mem = inText.split(/ |\r\n/);
//console.log(mem);
mem.push('exit')
////////////////////////////////////

//сетка переменных
function perem(letter, adr){
    this.letter = letter
    this.adr = adr
}

let dict = new Array();

function dictIncrease(letter, adr){
    let n = new perem(letter, adr)
    dict.push(n)
}

function adrSearch(letter){
    for (let i in dict)
    if (dict[i].letter == letter)
        return dict[i].adr
}
////////////////////////////////////
function memAdrSearch(ip,letter){
    for (let i=ip; i < mem.length;i++)
    if (mem[i] == letter)
        return i
}
////////////////////////////////////
let error = 0;
let ip = 0;
let flag = 0;
while (mem[ip] !== 'exit'){
    switch (mem[ip] ) {
        case 'new':
            dictIncrease(mem[ip+1], mem.length)
            mem.push(0);
            ip+=2
            break

        case  'cin':
            console.log('Введите '+ mem[ip+1]+ '  ')
            const readline = require('readline-sync');
            const znachenie = readline.question('');

            mem[adrSearch(mem[ip+1])] = znachenie*1;
            ip+=2
            break

        case 'set':
            mem [adrSearch(mem [ip+1]) ] = mem [ip+2]*1
            ip+=3
            break

        case 'setto':
            mem [adrSearch(mem [ip+1])*1 ] = mem[adrSearch(mem [ip+2])*1]
            ip+=3
            break

        case 'cout':
            console.log(mem [adrSearch(mem [ip+1]) ])
            ip+=2
            break

        case 'add':
            mem [adrSearch(mem [ip+1]) ] = mem [adrSearch(mem [ip+2]) ] + mem [adrSearch(mem [ip+3]) ]
            ip+=4
            break

        case 'addnu':
            mem [adrSearch(mem [ip+1]) ] = mem [adrSearch(mem [ip+2]) ] + mem [ip+3]*1 
            ip+=4
            break

        case 'minus':
            mem [adrSearch(mem [ip+1]) ] = mem [adrSearch(mem [ip+2]) ] - mem [adrSearch(mem [ip+3]) ]
            ip+=4
            break

        case 'mul':
            mem [adrSearch(mem [ip+1]) ] = mem [adrSearch(mem [ip+2]) ] * mem [adrSearch(mem [ip+3]) ]
            ip+=4
            break

        case 'del':
            mem [adrSearch(mem [ip+1]) ] = (mem [adrSearch(mem [ip+2]) ]*1) / (mem [adrSearch(mem [ip+3] )]*1)
            ip+=4
            break

        case 'ost':
            mem [adrSearch(mem [ip+1]) ] = mem [adrSearch(mem [ip+2]) ] % mem [adrSearch(mem [ip+3] )]
            ip+=4
            break

        case 'deln':
            mem [adrSearch(mem [ip+1]) ] = Math.floor((mem [adrSearch(mem [ip+2]) ]*1) / (mem [adrSearch(mem [ip+3] )]*1))
            ip+=4
            break

        case 'ifnot':
            if (mem[adrSearch(mem[ip+1])]*1!=mem[adrSearch(mem[ip+2])]*1)
                ip+=4;
            else ip=memAdrSearch(ip+4, mem[ip+3])+1
            break
            
        case 'ifnotnu':
            if (mem[adrSearch(mem[ip+1])]*1 != mem[ip+2]*1)
                ip+=4;
            else ip=memAdrSearch(ip+4, mem[ip+3])+1
            break

        case 'if':
            if (mem[adrSearch(mem[ip+1])]*1==mem[adrSearch(mem[ip+2])]*1)
                ip+=4;
            else ip=memAdrSearch(ip+4, mem[ip+3])+1
            break

        case 'ifnu':
            if (mem[adrSearch(mem[ip+1])]*1==mem[ip+2]*1)
                ip+=4;
            else ip=memAdrSearch(ip+4, mem[ip+3])+1
            break

        case 'while':
            dictIncrease(mem[ip], mem.length)
            mem.push(ip+1);
            ip+=1
            break
        case 'move':
            ip = mem[adrSearch(mem[ip+1])]*1;
            break

    }

        error++
        if (error>100000){
            flag = 1
            break
        }
}
if (flag == 0)
    console.log( 'Программа завершена успешно')
else console.log('Compilation error')