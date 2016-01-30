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
            action:'searchBar',
            layout: 'hbox',
            items: [{
                xtype: 'searchfield',
                name: 'searchValue',
                id: 'ordersReportSearchField',
                flex: 2
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

    },
    initComponent: function () {
        if (Billionaire.util.UserId.isSuperAdmin == true) {
            var searchBar = this.down('container[action=searchBar]');
            searchBar.add({
                xtype: 'selectfield',
                name: 'searchByName',
                id: 'ordersReportSearchByNameField',
                label: 'User',
                store: 'Users',
                displayField: 'Username',
                valueField:'_id'
                //visible: ,
                //options: [
                //    { text: 'First Option', value: 'first' },
                //    { text: 'Second Option', value: 'second' },
                //    { text: 'Third Option', value: 'third' }
                //]
            });
        }
        this.callParent(arguments);
    }
});