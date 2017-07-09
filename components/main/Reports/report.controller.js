(function () {
    'use strict';
    angular
        .module('app.main.report')
        .controller('reportCtrl', reportCtrl);

    var main1 = angular.module('app.main.report');

    reportCtrl.$inject = ['$stateParams', 'Notify', '$filter', 'reportAPI'];

    function reportCtrl($stateParams, Notify, $filter, reportAPI) {

        var vm = this;
        vm.MonthlyEmployeeAttendance = MonthEmpAttendance;
        vm.MonthlyEmployeeSal = Monthsal;
        vm.MonthPatients = patients;
        vm.Monthpayments = payments;
        vm.Ledgers = Ledgers;
        vm.totemp = totalemp;
        vm.totpat = totpat;
        vm.showEle = false;
        function convert(str) {

            var date = new Date(str),
                mnth = ("0" + (date.getMonth() + 1)).slice(-2),
                day = ("0" + date.getDate()).slice(-2);
            return [date.getFullYear(), mnth].join("-");
        }

        function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
            //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
            var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

            var CSV = '';
            //Set Report title in first row or line

            CSV += ReportTitle + '\r\n\n';

            //This condition will generate the Label/Header
            if (ShowLabel) {
                var row = "";

                //This loop will extract the label from 1st index of on array
                for (var index in arrData[0]) {

                    //Now convert each value to string and comma-seprated
                    row += index + ',';
                }

                row = row.slice(0, -1);

                //append Label row with line break
                CSV += row + '\r\n';
            }

            //1st loop is to extract each row
            for (var i = 0; i < arrData.length; i++) {
                var row = "";

                //2nd loop will extract each column and convert it in string comma-seprated
                for (var index in arrData[i]) {
                    row += '"' + arrData[i][index] + '",';
                }

                row.slice(0, row.length - 1);

                //add a line break after each row
                CSV += row + '\r\n';
            }

            if (CSV == '') {
                alert("Invalid data");
                return;
            }

            //Generate a file name
            var fileName = "MyReport_";
            //this will remove the blank-spaces from the title and replace it with an underscore
            fileName += ReportTitle.replace(/ /g, "_");

            //Initialize file format you want csv or xls
            var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

            // Now the little tricky part.
            // you can use either>> window.open(uri);
            // but this will not work in some browsers
            // or you will not get the correct file extension

            //this trick will generate a temp <a /> tag
            var link = document.createElement("a");
            link.href = uri;

            //set the visibility hidden so it will not effect on your web-layout
            link.style = "visibility:hidden";
            link.download = fileName + ".csv";

            //this part will append the anchor tag and remove it after automatic click
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        function MonthEmpAttendance() {
            if (vm.report === undefined) {
                vm.showEle = true;
            }
            var s = convert(vm.report.date);
            reportAPI.getEmpAttendance(s).then(function (resp) {

                JSONToCSVConvertor(resp, "Monthly Employee Attendance Report", true);
            });
        }

        function Monthsal() {
            if (vm.report === undefined) {
                vm.showEle = true;
            }
            var s = convert(vm.report.date);
            reportAPI.getEmployeesal(s).then(function (resp) {

                JSONToCSVConvertor(resp, "Monthly Employee Salary Report", true);
            });
        }

        function patients() {
            if (vm.report === undefined) {
                vm.showEle = true;
            }
            var s = convert(vm.report.date);
            reportAPI.getPatients(s).then(function (resp) {

                JSONToCSVConvertor(resp, "Monthly Patient Report", true);
            });
        }

        function payments() {
            if (vm.report.date === undefined) {
                vm.showEle = true;
            }
            var s = convert(vm.report.date);
            reportAPI.getPayments(s).then(function (resp) {

                JSONToCSVConvertor(resp, "Monthly Payments Report", true);
            });
        }

        function Ledgers() {
            if (vm.report === undefined) {
                vm.showEle = true;
            }
            var s = convert(vm.report.date);
            reportAPI.getLedgers(s).then(function (resp) {

                JSONToCSVConvertor(resp, "Monthly Ledger Report", true);
            });
        }


        function totalemp() {
            reportAPI.totemp().then(function (resp1) {
                JSONToCSVConvertor(resp1, "Total Employees Report", true);
            });
        }


        function totpat() {
            reportAPI.totpat().then(function (resp) {
                JSONToCSVConvertor(resp, "Total Patients Report", true);
            });
        }
    }

})();
