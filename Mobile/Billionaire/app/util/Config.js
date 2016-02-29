Ext.define('Billionaire.util.Config', {
    singleton: true,

    config: {
        // Decomment to use the remote server config
        baseUrl: 'http://192.168.0.102:3022'


        // Decomment to use the local server config
        // baseUrl: ''  
    },


    constructor: function (config) {
        this.initConfig(config);
        //this.callParent([config]);
    }
});