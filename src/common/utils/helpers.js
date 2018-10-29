export function exist(obj, path) {
    const arrayOfPath = path.split('.');
    console.log(arrayOfPath, ' thi sis it');
    let result = obj;
    for (let i = 0; i < arrayOfPath.length; i++) {
        if (result) {
            result = result[arrayOfPath[i]];
        }
    }
    return result;
}

