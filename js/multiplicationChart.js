generateTable = function()
    {
        let handler = document.getElementById("tableButton");
        handler.disabled = true; // Disable the button to prevent multiple clicks
        setTimeout(function() { handler.disabled = false; }, 1000); // Re-enable after 1 second
        
        let error = document.getElementById("errorMessageDiv"); // Div for displaying error messages
        error.innerHTML = ""; // Clear previous errors
        // Get the input values
        let tXmin = document.getElementById("tableXmin").value; 
        let tXmax = document.getElementById("tableXmax").value;
        let tYmin = document.getElementById("tableYmin").value;
        let tYmax = document.getElementById("tableYmax").value;
        let tBox  = document.getElementById("tableBox"); // The div where the table will be placed

        console.log("Button Pressed", tXmin,tXmax,tYmin,tYmax) // Debugging output to console

        // Convert to integers
        tXmin = parseInt(tXmin);
        tXmax = parseInt(tXmax);
        tYmin = parseInt(tYmin);
        tYmax = parseInt(tYmax);

        // Validate the input
        if (isNaN(tXmin) || isNaN(tXmax) || isNaN(tYmin) || isNaN(tYmax)) {
            error.innerHTML = "Please enter valid integers for all fields.";
            return;
        }
        if (tXmin > tXmax) {
            error.innerHTML = "X min must be less than or equal to X max.";
            return;
        }
        if (tYmin > tYmax) {
            error.innerHTML = "Y min must be less than or equal to Y max.";
            return;
        }
        if (tXmax - tXmin > 500 || tYmax - tYmin > 500) {
            error.innerHTML = "The range for both X and Y must not exceed 500.";
            return;
        }
        
        // Generate the table
        // Create the header row
        let grid = "<table id=\"multiplicationChart\">" +
            "<th></th>"
        for (let col = tXmin; col <= tXmax; col++)
        {
            grid += "<th>" + col + "</th>";
        }
        grid += "</tr>"
        // Create the data rows
        for (let row = tYmin; row <= tYmax; row++) {
            let s = "<tr> <th>"+ row + "</th>";
            for (let col = tXmin; col <= tXmax; col++) {
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

window.onload = function() {
    this.document.getElementById("noJs").style.display = "none"; // Hide the no-JS message if JS is enabled   
}// when the page loads if JS is enabled