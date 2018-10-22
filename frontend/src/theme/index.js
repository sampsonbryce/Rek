import t from 'tcomb-form-native';
import textbox from './templates/textbox';

const Theme = {
    // intializes the theme
    init() {
        Theme.initGlobalFormStyles();
        Theme.initGlobalFormTemplates();
    },
    // set global templates for tform
    initGlobalFormTemplates() {
        t.form.Form.templates.textbox = textbox;
    },
    // set global styles for tform
    initGlobalFormStyles() {
        const styles = t.form.Form.stylesheet;
        styles.textbox.normal.borderRadius = 20;
    },
};

export default Theme;
