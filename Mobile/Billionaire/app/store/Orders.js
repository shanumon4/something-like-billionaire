Ext.define('Billionaire.store.Orders', {
    extend: 'Ext.data.Store',
    config: {
        model: 'Billionaire.model.Tickets',
        proxy: {
            type: "ajax",
            url: Billionaire.util.Config.getBaseUrl() + "/lsorders",
            reader: {
                type: "json",
                rootProperty: "data"
            }
        },
        grouper: {
            groupFn: function (record) {
                return record.get('CreatedOn').toDateString();
            }
        },
    }
});