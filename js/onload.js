/**
 * Author: Ben Tenney -benjamin_tenney@student.uml.edu
 * This is a simple system I made that allows multiple functions
 * to be tied to the page ready function
 */
onloadList = [];
$(document).ready(function () {
    for (const fun of onloadList) {
        fun()
    }
})

onloadList.push(function () {
    console.log("Page Loaded")
})

onloadList.push(function () {
    // Hide the noJs div since JavaScript is enabled
    document.getElementById("noJs").style.display = "none";
})

onloadList.push(function () {
    // Jquery validation setup
    // Custom rule: max cannot be more than 1000 greater than min
    $.validator.addMethod("maxRange1000", function (value, element, param) {
        var maxVal = parseFloat(value);
        var minVal = parseFloat($(param).val());

        if (isNaN(maxVal) || isNaN(minVal)) {
            return true; // let other rules (required/number) handle invalid input
        }

        return (maxVal - minVal) <= 1000;
    }, "Max must be no more than 1000 greater than min.");

    $("#controlBox").validate({
        // Validate on keyup so errors show/update while the field is focused
        onkeyup: function (element) {
            $(element).valid();
        },
        rules: {
            tableXmin: {
                required: true,
                number: true,
                min: -1000000,
                max: 1000000
            },
            tableXmax: {
                required: true,
                number: true,
                // Must be within overall bounds and >= tableXmin
                min: function () {
                    return parseFloat($("#tableXmin").val() || -1000000);
                },
                max: 1000000,
                maxRange1000: "#tableXmin"
            },
            tableYmin: {
                required: true,
                number: true,
                min: -1000000,
                max: 1000000
            },
            tableYmax: {
                required: true,
                number: true,
                // Must be within overall bounds and >= tableYmin
                min: function () {
                    return parseFloat($("#tableYmin").val() || -1000000);
                },
                max: 1000000,
                maxRange1000: "#tableYmin"
            }
        },
        messages: {
            tableXmin: "Please enter a valid integer between -1000000 and 1000000.",
            tableXmax: {
                required: "Please enter a valid integer between -1000000 and 1000000.",
                number: "Please enter a valid integer between -1000000 and 1000000.",
                min: "X max must be greater than or equal to X min.",
                max: "Please enter a valid integer between -1000000 and 1000000.",
                maxRange1000: "X max must be no more than 1000 greater than X min."
            },
            tableYmin: "Please enter a valid integer between -1000000 and 1000000.",
            tableYmax: {
                required: "Please enter a valid integer between -1000000 and 1000000.",
                number: "Please enter a valid integer between -1000000 and 1000000.",
                min: "Y max must be greater than or equal to Y min.",
                max: "Please enter a valid integer between -1000000 and 1000000.",
                maxRange1000: "Y max must be no more than 1000 greater than Y min."
            }
        },
        errorPlacement: function (error, element) {
            // Place error messages in the errorMessageDiv
            $("#errorMessageDiv").html(error);
        },
        submitHandler: function (form) {
            // Prevent default form submission

            generateTable();
            return false;
        }
    });
})