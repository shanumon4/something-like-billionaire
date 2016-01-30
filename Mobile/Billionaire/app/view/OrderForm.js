Ext.define('Billionaire.view.OrderForm', {
    extend: 'Ext.form.FormPanel',
    xtype: 'orderForm',
    id:'orderForm',
    requires: ['Ext.form.FieldSet'],
    config: {
        control: {
            'textfield': {
                keyup: 'calculateTotal'
            },
            'fieldset[action=companyselector] checkboxfield': {
                change: 'calculateTotal'
            }
        },
        items: [{
                xtype: 'fieldset',
                styleHtmlContent: true,
                title: '4D Numbers',
                action: '4dfieldset',
                items: [{
                        xtype: 'textfield',
                        name: 'FourDNumber',
                        label: '4D',
                        action: '4dfield',
                        maxLength: 14,
                        clearIcon: false,
                        minLength: 4,
                        placeHolder: '#### - ### - ###',
                        component: { type: 'tel' }
                    },
                    {
                        xtype: 'textfield',
                        name: 'FourDNumber',
                        label: '4D',
                        action: '4dfield',
                        maxLength: 14,
                        clearIcon: false,
                        minLength: 4,
                        placeHolder: '#### - ### - ###',
                        component: { type: 'tel' }
                    }, {
                        xtype: 'button',
                        iconCls: 'add',
                        action: 'add4dField',
                        docked: 'bottom',
                        width: '20%',
                        margin: '10 0 0 0',
                        style: { left: '80%' }
                    }]
            }, {
                xtype: 'fieldset',
                styleHtmlContent: true,
                title: 'Company',
                layout: 'hbox',
                action:'companyselector',
                //margin:'35 0 0 0',
                defaultType: 'checkboxfield',
                items: [{
                        name: 'M',
                        label: 'M',
                        flex: 1
                    }, {
                        name: 'K',
                        label: 'K',
                        flex: 1
                    }, {
                        name: 'T',
                        label: 'T',
                        flex: 1
                    }]
            }, {
                xtype: 'fieldset',
                styleHtmlContent: true,
                title: 'Phone Number',
                items: [{
                        xtype: 'textfield',
                        name: 'PhoneNumber',
                        clearIcon: false,
                        minLength: 4,
                        component: { type: 'tel' }
                    }]
            }, {
                xtype: 'fieldset',
                styleHtmlContent: true,
                title: 'Contest Date',
                items: [{
                        xtype: 'datepickerfield',
                        name: 'ContestDate',
                        picker: { yearFrom: 2014 },
                        value: new Date(),
                        picker: {
                            cancelButton: false,
                            hideOnMaskTap: true,
                            toolbar: {
                                ui: 'light',
                                title: 'Contest Date'
                            }
                        }
                    }]
            }, {
                xtype: 'container',
                docked: 'bottom',
                height: 25,
                width: '100%',
                style: {
                    opacity: .5,
                    'background-color': 'lightgray',
                    'text-align': 'center'
                },
                id: 'totalDisplay',
                html: 'Total Amount: 0.00',
                setTotal: function (value) {
                    Ext.getCmp('totalDisplay').setHtml('Total Amount: ' + value);
                }
            }]
    },
    
    calculateTotal: function (f) {
        var form = Ext.getCmp('orderForm').getValues(),
            fourDNumbers = form.FourDNumber,
            total = 0;
        Ext.each(fourDNumbers, function (value) {
            var splittedValue = value.split('-');
            if (splittedValue.length > 1) {
                total += parseInt(splittedValue[1]) ? parseInt(splittedValue[1]) : 0;
                total += parseInt(splittedValue[2]) ? parseInt(splittedValue[2]) : 0;
            }
        }, this);
        
        var cmpnyArray = [];
        if (form.M) cmpnyArray.push(1);
        if (form.K) cmpnyArray.push(2);
        if (form.T) cmpnyArray.push(3);
        
        total = total * cmpnyArray.length;

        Ext.getCmp('totalDisplay').setHtml('Total Amount: ' + total.toFixed(2));

        f.removeCls('textfield_invalid');
        f.up('fieldset').setInstructions('');
    }
});