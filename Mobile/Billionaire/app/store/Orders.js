Ext.define('Billionaire.store.Orders', {
    extend: 'Ext.data.Store',
    model: 'Billionaire.model.Tickets',
    proxy: {
        type: "ajax",
        url: "http://192.168.0.102:3030/lsorders",
        reader: {
            type: "json",
            rootProperty: "data"
        }
    },
    autoLoad: true
});