export function Capitalize(str: string){
    const words = str.split(' ');
    for(let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    const wCapitalize = words.join(' ');
    return wCapitalize;
}

export function FormatCPF(cpf: string){
    return `${cpf.substring(0,3)}.${cpf.substring(3,6)}.${cpf.substring(6,9)}-${cpf.substring(9,11)}`;
}

export function FormatRG(rg: string){
    return `${rg.substring(0,2)}.${rg.substring(2,5)}.${rg.substring(5,8)}-${rg.substring(8)}`;
}

export function FormatPhone(ddd: string, number: string){
    if(number.length == 8){
        return `(${ddd}) ${number.substring(0,4)}-${number.substring(4,8)}`;
    }
    else{
        return `(${ddd}) ${number.substring(0,5)}-${number.substring(5,9)}`;
    }
}