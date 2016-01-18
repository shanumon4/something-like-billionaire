Ext.define('Billionaire.view.Main', {
    extend: 'Ext.TabPanel',
    xtype: 'mainForm',
    requires: ['Ext.form.FieldSet', 'Billionaire.view.OrderForm', 'Billionaire.view.OrdersReport'],
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
            title: 'Reports',
            iconCls: 'action',
            layout: 'fit',
            items: [{
                docked: 'top',
                xtype: 'titlebar',
                title: 'Report'

            }, {
                xtype: 'ordersReport'
            }]
        }, {
            title: 'Result',
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