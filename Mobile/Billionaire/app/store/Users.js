Ext.define('Billionaire.store.Users', {
    extend: 'Ext.data.Store',
    config: {
        fields: ['_id', 'Username'],
        proxy: {
            type: "ajax",
            url: Billionaire.util.Config.getBaseUrl() + "/lsusers",
            reader: {
                type: "json",
                rootProperty: "data"
            }
        },
        autoLoad:true
    },
    listeners: {
        load: function (e,r,w,t) {
            e.insert(0, { _id: '', Username: 'All' });
        }
    }
});