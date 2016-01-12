Ext.define('Billionaire.view.OrderForm', {
    extend: 'Ext.form.FormPanel',
    xtype: 'orderForm',
    requires: ['Ext.form.FieldSet'],
    config: {
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
            }]
        },{
            xtype: 'button',
            iconCls: 'add',
            action: 'add4dField',
            width: '20%'
        }, {
            xtype: 'fieldset',
            styleHtmlContent: true,
            title: 'Company',
            layout: 'hbox',
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
                this.innerHtmlElement.setText('Total Amount: ' + value);
            }
        }]
    }
});