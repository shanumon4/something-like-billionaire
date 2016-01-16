Ext.define('Billionaire.controller.OrderFormController', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            'loginForm': 'loginView',
            'orderForm': 'orderForm'
        },
        control: {
            'orderForm textfield': {
               // keyup: 'onkeyup4d'
            },
            'button[action=add4dField]': {
                tap:'onAdd4DField'
            },
            'button[action=submitOrderForm]': {
                tap:'onSubmitOrderForm'
            }
        }
    },

    onkeyup4d: function (f, e, t, y) {
        
        //var val = f.getValue();
        //if (e.event.keyCode == 8) { //Backspace
        //    if (val.length == 11 || val.length == 7)
        //        f.setValue(val.slice(0, -3));
        //}
        //else if (val.length == 4 || val.length == 8)
        //    f.setValue(val + ' - ');
        //if (val.length == 5 || val.length == 9) {
        //    f.setValue(val.slice(0, -1) + ' - ' + val[val.length - 1]);
        //}
    },

    onAdd4DField: function () {
        var orderForm = Ext.getCmp('orderForm'),
            fs = orderForm.down('fieldset[action=4dfieldset]'),
            fourdfield = {
                xtype: 'textfield',
                name: 'FourDNumber',
                label: '4D',
                action: '4dfield',
                maxLength: 14,
                minLength: 4,
                component: { type: 'tel' }
            };
        var newField = fs.insert(fs.items.length - 2, fourdfield);
        newField.focus();
    },

    onSubmitOrderForm: function () {

        var vals = Ext.getCmp('orderForm').getValues();
        var isValidTickets = this.validateTickets(vals) ? true : false;
        if (isValidTickets == true) {
            var all4Darray = vals.FourDNumber.map(function (obj) {
                var newObj = {};
                var splittedNo = obj.split('-');
                newObj['FourDNumber'] = eval(Ext.String.trim(splittedNo[0]));
                newObj['Sub1'] = eval(Ext.String.trim(splittedNo[1]));
                newObj['Sub2'] = eval(Ext.String.trim(splittedNo[2]));

                return newObj;
            });
            var companyArray = this.getCompaniesFromValues(vals);

            var formValuesArr = all4Darray.map(function (items) {
                items['PhoneNumber'] = vals.PhoneNumber;
                items['Company'] = companyArray;

                return items;
            });

           
         Ext.Ajax.request({
             url: '/addTicket',
             method: 'POST',
             //disableCaching: false,
             //headers: {
             //    "Content-Type": "application/json"
             //},
             params: {
                 formData: JSON.stringify(formValuesArr)
             },
             scope: this,
             callback: function (options, success, response) {
                 if (success) {
                     try {
                         var conf = Ext.create('Billionaire.view.OrderConfirmationPopup', {
                             left: options.scope.getOrderForm().element.getX() + 5,
                             top: options.scope.getOrderForm().element.getY() + 5,
                             width: options.scope.getOrderForm().element.getWidth() - 10,
                             height: options.scope.getOrderForm().element.getHeight() - 10,
                             renderTo: Ext.getCmp('orderForm').id,
                             confTitle: 1,
                             phoneNumber: vals.PhoneNumber,
                             bodyMsg: '#' + vals.FourDNumber[0] + '\n' + '#' + vals.FourDNumber[1] + '\n\n' + 'C: ' + '\n\n' + 'T: 34' + '\n\n Ph:' + vals.PhoneNumber,
                         });
                         conf.updatePopup(conf);
                         conf.show();
                         options.scope.getOrderForm().reset();
                     }
                     catch (err) {
                         Ext.Msg.alert('Error', err.message);
                     }
                 }
                 //console.log(response.responseText);
             }
         });
        }
        //Ext.Msg.alert('Alert', JSON.stringify(Ext.getCmp('orderForm').getValues()));
    },

    getCompaniesFromValues: function (values) {
        var cmpnyArray = [];
        if (values.M) cmpnyArray.push(1);
        if (values.K) cmpnyArray.push(2);
        if (values.T) cmpnyArray.push(3);

        return cmpnyArray;
    },

    validateTickets: function (values) {
        var isValid = true;
        var companyArray = this.getCompaniesFromValues(values);
        if (!values.FourDNumber) {
            Ext.Msg.alert('No 4d provided!', 'Please enter atleast one 4D');
            return false;
        }
        var formValuesArr = values.FourDNumber.map(function (items) {
            var newObj = {};
            newObj['FourDNumber'] = items;
            newObj['PhoneNumber'] = values.PhoneNumber;
            newObj['Company'] = companyArray;

            return newObj;
        });
        if (companyArray.length == 0) {
            Ext.Msg.alert('Invalid Company!', 'Please select atleast one company');
            return false;
        }

        var errors = [];
        for (var i = 0; i < formValuesArr.length; i++) {
            var tempModel = Ext.create('Billionaire.model.Tickets', formValuesArr[i]);
            if (!tempModel.isValid()) {
                isValid = false;
                errors.push(tempModel.validate());
                //break;
            }
        }

        if (!isValid) {
            for (var j = 0; j < errors.length; j++) {
                for (var i = 0; i < errors[j].items.length; i++) {
                    var field = Ext.getCmp('orderForm').getFields(errors[j].items[i].getField());
                    if (Ext.isArray(field)) {
                        field[j].addCls('textfield_invalid');
                        field[j].up('fieldset').setInstructions('<span style ="color:red;"><i>' + errors[j].items[i].getMessage() + '<i></span>');
                    }
                    else if (Ext.isObject(field)) {
                        field.addCls('textfield_invalid');
                        field.up('fieldset').setInstructions('<span style ="color:red;"><i>' + errors[j].items[i].getMessage() + '<i></span>');
                    }
                }
            }
        }
		
        return isValid;
    },

    calculateTotal: function () {
        var form = Ext.getCmp('orderForm').getValues(),
            fourDNumbers = form.FourDNumber,
            total = 0;
        for (var i = 0; i < fourDNumbers.length; i++) {
            var splittedValue = fourDNumbers[i].split('-');
            if (splittedValue.length > 1) {
                total += parseInt(splittedValue[1]) ? parseInt(splittedValue[1]) : 0;
                total += parseInt(splittedValue[2]) ? parseInt(splittedValue[2]) : 0;
            }
        }
        Ext.getCmp('totalDisplay').setTotal(total.toFixed(2));
    },

    init: function () {
        this.callParent();
    }
});
    