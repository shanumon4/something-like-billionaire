Ext.define('Billionaire.store.Orders', {
    extend: 'Ext.data.Store',
    model: 'Billionaire.model.Tickets',
    proxy: {
        type: "ajax",
        url: Billionaire.util.Config.getBaseUrl() + "/lsorders",
        reader: {
            type: "json",
            rootProperty: "data",
            idProperty:'_id'
        }
    },
    autoLoad: true
});