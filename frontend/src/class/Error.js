export default class ApiError {
    constructor(error) {
        this.error = error;
        console.log('ApiError:', error);
        console.log(JSON.stringify(error));
    }

    isNetworkError() {
        const { error } = this;

        return (
            'networkError' in error &&
            error.networkError != null &&
            'response' in error.networkError
        );
    }

    isGqlError() {
        const { error } = this;
        return (
            'graphQLErrors' in error &&
            error.graphQLErrors != null &&
            error.graphQLErrors.length > 0
        );
    }

    developerMessage() {
        return this.error.message.trim();
    }

    userMessage() {
        if (this.isNetworkError()) {
            return 'Malformed request. Please report this error to the developers';
        }

        if (this.isGqlError()) {
            // if we send back a developer thrown error, return that message
            const error = this.error.graphQLErrors[0];

            // developer handled gql errors have a name
            if ('name' in error && error.message) {
                if ('data' in error && 'message' in error.data) {
                    return error.data.message;
                }
                return error.message;
            }

            // otherwise something went wrong on the server end. throw generic error
            return 'Something went wrong with our servers :(. Please try again later';
        }

        // to check if its a network error we need to check the stupid long message for a specific message
        // cause apollo returns a garbage error for no network connection
        if (this.developerMessage() === 'Network error: Network request failed') {
            // can't connect to server
            return "We're having trouble connecting to TheRek";
        }

        // generic message for whacky shit
        return 'Something went wrong. Please contact support or try again later';
    }

    errorType() {
        return this.isGqlError() ? this.error.graphQLErrors[0].name : null;
    }
}
