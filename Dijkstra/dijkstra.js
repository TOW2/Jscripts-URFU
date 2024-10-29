let s = prompt("Введите арифметическое выражение без пробелов.")
//console.log(input)   //позволяет осуществить ввод в строку вместе с пробелами
let bober = new Array(); //массив с обратной польской записью 
let stack = Array();    //стек

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function errors (skob, poryad, strogskob){  //объект ошибок
    this.skob = skob;           //будет являться флагом скобок. ")" - некорректная скобка
    this.poryad = poryad;       //флаг порядка отвечает за порядок оператора и числа. "*/" - некорректно
    this.strogskob = strogskob; //специальный флаг для скобок, после вхождения '(' ожидается только число. Иначе "()" будет корректно
}
function mainError(type,line,i,big){  //еслы вылетит ошибка, то этот объект будет хранить в себе все данные об ошибке
    this.type = type;
    this.line = line;
    this.i = i;                        //номер символа на котором программа сломалась
    this.big = big;                    //флаг, указывающий на то, есть ли вообще ошибка или нет
}
function outputError(n){        //показывает место, где программа ломается
    let errorString = "";
    for (let i=0;i<n ; i++){
        errorString += " ";
    }
    errorString+="^";
    console.log(errorString);
}
let tableOfErrors = {}
tableOfErrors["oper"] = "Программа ожидала оператора." //5 + 5 5
tableOfErrors["int"] = "Программа ожидала число." //5 + + 
tableOfErrors["skob"] = "Программа не нашла '('.\nПроверьте правильность написания скобок." //5+3)
tableOfErrors["rskob"] = "Программа не нашла ')'.\nПроверьте правильность написания скобок." //((2+5)-3
tableOfErrors["point"] = "Некорректный ввод числа с плавающей точкой."
tableOfErrors["unknown"] = "Неизвестный символ."
let ERROR = new mainError("sus", 0, 0, false);
let err = new errors(0, false, false);  //2 вспомогательных флага на проверку ошибок
let otricat1 = false;            //специальный флаг для проверки введенного отриц. числа (-a). проверяет наличие числа после "-"
let otricat2 = false;            //проверяет наличие скобки после числа. (-a)
let powflag = 0;                 //как возводить в степень

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function arifmet (a,b,w){
    let answ;
    a*=1;
    b*=1;
    switch (w){
        case 45:
            return b-a;
        case 43:
            return b+a;
        case 42:
            return b*a;
        case 47:
            return b/a;
        case 94: 
            return Math.pow(b,a);
        default:
                return -1;
    }
}

//возвращает число длиной больше 1
function search(a, s){             
    let i = a;
    let res = "";
    let vsp = s.charCodeAt(i);
    let pointflag = false;
    let fstint = true;
    while ((vsp >= 48 && vsp <= 57) || vsp == 46){ //46 == '.'
        if (vsp >= 48 && vsp <= 57 && pointflag == false){
            fstint = false;
        }
        else if (pointflag == true && fstint == true){   //.123
            return "i"+i;
        }
        if (vsp == 46){              
            if (pointflag == false)  //0.1.2
                pointflag = true;
            else return "i"+i;
        }
        res += s[i];
        i++;
        vsp = s.charCodeAt(i)
    }
    return res;
}

//таблица приоритетов
let prior = {}                     
prior["("] = 0;
prior["-"] = 1;
prior["+"] = 1;
prior["*"] = 2;
prior["/"] = 2;
prior["^"] = 3;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

for (let i = 0; i < s.length; i++){
    let vsp = s.charCodeAt(i);
    if (vsp == 32) continue;  // " " == 32
    if (otricat1 == true){
        if (vsp >= 48 && vsp <= 57){
            let str = search(i,s);
            if (str.charCodeAt(0) == 105){ //105 == 'i'
                ERROR = { type: "point", line: 107, i: str[str.length-1], big: true };
                break;
            }
            bober.push("-" + str);
            i += bober[bober.length - 1].length - 2;
            otricat1 = false;
            otricat2 = true;
            continue;
        }
        else {   //5+(-*2)
            ERROR = { type: "int", line: 117, i: i, big: true };
            break;
        }
    }
    else if (otricat2 == true){
        if (vsp != 41){
            ERROR = { type: "rscob", line: 123, i: i, big: true };
            break;
        }
        else {
            err.skob--;
            stack.length--;
            otricat2 = false;
            err.strogskob = false;
            err.poryad = true;
            continue;
        }
    }
    else if (vsp >= 48 && vsp <= 57){
        if (err.poryad == false){
            let str = search(i,s);
            if (str.charCodeAt(0) == 105){ //105 == 'i'
                ERROR = { type: "point", line: 139, i: str[str.length-1], big: true };
                break;
            }
            bober.push(str);
            i += bober[bober.length - 1].length - 1;
            err.poryad = true;
            err.strogskob = false;
            continue;
        }
        else {   //1+2 3-4
            ERROR = { type: "oper", line: 149, i: i, big: true };
            break;
        }
    }
    else if (err.strogskob == true && vsp != 40){ //5*(+9)
        if (vsp == 45){
          otricat1 = true;
          continue;
        }
        else {
            ERROR = { type: "int", line: 159, i: i, big: true };
            break;
        }
    }
    else if (vsp == 45 || vsp == 43) { // 45 == '-', 43 == '+'
        if (err.poryad == true){
            err.poryad = false;
            if (stack.length > 0){
                while (prior[stack[stack.length - 1]] > 1 && stack.length > 0){
                    bober.push(stack[stack.length - 1]);
                    stack.length--;
                }
                if (stack.length == 0 || prior[stack[stack.length - 1]] == 0){
                    stack.push(s[i]);
                    continue;
                }
                else if (prior[stack[stack.length - 1]] == 1){
                    bober.push(stack[stack.length - 1]);
                    stack.length--;
                    stack.push(s[i]);
                    continue;
                }
                else {
                    console.log("Непредвиденная ошибка.");
                    break;
                }
            }
            else {
                stack.push(s[i]);
                continue;
            }
        }
        else {  //5*-3
            ERROR = { type: "int", line: 192, i: i, big: true };
            break;
        }
    }
    else if (vsp == 42 || vsp == 47 ){ //47 == '/', 42 == '*'
        if (err.poryad == true){
            err.poryad = false;
            if (stack.length > 0){
                while (prior[stack[stack.length - 1]] > 2 && stack.length > 0){
                    bober.push(stack[stack.length - 1]);
                    stack.length--;
                }
                if (stack.length == 0 || prior[stack[stack.length - 1]] == 0 || prior[stack[stack.length - 1]] == 1){
                    stack.push(s[i]);
                    continue;
                }
                else if (prior[stack[stack.length - 1]] == 2){
                    bober.push(stack[stack.length - 1]);
                    stack.length--;
                    stack.push(s[i]);
                    continue;
                }
                else {
                    console.log("Непредвиденная ошибка.");
                    break;
                }
            }
            else {
                stack.push(s[i]);
                continue;
            }
        }
        else {  //5+*3
            ERROR = { type: "int", line: 225, i: i, big: true };
            break;
        }
    } if (vsp == 94){ // 94  '^'
        if (err.poryad == true){
            err.poryad = false;
            if (powflag == 0){
                powflag = prompt("Введите('1' или '2') как вы хотите реализовать возведение в степень?\n1)a^b^c = a^(b^c)\n2)a^b^c = (a^b)^c ")
                while (powflag != 1 && powflag != 2){
                    console.log("Передано неверное значение в переменную.\nДопустимые значения: 1 , 2")
                    powflag = prompt("Введите('1' или '2') как вы хотите реализовать возведение в степень?\n1)a^b^c = a^(b^c)\n2)a^b^c = (a^b)^c ")
                }
            }
            if (powflag == 2){
                if (stack.length > 0){
                    while (prior[stack[stack.length - 1]] > 3 && stack.length > 0){
                        bober.push(stack[stack.length - 1]);
                        stack.length--;
                    }
                    if (stack.length == 0 || prior[stack[stack.length - 1]] == 0 || prior[stack[stack.length - 1]] == 1 || prior[stack[stack.length - 1]] == 2){
                        stack.push(s[i]);
                        continue;
                    }
                    else if (prior[stack[stack.length - 1]] == 3){
                        bober.push(stack[stack.length - 1]);
                        stack.length--;
                        stack.push(s[i]);
                        continue;
                    }
                    else {
                        console.log("Непредвиденная ошибка.");
                        break;
                    }
                }
                else {
                    stack.push(s[i]);
                    continue;
                }
            }
            else {
                stack.push('^');
                continue;
            }
        }
        else {   //5*^2
            ERROR = { type: "int", line: 270, i: i, big: true };
            break;
        }
    }
    else if (vsp == 40){//40  '('
        if (err.poryad == false){
            err.skob++;
            err.strogskob = true;
            stack.push('('); 
            continue;
        }
        else {   //5(2-3)
            ERROR = { type: "oper", line: 282, i: i, big: true };
            break;
        }
    }
    else if (vsp == 41){ //')' = 41
        if (--err.skob >= 0){
            while (stack[stack.length - 1] != '('){
                bober.push(stack[stack.length-1]);
                stack.length--;
            }
            stack.length--;
            continue;
        }
        else {  //2-5)10+3
            ERROR = { type: "skob", line: 296, i: i, big: true };
            break;
        }
    }
    else if (vsp == 46){
        ERROR = { type: "point", line: 301, i: i, big: true };
        break;
    } 
    else {
        ERROR = { type: "unknown", line: 305, i: i, big: true };
        break;
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////
if (err.poryad == false && ERROR.big == false){
    ERROR = { type: "int", line: 310, i: s.length-1, big: true };
}
else if ((err.skob > 0 || err.skob < 0) && ERROR.big == false){
    ERROR = { type: "rskob", line: 313, i: s.length-1, big: true };
}
if (ERROR.big == true){
    console.log(s);
    outputError(ERROR.i);
    console.log(tableOfErrors[ERROR.type]);
    console.log("DevMode: "+ERROR.line);
}
else {
    while (stack.length != 0){
        bober.push(stack[stack.length - 1]);
        stack.length--;
    }
    for (let i = 0;i < bober.length; i++){
        if (bober[i].length == 1){
            let vsp = bober[i].charCodeAt(0);
            if (vsp == 45 || vsp == 43 || vsp == 42 || vsp == 47 || vsp == 94){
                let a = stack[stack.length-1];
                stack.length--;
                let b= stack[stack.length - 1];
                stack.length--;
                stack.push(arifmet(a,b,vsp));
            }
            else stack.push(bober[i]);
        }
        else stack.push(bober[i]);
    }
    console.log(s);
    console.log("Ответ: " + stack)
}