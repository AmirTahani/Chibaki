export function exist(obj, path) {
    const arrayOfPath = path.split('.');
    let result = obj;
    for (let i = 0; i < arrayOfPath.length; i++) {
        if (result) {
            result = result[arrayOfPath[i]];
        }
    }
    return result;
}

export function commaSeprator(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
