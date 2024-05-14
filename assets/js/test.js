/**
 * @jest-environment jsdom
 */

// Load the HTML file 
let fs = require("fs");
let fileContents = fs.readFileSync("index.html", "utf-8");
document.open();
document.write(fileContents);
document.close();

const {
    userGaitSpeed,
    userTug,
    getValues
} = require('./script.js');

//Tests for input validation
describe("Input Validation", () => {

    //Test Gait input for invalid entry 
    test('validates gait speed input', () => {
        // Set up DOM elements for this specific test
        document.getElementById("gait-input").value = "abc";
        getValues();
        expect(userGaitSpeed).toBe("");

        document.getElementById("gait-input").value = "";
        getValues();
        expect(userGaitSpeed).toBe("");
    });

    //Test TUG input for invalid entry 
    test('validates TUG input', () => {
        // Set up DOM elements for this specifc test
        document.getElementById("tug-input").value = "xyz";
        getValues();
        expect(userTug).toBe("");

        document.getElementById("tug-input").value = "";
        getValues();
        expect(userTug).toBe("");
    });
});