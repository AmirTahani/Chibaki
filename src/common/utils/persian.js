const latinToPersianMap = ['۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹', '۰'];
const latinNumbers = [/1/g, /2/g, /3/g, /4/g, /5/g, /6/g, /7/g, /8/g, /9/g, /0/g];
const persianToLatinMap = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const persianNumbers = [/۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g, /۰/g];

function prepareNumber(input) {
    let string;
    if (typeof input === 'number') {
        string = input.toString();
    } else if (typeof input === 'undefined') {
        string = '-';
    } else {
        string = input;
    }

    return string;
}

function latinToPersian(string) {
    let result = string;

    for (let index = 0; index < 10; index++) {
        result = result.replace(latinNumbers[index], latinToPersianMap[index]);
    }

    return result;
}

function persianToLatin(string) {
    let result = string;

    for (let index = 0; index < 10; index++) {
        result = result.replace(persianNumbers[index], persianToLatinMap[index]);
    }

    return result;
}

export function commaSeprator(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}


export function persianNumber(input) {
    return latinToPersian(prepareNumber(input));
}

export function latinNumber(input) {
    return persianToLatin(prepareNumber(input));
}

export const persianRegex = '^[\u0020\u2000-\u200F\u2028-\u202F\u0621-\u0628\u062A-\u063A\u0641-\u0642\u0644-\u0648\u064E-\u0651\u0655\u067E\u0686\u0698\u06A9\u06AF\u06BE\u06CC\u06F0-\u06F9\u060C\u061B\u061F\u0640\u066A\u066B\u066C\u0629\u0643\u0649-\u064B\u064D\u06D5]+$';

export const phoneNumberRegex = /^(09)\d{9}$/;
