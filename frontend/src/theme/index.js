import t from 'tcomb-form-native';
import textbox from './templates/textbox';

let Theme = {
    // intializes the theme
    init: function(){
        Theme.initGlobalFormStyles();
        Theme.initGlobalFormTemplates();
    },
    // set global templates for tform
    initGlobalFormTemplates: function(){
        t.form.Form.templates.textbox = textbox;
    },
    // set global styles for tform
    initGlobalFormStyles: function(){
        styles = t.form.Form.stylesheet;
        styles.textbox.normal.borderRadius = 20;
    },
}

export default Theme;