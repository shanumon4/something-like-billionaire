Ext.define('Billionaire.view.Login', {
    extend: 'Ext.form.Panel',
    xtype: 'loginView',
    fullscreen: true,
    requires: ['Ext.form.FieldSet'],
    config: {
        styleHtmlContent: true,
        layout: { type: 'auto' },
        url: 'http://192.168.0.103:3030/login',

        items: [{
            docked: 'top',
            xtype: 'titlebar',
            title: 'Welcome to Billionaire'
        }, {
            xtype: 'fieldset',
            title: 'Log In',
            bodyPadding:5,
            instructions: 'Please login with your username and password.',
            items: [
                {
                    xtype: 'textfield',
                    name: 'username',
                    label: 'Username',
                    allowBlank: false
                },
                {
                    xtype: 'passwordfield',
                    name: 'password',
                    label: 'Password',
                    allowBlank: false
                }
            ]
        }, {
            xtype: 'button',
            action:'loginBtn',
            text: 'Submit'
        }]
    }
});