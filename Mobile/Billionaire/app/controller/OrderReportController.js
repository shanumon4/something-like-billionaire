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
			try{
            Ext.getCmp('ordersReportSearchField').reset();
            Ext.getCmp('ordersReportList').getStore().load();
			}
			catch(err){
			  Ext.Msg.alert('Error',err.message);
			}
        }
    },
    onOrderSearchKeyUp: function (f) {
        var orderlist = Ext.getCmp('ordersReportList').getStore();
        orderlist.getProxy().setExtraParam('simpleValue', f.getValue());
        orderlist.load();
    }
});