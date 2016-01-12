Ext.define('Billionaire.view.Main', {
    extend: 'Ext.TabPanel',
    xtype: 'mainForm',
    requires: ['Ext.form.FieldSet', 'Billionaire.view.OrderForm'],
    config: {
        tabBarPosition: 'bottom',
        items: [{
            iconCls: 'home',
            layout: 'fit',
            title:'Order',
            items: [{
                docked: 'top',
                xtype: 'titlebar',
                title: 'Billionaire Order',
                items: [{
                    text:'Submit',
                    align: 'right',
                    ui: 'confirm',
                    action:'submitOrderForm'
                }]
            }, {
                xtype: 'orderForm'
            }]
        }, {
            title: 'Result',
            iconCls: 'action',
            items: [
                {
                    docked: 'top',
                    xtype: 'titlebar',
                    title: 'Billionaire Result'
                }
            ]
        }, {
            title: 'Reports',
            iconCls: 'user',
            items: [
                {
                    docked: 'top',
                    xtype: 'titlebar',
                    title: 'Billionaire Reports'
                }
            ]
        }]
    }
});