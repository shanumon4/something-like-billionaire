Ext.define('Billionaire.view.Login', {
    extend: 'Ext.form.Panel',
    xtype: 'loginView',
    fullscreen: true,
    requires: ['Ext.form.FieldSet','Billionaire.util.Config'],
    config: {
        styleHtmlContent: true,
        layout: { type: 'auto' },
        url: Billionaire.util.Config.getBaseUrl() + '/login',

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
                },
                {
                    xtype: 'hiddenfield',
                    name: 'Device_Name',
                    value: Ext.device.Device.name
                }, {
                    xtype: 'hiddenfield',
                    name: 'Device_Platform',
                    value: Ext.device.Device.platform
                }, {
                    xtype: 'hiddenfield',
                    name: 'Device_UUID',
                    value: Ext.device.Device.uuid
                }
            ]
        }, {
            xtype: 'button',
            action:'loginBtn',
            text: 'Submit'
        }]
    }
});