// jshint -W074

(function() {
    'use strict';

    angular.module('app.service.notify.formError', [
        'app.service.notify.factory'
    ]);

    angular.module('app.service.notify.formError').factory('formError', formError);

    formError.$inject = ['Notify'];

    function formError(Notify) {
        var factory = {
                show: show
            },

            fields,
            defaultConfig = {
                inputRequired: {
                    email: 'email',
                    password: 'password',
                    passwordConfirm: 'password confirmation',
                    passwordConfirmation: 'password confirmation',
                    fullName: 'full name',
                    phoneNo: 'phone number',
                    relativeName: 'family member name',
                    login: 'login'
                },
                selectRequired: {
                    birthday: 'day of birth',
                    date: 'day of birth'
                },
                minLength: {
                    password: 'Password',
                    passwordConfirmation: 'Password confirmation',
                    passwordConfirm: 'Password confirmation'
                },
                minlength: {
                    password: 'Password',
                    passwordConfirmation: 'Password confirmation',
                    passwordConfirm: 'Password confirmation'
                },
                equals: {
                    password: 'Password',
                    passwordConfirmation: 'Password confirmation',
                    passwordConfirm: 'Password confirmation'
                }
            },

            message,
            nextLine;

        return factory;

        function show(err, id, config) {
            fields = config || defaultConfig;
            message = '';
            nextLine = false;

            for (var key in err) {
                if (key === 'required') {
                    requiredParse(err[key]);
                } else if (key === 'email') {
                    wrongMailParse(err[key]);
                } else if (key === 'minlength') {
                    minLengthParse(err[key]);
                } else if (key === 'equals') {
                    equalsParse(err[key]);
                } else if (key === 'invalidDate') {
                    invalidDateParse(err[key]);
                }  else if (key === 'ngIntlTelInput') {
                    invalidPhoneParse(err[key]);
                } else if (key === 'max') {
                    maxDateParse(err[key]);
                } else if (key === 'validNumber') {
                    validNumberParse(err[key]);
                }
            }
            Notify.red(id, message);
        }

        function convertValue(type, field) {
            if (fields[type]) {
                return fields[type][field] || field;
            } else {
                return field;
            }
        }

        function isInput(field) {
            return fields.inputRequired[field];
        }

        function isSelect(field) {
            return fields.selectRequired[field];
        }

        function moveOnNextLine() {
            message += '<br/>';
        }

        function requiredParse(err) {
            for (var i = 0; i < err.length; i++) {
                var fieldName = err[i].$name || err[i].$$parserName;
                if (isInput(fieldName)) {
                    fieldName = convertValue('inputRequired', fieldName);
                    message += 'Please enter ' + fieldName;
                    moveOnNextLine();
                } else if (isSelect(fieldName)) {
                    fieldName = convertValue('selectRequired', fieldName);
                    message += 'Please select ' + fieldName;
                    moveOnNextLine();
                }
            }
        }

        function wrongMailParse(err) {
            for (var i = 0; i < err.length; i++) {
                message += 'Entered email is not valid';
                moveOnNextLine();
            }
        }

        function minLengthParse(err) {
            for (var i = 0; i < err.length; i++) {
                var fieldName = err[i].$name || err[i].$$parserName;
                fieldName = convertValue('minlength', fieldName);
                message += fieldName + ' should be at least 8 characters long';
                moveOnNextLine();
            }
        }

        function equalsParse(err) {
            var fieldName1,
                fieldName2;

            for (var i = 0; i < err.length; i += 2) {
                try {
                    fieldName1 = err[i].$name || err[i].$$parserName;
                    fieldName2 = err[i + 1].$name || err[i + 1].$$parserName;
                } catch (e) {}

                fieldName1 = convertValue('equals', fieldName1);
                fieldName2 = convertValue('equals', fieldName2);

                if (fieldName1 && fieldName2) {
                    message += fieldName1 + ' and ' + fieldName2 + ' do not match';
                    moveOnNextLine();
                }
            }
        }

        function invalidDateParse(err) {
            for (var i = 0; i < err.length; i++) {
                message += 'Please enter valid date';
                moveOnNextLine();
            }
        }

        function invalidPhoneParse(err) {
            for (var i = 0; i < err.length; i++) {
                message += 'Entered phone number is not valid';
                moveOnNextLine();
            }
        }

        function maxDateParse(err) {
            for (var i = 0; i < err.length; i++) {
                message += 'Date of birth can not be more than today';
                moveOnNextLine();
            }
        }

        function validNumberParse(err) {
            for (var i = 0; i < err.length; i++) {
                message += 'Please enter a valid phone number e.g. +380661234567';
                moveOnNextLine();
            }
        }
    }
})();
