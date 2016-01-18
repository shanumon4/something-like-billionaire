Ext.define('Billionaire.view.OrdersReport', {
    extend: "Ext.Container",
    xtype: 'ordersReport',
    requires: ['Ext.List', 'Ext.data.Store'],
    // layout:'fit',
    id: 'ordersReport',
    //store: 'Orders',
    config: {
        items: [{
            xtype: 'searchfield',
            name: 'searchValue',
			id:'ordersReportSearchField'
        }, {
            xtype: 'list',
            itemTpl: "<div>{FourDNumber}<span style='float:right;'>{PhoneNumber}</span></div>",
            emptyText: 'No records found!',
			id:'ordersReportList',
            height: '100%',
            width: '100%',
            store: 'Orders'
        }]

    }
});