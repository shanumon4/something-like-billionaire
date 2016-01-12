﻿Ext.define('Billionaire.controller.OrderFormController', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            'loginForm': 'loginView',
            'orderForm': 'orderForm'
        },
        control: {
            'orderForm textfield': {
                change: 'onkeyup4d'
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
        this.calculateTotal();

        f.removeCls('textfield_invalid');
        f.up('fieldset').setInstructions('');
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
        var orderForm = this.getOrderForm(),
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

        var newField = fs.add(fourdfield);
        newField.focus();
    },

    onSubmitOrderForm: function () {
        
        var vals = this.getOrderForm().getValues();
        var isValidTickets = this.validateTickets(vals);
        if (isValidTickets) {
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
                        Ext.create('Ext.Panel', {
                            html: '<div class="orderconfirm_title">Order confirmed</div>',
                            left: options.scope.getOrderForm().el.getX() + 5,
                            top: options.scope.getOrderForm().el.getY() + 5,
                            //top:5,
                            //padding: 10,
                            //margin: '5 5 5 5',
                            floatingCls: 'orderconfirm_floatingCls',
                            width: options.scope.getOrderForm().el.getWidth() - 10,
                            height: options.scope.getOrderForm().el.getHeight() - 10,
                            fullscreen: true,
                            modal: true,
                            renderTo: this.getOrderForm().id,
                            items: [{
                                xtype: 'textareafield',
                                width: '100%',
                                value: response.responseText
                            }]
                        }).show();
                    }
                    //console.log(response.responseText);
                }
            });
        }
        //Ext.Msg.alert('Alert', JSON.stringify(this.getOrderForm().getValues()));
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
                    var field = this.getOrderForm().getFields(errors[j].items[i].getField());
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
        var form = this.getOrderForm().getValues(),
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
    }
});
    