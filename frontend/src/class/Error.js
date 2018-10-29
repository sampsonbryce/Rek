export default class ApiError {
    constructor(error) {
        this.error = error;
        console.log('ApiError:', error);
        console.log(JSON.stringify(error));
    }

    isNetworkError() {
        return this.error.networkError !== null && 'response' in this.error.networkError;
    }

    isGqlError() {
        return this.error.graphQLErrors.length > 0;
    }

    developerMessage() {
        return this.error.message;
    }

    userMessage() {
        if (this.isNetworkError()) {
            return 'Malformed request. Please report this error to the developers';
        }

        if (this.isGqlError()) {
            // if we send back a developer thrown error, return that message
            const error = this.error.graphQLErrors[0];
            if (error.message) {
                if (error.data !== null && 'message' in error.data) {
                    return error.data.message;
                }
                return error.message;
            }

            // otherwise something went wrong. throw generic error
            return 'Something went wrong on our end. Please try again later';
        }

        // can't connect to server
        return "We're having trouble connecting to TheRek";
    }

    errorType() {
        return this.isGqlError() ? this.error.graphQLErrors[0].name : null;
    }
}
