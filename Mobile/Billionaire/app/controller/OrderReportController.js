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
            'ordersReport searchfield[name=searchValue]': {
                keyup: 'onSearchOrder'
            },
            'ordersReport selectfield[name=searchByName]': {
                change: 'onSearchOrder'
            },
            'ordersReport datepickerfield[name=contestDate]': {
                change: 'onSearchOrder'
            },
            'ordersReport': {
                initialize: 'onRenderOrderReport'
            },
            'ordersReport button[action=exportOrder]': {
                tap: 'onExportOrderReport'
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
    
    onSearchOrder: function (loadExplicit) {
        var orderlist = Ext.getCmp('ordersReportList').getStore();
        orderlist.getProxy().setExtraParams({
            'simpleValue': this.getOrderSearchField().getValue(),
            'ByUsernameValue' : (Billionaire.util.UserId.isSuperAdmin) ? this.getOrderSearchUser().getValue()? this.getOrderSearchUser().getValue():'':'',
            'ByContestDate': this.getOrderSearchDate().getValue() ? this.getOrderSearchDate().getValue().toISOString() : ''
        });
        if (loadExplicit)
            orderlist.load();
    },
    
    onExportOrderReport: function (btn) {
        this.onSearchOrder(false);
        var exportExp = this.getOrdersReportList().getStore(),
            extraParams = exportExp.getProxy();
        
        extraParams.setExtraParam('isExport', true);
        if (Ext.device.FileSystem)
            this.downloadFile(Billionaire.util.Config.getBaseUrl() + '/lsorders?' + Ext.urlEncode(extraParams.getExtraParams()));
        else
           // window.location = Billionaire.util.Config.getBaseUrl() + '/lsorders?' + Ext.urlEncode(extraParams.getExtraParams());

       // window.location = ;
        
        Ext.Ajax.request({
            url: Billionaire.util.Config.getBaseUrl() + '/lsorders',
            method: 'GET',
            params: exportExp.getProxy().getExtraParams(),
            scope: this,
            callback: function (options, success, response) {
                if (success) {
                        window.location = Billionaire.util.Config.getBaseUrl() + '/lsorders?' + Ext.urlEncode(extraParams.getExtraParams());
                }
                else { 
                    Ext.Msg.alert('Export failed');
                }
            }
        });
    },
    downloadFile: function (url) {
        var me = this;
        var fileName = 'Billionaire_Rpr_' + Ext.Date.format(new Date(), 'dmy_h_m_ms'); // Edit this file name
        var remoteDocUrl = url;
        // Edit this file url
        if (Ext.device.FileSystem) {
            this.getLocalFileEntry(fileName, function (fileEntry) {
                if (!Ext.isEmpty(fileEntry.download) && Ext.isFunction(fileEntry.download)) {
                    fileEntry.download({
                        source: remoteDocUrl,
                        trustAllHosts: true,
                        options: {},
                        success: function (fe) {
                            Ext.Msg.alert(fileName , 'File downloaded successfully.');
                        },
                        failure: function (error) {
                            Ext.Msg.alert('Download fail');
                        }
                    });
                } else {
                    console.log('download API not available!!');
                }
            }, function (error) { });
        }
       
    },
    getLocalFileEntry: function (fileName, successCbk, failureCbk) {
        Ext.device.FileSystem.requestFileSystem({
            type: window.PERSISTENT,
            size: 0,
            success: function (fileSystem) {
                var newFilePath = fileSystem.fs.root.fullPath + '/' + fileName;
                var fileEntry = new Ext.device.filesystem.FileEntry(newFilePath, fileSystem);
                successCbk(fileEntry);
            },
            failure: function (error) {
                console.log('Failed to get the filesystem: ' + error);
                failureCbk(error);
                Ext.Msg.alert('getLocalFileEntry fail' + error);
            }
        });
    }
});