Ext.define('Billionaire.model.Tickets', {
    extend: 'Ext.data.Model',
    id: 'Tickets',
    config: {
        idProperty: '_id',
        fields: [
            { name: '_id', type: 'int' },
            { name: 'FourDNumber', type: 'string' },
            { name: 'Company', type: 'auto' },
            { name: 'PhoneNumber', type: 'string' }, 
            { name: 'ContestDate', type: 'date' },
            { name: 'CreatedOn', type: 'date' }],        
        validations: [
            //{ type: 'presence', name: 'FourDNumber', message: "Please enter 4D Number" },
            { type: 'presence', name: 'PhoneNumber', message: "Please enter Phone Number" },
            { type: 'format', name: 'FourDNumber', matcher: /^[0-9]{4}(-|\+)?-[0-9]{1,3}(-|\+)?-[0-9]{1,3}$/, message: "Please enter correct format! eg:1234-1-4" },
            { type: 'presence', name: 'Company', message: "Please select atleast one company." }
        //{ type: 'format', name: 'email', matcher: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: "Wrong Email Format" },
        //{ type: 'password', name: 'password' }
        ]
    }
});