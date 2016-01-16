Ext.define('Billionaire.view.OrderConfirmationPopup', {
    extend: 'Ext.Panel',
    xtype: 'orderConfirmationPopup',
    //id:'orderForm',
    requires: ['Ext.Container'],
    
    action: 'confirmationPopup',
    config: {
        confTitle: 0,
        bodyMsg:'',
        phoneNumber:'',
        floatingCls: 'orderconfirm_floatingCls',
        fullscreen: true,
        modal: true,
        layout: 'vbox',
        items: [{
            xtype: 'container',
            cls: "orderconfirm_title",
            action: 'orderconfirmtitle',
            html: 'Order Confirmed'
        }, {
            xtype: 'container',
            height: 35,
            padding: 10,
            style: { color: 'green'},
            action: 'orderconfirmsubtitle',
            html: 'Your order has been confirmed.'
        }, {
            xtype: 'textareafield',
            clearIcon: false,
            //centered: true,
            readOnly: true,
            height: 380,
            action: 'orderconfirmvalue',
            //value: '#' + vals.FourDNumber[0] + '\n' + '#' + vals.FourDNumber[1] + '\n\n' + 'C: ' + '\n\n' + 'T: 34' + '\n\n Ph:' + vals.PhoneNumber,
            //height: 40,
            padding: 10
        }, {
            xtype: 'container',
            docked: 'bottom',
            height: 50,
            layout: 'hbox',
            items: [{
                xtype: 'button',
                text: 'Send SMS',
                flex: 1,
                padding: 10,
                //icon: true,
                iconCls:'orderconfirm_SendSMS',
                margin: '0 4 4',
                ui:'confirm',
                handler: function (btn) {
                    window.location.href = "sms:" + btn.up('orderConfirmationPopup').config.phoneNumber + "?body=" + encodeURIComponent(btn.up('orderConfirmationPopup').config.bodyMsg);
                }
            }, {
                xtype: 'button',
                text: 'Close',
                flex: 1,
                handler: function (btn) {
                    btn.up('panel[action=confirmationPopup]').destroy();
                },
                padding: 10,
                margin: '0 4 4'
            }]
        }]
    },

    updatePopup: function (view) {
        view.down('container[action=orderconfirmtitle]').setHtml(view.getConfTitle()==1?'Order Confirmed':'Order Failed');
        view.down('container[action=orderconfirmsubtitle]').setHtml(view.getConfTitle() == 1 ? 'Success! Your order has been confirmed' : 'Failure! Your order has failed');
        view.down('container[action=orderconfirmsubtitle]').setStyle(view.getConfTitle() == 1 ? { color: 'green', 'font-size': 'medium' } : { color: 'red', 'font-size': 'medium' });
        view.down('textareafield[action=orderconfirmvalue]').setValue(view.getBodyMsg());
    }
});