Ext.define('Billionaire.controller.OrderReportController', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            'ordersReportList': 'ordersReport list',
            'orderSearchField': 'ordersReport searchfield[name=searchValue]',
            'orderSearchDate': 'ordersReport datepickerfield[name=contestDate]',
            'orderSearchUser': 'ordersReport selectfield[name=searchByName]'
        },
        control: {
            'mainForm tabbar': {
                activetabchange: 'onChangeTab'
            },
            'ordersReport searchfield[name=searchValue]':{
                keyup:'onSearchOrder'
            },
            'ordersReport selectfield[name=searchByName]': {
                change:'onSearchOrder'
            },
            'ordersReport datepickerfield[name=contestDate]': {
                change: 'onSearchOrder'
            },
            'ordersReport': {
                initialize: 'onRenderOrderReport'
            }
        }
    },

    onRenderOrderReport: function (e, w) {
        try {
            if (Billionaire.util.UserId.isSuperAdmin === true) {
                var searchBar = e.down('panel[action=searchBar]');
                var nameField = [{
                        xtype: 'button',
                        name: 'searchUser' , styleHtmlContent: true,
                        cls: 'orderReport_userLabel',
                        handler: function (btn) {
                            Ext.getCmp('ordersReportSearchByNameField').getTabletPicker().setWidth(300);
                            Ext.getCmp('ordersReportSearchByNameField').getTabletPicker().showBy(btn);
                        }
                    }, {
                        xtype: 'selectfield',
                        name: 'searchByName',
                        id: 'ordersReportSearchByNameField',
                        labelCls: 'orderReport_userLabel',
                        label: '-',
                        hidden: true,
                        labelWidth: 18,
                        width: 30,
                        store: 'Users',
                        displayField: 'Username',
                        valueField: '_id',
                        usePicker: false,
                        flex: 1,
                        styleHtmlContent: true, padding: 2
                    }];
                searchBar.add(nameField);
            }
        }
        catch (err) {
            Ext.Msg.alert('Error', err.message);
        }
    },

    onChangeTab: function (t, tab, newTab, d, e) {
        if (tab._title == "Reports") {
            try {
                Ext.getCmp('ordersReportSearchField').reset();
                var orderStore = Ext.getCmp('ordersReportList').getStore();
                orderStore.getProxy().setExtraParams({
                    UserId: Billionaire.util.UserId._id,
                    IsSuperAdmin: Billionaire.util.UserId.isSuperAdmin
                });
                orderStore.load();
            }
			catch (err) {
                Ext.Msg.alert('Error', err.message);
            }
        }
    },
    
    onSearchOrder: function () {
        var orderlist = Ext.getCmp('ordersReportList').getStore();
        orderlist.getProxy().setExtraParams({
            'simpleValue': this.getOrderSearchField().getValue(),
            'ByUsernameValue' : this.getOrderSearchUser().getValue(),
            'ByContestDate': this.getOrderSearchDate().getValue() ? this.getOrderSearchDate().getValue().toISOString() : ''
        });
        orderlist.load();
    }
});