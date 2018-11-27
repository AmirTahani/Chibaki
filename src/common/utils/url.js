export default class URL {
    query = {};

    setParam(param, value, type) {
        if (type === 'array') {
            this.toggleArray(param, value);
        } else {
            this.query = {
                ...this.query,
                [param]: value
            };
        }
        return this;
    }

    toggleArray(param, value) {
        const array = this.query[param];
        if (array && array.length) {
            const foundItem = array.find(item => item === value);
            if (foundItem) {
                const newArray = array.filter(item => item !== value);
                this.query = {
                    ...this.query,
                    [param]: newArray
                };
            } else {
                this.query = {
                    ...this.query,
                    [param]: [...this.query[param], value]
                };
            }
        } else {
            this.setParam(param, [value]);
        }
    }

    getParam(param) {
        return this.query[param];
    }

    getQuery() {
        return this.query;
    }

    getQueryParam(param) {
        if (typeof param === 'object') {
            return `${param}=${this.query[param].join(',')}`;
        }
        return `${param}=${this.query[param]}`;
    }

    getQueryString() {
        return Object.keys(this.query).map(this.getQueryParam.bind(this)).join('&');
    }
}
