Ext.define('Billionaire.controller.LoginController', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            'loginForm': 'loginView',
            'orderForm': 'orderForm'
        },
        control: {
            'loginView>button[action=loginBtn]': {
                tap: 'onLogin'
            },
            'loginView': {
                submit:'onLoginComplete'
            }
        }
    },
    
    onLogin: function (btn) {
        var form = this.getLoginForm(),
            values = form.getValues();

        if (values.username == "" || values.password == "")
            Ext.Msg.alert('Login', 'Please enter username & password.');
        else {
            form.setValue('Device_Name', Ext.device.Device.name);

            form.submit({
                useDefaultXhrHeader: false,
                cors: true
            });
        }
    },

    onLoginComplete: function (form, result, e, eOpts) {
        if (result['Status'] == 'success') {
            if (!this.getOrderForm()) {
                Ext.Viewport.add(Ext.create('Billionaire.view.Main'));
                Ext.Viewport.setActiveItem(1);
            }
        }
        else
            Ext.Msg.alert('Failed', result['Message'], Ext.emptyFn);
    }
});
