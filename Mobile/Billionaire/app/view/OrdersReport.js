Ext.define('Billionaire.view.OrdersReport', {
    extend: "Ext.Container",
    xtype: 'ordersReport',
    requires: ['Ext.List', 'Ext.data.Store'],
    // layout:'fit',
    id: 'ordersReport',
    //store: 'Orders',
    config: {
        items: [{
                xtype: 'container', docked: 'top',
                action: 'searchBar',
                layout: 'hbox',
                items: [{
                        xtype: 'searchfield',
                        name: 'searchValue',
                        id: 'ordersReportSearchField',
                        flex: 2
                    }, {
                        xtype: 'datepickerfield',
                        name: 'contestDate',
                        flex:1,
                        label: 'C'
                    }]
            }, {
            xtype: 'list',
            itemTpl: "<div><b>4D :</b> {FourDNumber}</div><div><b>Ph No :</b>{PhoneNumber}</div>",
            emptyText: 'No records found!',
            id: 'ordersReportList',
            height: '100%',
            width: '100%',
            store: 'Orders',
            styleHtmlContent: true,
            grouped: true
        }]

    }
});