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
                padding: 2,
                height: 40,
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
                    }, {
                        xtype: 'button',
                        styleHtmlContent: true,
                        action: 'exportOrder',
                        width:50,
                        cls: 'orderReport_downloadLabel'
                    }]
            }, {
                xtype: 'list',
                itemTpl: Ext.create('Ext.XTemplate',
                    '<div><span style="font-size:16pt; font-weight: bolder;">{FourDNumber}<span>',
                        '<tpl for=".">',
                            '<tpl if="IsIBox==true">',
                            '<div class="orderReport_iboxIndicator">i-box</div></tpl>',
                        '</tpl></div>',
                    '<div style="height:16px;"><div style="float:left;border: 1px solid #E0DCDC;padding-right: 3px;border-radius: 5px;">',
                            '<div class="orderReport_phone" style="float:left;"></div>',
                    '<span style="border-left: 1px solid gray;margin - left: 3px;padding-left: 4px;">{PhoneNumber}</span></div>',
                    '<div style="float:right" width="40px" height="20px" style="float: right;">',
                    '<div class="orderReport_info" style="float:left;"></div>',
                    '<div style="float:right; font-size:10pt; font-weight: bolder; margin-left:4px;"> {[this.returnTotal(values)]}</div>',
                    '</div>',
                    '</div>', {
                    returnTotal : function (v) {
                        return v['Company'].length * (parseInt(v.Sub1) + parseInt(v.Sub2));
                    }
                }),
                emptyText: 'No records found!',
                id: 'ordersReportList',
                height: '100%',
                width: '100%',
                store: 'Orders',
                styleHtmlContent: true,
                grouped: true,
                ptype: 'gridsummaryrow',
                summaryType: 'sum'
                //listeners: {
                //    refresh: function (list, s, e, w) { 
                //        if(
                //    }
                //}
            }]
    }
});