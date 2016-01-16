Ext.define('Billionaire.view.OrderForm', {
    extend: 'Ext.form.FormPanel',
    xtype: 'orderForm',
    id:'orderForm',
    requires: ['Ext.form.FieldSet',],
    config: {
        control: {
            'textfield': {
                keyup: 'calculateTotal'
            }
        },
        items: [{
            xtype: 'fieldset',
            styleHtmlContent: true,
            title: '4D Numbers',
            action:'4dfieldset',
            items: [
                /*{
                xtype: 'panel',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                defaults: { clearIcon: false },
                padding: 5,
                width: '100%',
                items: [{
                    xtype: 'textfield',
                    name: 'FourDNumber',
                    label: '4D',
                    action:'4dfield',
                    flex: 4,
                    maxLength: 14,
                    minLength: 4,
                    component: { type: 'tel' }
                },
              /*  {
                    xtype: 'textfield',
                    name: 'FourDNumber',
                    label: '-',
                    maxLength: 2,
                    flex: 2,
                    labelWidth:'15%',
                    minLength: 2
                }, {
                    xtype: 'textfield',
                    name: 'FourDNumber',
                    label: '-',
                    labelWidth: '15%',
                    flex:3,
                    maxLength: 3,
                    minLength: 1
                }, /
                {
                    xtype: 'button',
                    iconCls: 'add',
                    action:'add4dField'
                }]
            }, */
            {
                xtype: 'textfield',
                name: 'FourDNumber',
                label: '4D',
                action: '4dfield',
                maxLength: 14,
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
                minLength: 4,
                placeHolder: '#### - ### - ###',
                component: { type: 'tel' }
            }, {
                xtype: 'button',
                iconCls: 'add',
                action: 'add4dField',
                docked: 'bottom',
                width: '20%',
                margin:'10 0 0 0',
                style: { left: '80%' }
            }]
        }, {
            xtype: 'fieldset',
            styleHtmlContent: true,
            title: 'Company',
            layout: 'hbox',
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
                minLength: 4,
                component: { type: 'tel' }
            }]
        }, {
            xtype: 'container',
            docked: 'bottom',
            height: 25,
            width: '100%',
            style: {
                opacity: .5,
                'background-color': 'lightgray',
                'text-align':'center'
            },
            id:'totalDisplay',
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

        //for (var i = 0; i < fourDNumbers.length; i++) {
        //    var splittedValue = fourDNumbers[i].split('-');
        //    if (splittedValue.length > 1) {
        //        total += parseInt(splittedValue[1]) ? parseInt(splittedValue[1]) : 0;
        //        total += parseInt(splittedValue[2]) ? parseInt(splittedValue[2]) : 0;
        //    }
        //}
        Ext.getCmp('totalDisplay').setTotal(total.toFixed(2));

        f.removeCls('textfield_invalid');
        f.up('fieldset').setInstructions('');
    }
});