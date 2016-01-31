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
            },
            'ordersReport selectfield[name=searchByName]': {
                change:'onSearchByUser'
            },
            'ordersReport': {
                initialize: 'onRenderOrderReport'
            }
        }
    },

    onRenderOrderReport: function (e, w) {
        try {
            if (Billionaire.util.UserId.isSuperAdmin === true) {
                var searchBar = e.down('container[action=searchBar]');
                searchBar.add({
                    xtype: 'selectfield',
                    name: 'searchByName',
                    id: 'ordersReportSearchByNameField',
                    labelCls: 'orderReport_userLabel',
                    label: '-',
                    labelWidth:28,
                    store: 'Users',
                    displayField: 'Username',
                    valueField: '_id',
                    usePicker: false,
                    flex: 1
                    //styleHtmlContent:true
                    //visible: ,
                    //options: [
                    //    { text: 'First Option', value: 'first' },
                    //    { text: 'Second Option', value: 'second' },
                    //    { text: 'Third Option', value: 'third' }
                    //]
                });
            }
        }
        catch (err) {
            Ext.Msg.alert('Error', err.message);
        }
    },

    onChangeTab: function (t, tab, newTab, d, e) {
        if (tab._title == "Reports") {
			try{
			    Ext.getCmp('ordersReportSearchField').reset();
			    var orderStore= Ext.getCmp('ordersReportList').getStore();
			    orderStore.getProxy().setExtraParams({
			        UserId: Billionaire.util.UserId._id,
			        IsSuperAdmin: Billionaire.util.UserId.isSuperAdmin
			    });
			    orderStore.load();
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
    },

    onSearchByUser: function (s, d, r, w) {
        var orderlist = Ext.getCmp('ordersReportList').getStore();
        orderlist.getProxy().setExtraParam('ByUsernameValue', s.getValue());
        orderlist.load();
    }
});