﻿Ext.define('Billionaire.view.OrdersReport', {
    extend: "Ext.Container",
    xtype: 'ordersReport',
    requires: ['Ext.List', 'Ext.data.Store'],
    // layout:'fit',
    id: 'ordersReport',
    //store: 'Orders',
    config: {
        items: [{
            xtype: 'searchfield',
            name: 'searchValue'
        }, {
            xtype: 'list',
            itemTpl: "<div>{FourDNumber}<span style='float:right;'>{PhoneNumber}</span></div>",
            emptyText: 'No records found!',
            height: '100%',
            width: '100%',
            store: 'Orders'
        }]

    }
});