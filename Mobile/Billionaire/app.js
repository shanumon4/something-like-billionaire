/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

Ext.application({
    name: 'Billionaire',

    requires: [
        'Ext.MessageBox', 'Billionaire.util.Config',
        'Ext.device.Device','Ext.field.Toggle'
    ],

    views: [
        'Main', 'Login', 'OrderForm', 'OrderConfirmationPopup','OrdersReport'
    ],
    controllers:['LoginController','OrderFormController','OrderReportController'],
    models: ['Tickets'],
    stores:['Orders','Users'],
    utils:['Config'],
    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function () {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        // Initialize the main view
        Ext.Ajax.request({
            url: Billionaire.util.Config.getBaseUrl() + '/getStatus',
            method: 'GET',
            callback: function (options, success, response) {
                var jsondata = JSON.parse(response.responseText);
                if (jsondata.success) {
                    Billionaire.util.UserId = JSON.parse(jsondata.data);
                    Ext.Viewport.add(Ext.create('Billionaire.view.Main'));
                }
                else
                    Ext.Viewport.add(Ext.create('Billionaire.view.Login'));
            }
        });
        Ext.Viewport.add({
            xtype: 'loadmask',
            id: 'ajaxMask',
            message: 'Loading...',
            indicator: true,
            hidden: true
        });

Ext.device.FileSystem.requestFileSystem({
 type: window.PERSISTENT,
 size: 0,
 success: function(fileSystem) {
 
 Ext.Msg.alert('File System',fileSystem.fs.root.fullPath);
 },
 failure: function(error) {
 
 Ext.Msg.alert('File System path', error);
 }
 });
		
        Ext.Ajax.on('beforerequest', function () { Ext.getCmp('ajaxMask').show(); }, this);
        Ext.Ajax.on('requestcomplete', function () { Ext.getCmp('ajaxMask').hide(); }, this);
        Ext.Ajax.on('requestexception', function () { Ext.getCmp('ajaxMask').hide(); }, this);
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
