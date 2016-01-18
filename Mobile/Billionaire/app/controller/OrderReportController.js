Ext.define('Billionaire.controller.OrderReportController', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            'ordersReportList': 'ordersReport list',
            'orderSearchField':'ordersReport searchfield[name=searchValue]'
        },
        control: {
            'mainForm tabbar': {
                activetabchange: 'onChangeTab'
            },
            'ordersReport searchfield[name=searchValue]':{
                keyup:'onOrderSearchKeyUp'
            }
        }
    },
    onChangeTab: function (t, tab, newTab, d, e) {
        if (tab._title == "Reports") {
            this.getOrderSearchField().reset();
            this.getOrdersReportList().getStore().load();
        }
    },
    onOrderSearchKeyUp: function (f) {
        var orderlist = this.getOrdersReportList().getStore();
        orderlist.getProxy().setExtraParam('simpleValue', f.getValue());
        orderlist.load();
    }
});