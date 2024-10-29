//brut search
let s = prompt("Введите строку. ")
let a = prompt("Введите подстроку. ")

let arr = new Array();
for (let i=0;i<s.length;i++){
    if (s[i]==a[0]){
        let w = 1;
        for (let j=0;j<a.length;j++){
            if (a[j] != s[i+j]){
                w = 0;
                break;
            }
        }
        if (w == 1){
            arr.push(i);
        }
    }
}
console.log(arr);