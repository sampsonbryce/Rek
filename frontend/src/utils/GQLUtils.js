import _ from 'lodash';

const GQLUtils = {
    /*
     * Graphql returns your data with the __typename and 
     * Symbol keys with their respective values. This function 
     * removes those values and returns only the data
     * 
     * Params:
     *  data | object | the data which we want to remove the extra fields from
     * Return:
     *  object | the modified data object without the extra fields
     */
    getRawData(data) {
        const gql_object = _.cloneDeep(data);

        // For every key in object
        Object.keys(data).forEach(key => {
            // Symbol regex
            const regex = /^Symbol\(*\)/;

            // remove the __typname field
            if (key === '__typename') {
                delete gql_object[key];
            } else if (key.match(regex)) {
                delete gql_object[key];
            }
        });

        return gql_object;
    },
};

export default GQLUtils;
