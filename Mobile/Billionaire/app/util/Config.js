Ext.define('Billionaire.util.Config', {
    singleton: true,

    config: {
        // Decomment to use the remote server config
        baseUrl: 'http://10.227.240.213:3021'


        // Decomment to use the local server config
        // baseUrl: ''  
    },


    constructor: function (config) {
        this.initConfig(config);
        //this.callParent([config]);
    }
});