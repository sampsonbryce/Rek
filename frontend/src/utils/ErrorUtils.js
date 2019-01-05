const ErrorUtils = {
    /**
     * Wrapper around console.assert that also has the option to notify developers and
     * to throw an error
     *
     * Note argument is an object
     *
     * @param boolean       condition   | from console.assert
     * @param string        message     | from console.assert
     * @param boolean       notify      | from console.assertwhether or not to notify developers
     * @param boolean       throw_error | from console.whether or not to throw an Error
     *
     * @return boolean | result of 'condition'
     */
    assert({ condition, message, notify = true, throw_error = true }) {
        // do actual assert
        console.assert(condition, message);

        // only do error stuff if assert failed
        if (!condition) {
            if (notify) {
                // send email or some shit
                ErrorUtils.notify(message);
            }

            // throw an error to stop execution if we want to do so
            if (throw_error) {
                throw Error(message);
            }
        }

        return condition;
    },

    notify(message) {
        console.error(message);
        console.trace();
        // Send an email or some shit + stacktrace
    },
};

export default ErrorUtils;
