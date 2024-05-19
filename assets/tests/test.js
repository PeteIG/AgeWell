/**
 * @jest-environment jsdom
 */

// Loading the HTML file 
let fs = require("fs");
let fileContents = fs.readFileSync("index.html", "utf-8");
document.open();
document.write(fileContents);
document.close();

// Importing the const variables
const {
    userGaitSpeed,
    userTug,
    userAge,
    userGender,
    prismaAnswers,
    prismaQuestions,
    getValues
} = require('../js/script.js');
const {
    default: expect
} = require("expect");

// Tests for input validation
describe("Input Validation", () => {

    // Test Gait input for an invalid entry 
    test('validates gait speed input', () => {
        // Set up DOM elements for this specific test
        document.getElementById("gait-input").value = "abc";
        getValues();
        expect(userGaitSpeed).toBe("");

        document.getElementById("gait-input").value = "";
        getValues();
        expect(userGaitSpeed).toBe("");
    });

    // Test TUG input for invalid entry 
    test('validates TUG input', () => {
        // Set up DOM elements for this specific test
        document.getElementById("tug-input").value = "xyz";
        getValues();
        expect(userTug).toBe("");

        document.getElementById("tug-input").value = "";
        getValues();
        expect(userTug).toBe("");
    });

    // Test Age input for invalid entry
    test('validates Age input', () => {
        document.getElementById("age-range").value = "null";
        getValues();
        expect(userAge).toBe("");
    });

    // Test Gender input for invalid entry
    test('validates Gender input', () => {
        document.getElementById("gender").value = "null";
        getValues();
        expect(userGender).toBe("");
    });

    // Test for Prisma radio button selections
    describe("Prisma Questionnaire Validation", () => {
        prismaQuestions.forEach(questionId => {
            test(`validates radio button selection for ${questionId}`, () => {
                document.body.innerHTML = `
                    <input type="radio" name="${questionId}" value="yes"> Yes
                    <input type="radio" name="${questionId}" value="no"> No
                    <button id="submit-btn">Submit All</button>
                    <input type="number" id="gait-input" value="">
                    <input type="number" id="tug-input" value="">
                    <select id="age-range">
                        <option value="under50">Under 50</option>
                        <option value="50-64">50-64</option>
                        <option value="65-74">65-74</option>
                        <option value="75-84">75-84</option>
                        <option value="85-plus">85+</option>
                    </select>
                    <select id="gender">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                `;

                // Simulate no selection
                getValues();
                expect(prismaAnswers[questionId]).toBe("no"); // Default if nothing selected

                // Simulate "yes" selection
                document.getElementsByName(questionId)[0].checked = true;
                getValues();
                expect(prismaAnswers[questionId]).toBe("yes");
            });
        });
    });

});