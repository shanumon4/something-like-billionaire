Ext.define('Billionaire.view.OrdersReport', {
    extend: "Ext.Container",
    xtype: 'ordersReport',
    requires: ['Ext.List', 'Ext.data.Store'],
    // layout:'fit',
    id: 'ordersReport',
    //store: 'Orders',
    config: {
        items: [{
                xtype: 'panel', docked: 'top',
                action: 'searchBar', styleHtmlContent: true,
                layout: 'hbox',
                padding:2,
                height:40,
                items: [{
                        xtype: 'searchfield',
                        name: 'searchValue', styleHtmlContent: true,
                        id: 'ordersReportSearchField', padding: 2,
                        flex: 1.5
                    }, {
                        xtype: 'datepickerfield',
                        name: 'contestDate', styleHtmlContent: true,
                        flex: 1, padding: 2, flex: 1, labelWidth: 28, label: '.',
                        labelCls: 'orderReport_dateLabel',
                        picker: {
                            yearFrom: 2014,
                            cancelButton: false,
                            hideOnMaskTap: true,
                            toolbar: {
                                ui: 'light',
                                title: 'Contest Date'
                            }
                        }
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