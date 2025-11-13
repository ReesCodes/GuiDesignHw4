/**
 * Author: Ben Tenney -benjamin_tenney@student.uml.edu
 * This is a simple system I made that allows multiple functions
 * to be tied to the page ready function
 */
onloadList = [];
$(document).ready(function() {
    for (const fun of onloadList) {
        fun()
    }
})

onloadList.push( function() {})