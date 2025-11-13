/**
 * Author: Ben Tenney -benjamin_tenney@student.uml.edu
 * This is a simple system I made that allows multiple functions
 * to be tied to the page ready function
 */
onloadList = [];
$(document).ready(function () {
    // Loop through and call each function in the onloadList when the page is loaded
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

// JQuery validation setup

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
    }, "Min must be within 1000 of Max.");

    $("#controlBox").validate({
        rules: {
            tableXmin: {
                required: true,
                number: true,
                min: -10000,
                
                max: function () { // must be <= tableXmax 
                    return Math.min(parseFloat($("#tableXmax").val()) || 10000);
                },
            },
            tableXmax: {
                required: true,
                number: true,
                // Must be within overall bounds and >= tableXmin
                min: function () {
                    return  Math.max(parseFloat($("#tableXmin").val()) || -10000);
                },
                max: 10000,
                maxRange1000: "#tableXmin"
            },
            tableYmin: {
                required: true,
                number: true,
                min: -10000,
                max: function () { // must be <= tableYmax 
                    return Math.min(parseFloat($("#tableYmax").val()) || 10000);
                },
            },
            tableYmax: {
                required: true,
                number: true,
                // Must be within overall bounds and >= tableYmin
                min: function () {
                    return  Math.max(parseFloat($("#tableYmin").val()) || -10000);
                },
                max: 10000,
                maxRange1000: "#tableYmin"
            }
        },
        messages: {
            tableXmin: {
                required: "Please enter a valid integer between -10000 and 10000.",
                number: "Please enter a valid integer between -10000 and 10000.",
                min: "Please enter a valid integer between -10000 and 10000.",
                max: "X min must be less than or equal to X max.",
                maxRange1000: "The difference between X Min and X Max must be less than or equal to 1000.",
            },
            tableXmax: {
                required: "Please enter a valid integer between -10000 and 10000.",
                number: "Please enter a valid integer between -10000 and 10000.",
                min: "X max must be greater than or equal to X min.",
                max: "Please enter a valid integer between -10000 and 10000.",
                maxRange1000: "X Max must be within 1000 of X Min.",
            },
            tableYmin: {
                required: "Please enter a valid integer between -10000 and 10000.",
                number: "Please enter a valid integer between -10000 and 10000.",
                min: "Please enter a valid integer between -10000 and 10000.",
                max: "Y min must be less than or equal to Y max.",
                maxRange1000: "Y Min must be within 1000 of Y Max.",
            },
            tableYmax: {
                required: "Please enter a valid integer between -10000 and 10000.",
                number: "Please enter a valid integer between -10000 and 10000.",
                min: "Y max must be greater than or equal to Y min.",
                max: "Please enter a valid integer between -10000 and 10000.",
                maxRange1000: "The difference between Y Min and Y Max must be less than or equal to 1000.",
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

onloadList.push(function () {
    // Sync range and number inputs
    $("#controlBox input").on("input change", function () {
        // Update the corresponding range/number input when one is changed
        var correspondingId = this.id.endsWith("alt") ? this.id.slice(0, -3) : this.id + "alt";
        $("#" + correspondingId).val(this.value).trigger("change");
        // Re-validate the changed input
        $(this).valid();
    });
})

onloadList.push(function () {
    // disable tab focusing sliders and make tab skip them
    $("#controlBox input[type='range']").attr("tabindex", "-1");
})