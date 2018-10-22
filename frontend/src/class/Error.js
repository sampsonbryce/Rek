export default class Error {
    constructor(error) {
        this.error = error;
        console.log(error);
    }

    isNetworkError() {
        // FIX
        return this.error;
    }

    isGqlError() {
        return this.error;
    }
}
