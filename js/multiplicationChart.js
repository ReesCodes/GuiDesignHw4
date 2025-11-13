/* multiplicationChart.js
   Generates a multiplication chart based on user-defined ranges.
   - Benjamin Tenney (benjamin_tenney@student.uml.edu)
*/

generateTable = function()
    {
        let handler = document.getElementById("tableButton");
        handler.disabled = true; // Disable the button to prevent multiple clicks
        setTimeout(function() { handler.disabled = false; }, 1000); // Re-enable after 1 second
        let data = [];
        let error = document.getElementById("errorMessageDiv"); // Div for displaying error messages
        error.innerHTML = ""; // Clear previous errors
        // Get the input values
        data.tXmin = document.getElementById("tableXmin").value; 
        data.tXmax = document.getElementById("tableXmax").value;
        data.tYmin = document.getElementById("tableYmin").value;
        data.tYmax = document.getElementById("tableYmax").value;
        let tBox  = document.getElementById("tableBox"); // The div where the table will be placed

        console.log("Button Pressed", data.tXmin,data.tXmax,data.tYmin,data.tYmax) // Debugging output to console

        // Convert to integers
        data.tXmin = parseInt(data.tXmin);
        data.tXmax = parseInt(data.tXmax);
        data.tYmin = parseInt(data.tYmin);
        data.tYmax = parseInt(data.tYmax);

        // Generate the table
        // Create the header row
        let grid = "<table id=\"multiplicationChart\">" +
            "<th></th>"
        for (let col = data.tXmin; col <= data.tXmax; col++)
        {   
            grid += "<th>" + col + "</th>";
        }
        grid += "</tr>"
        // Create the data rows
        for (let row = data.tYmin; row <= data.tYmax; row++) {
            let s = "<tr> <th>"+ row + "</th>";
            for (let col = data.tXmin; col <= data.tXmax; col++) {
                s += "<td>" + ( row * col ) + "</td>";
            }
            grid += s + "</tr>" 
        }
        // Close the table
        grid += "</table>";
        // Insert the table into the div
        tBox.innerHTML=grid;
        return false; // Prevent form submission
    }
