Ext.define('Billionaire.store.Orders', {
    extend: 'Ext.data.Store',
    model: 'Billionaire.model.Tickets',
    proxy: {
        type: "ajax",
        url: "/lsorders",
        reader: {
            type: "json",
            rootProperty: "data"
        }
    },
    autoLoad: true
});