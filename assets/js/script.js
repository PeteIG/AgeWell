//Getting the values
//Global values (initialised)
let userAge = "";
let userGender = "";
let userGaitSpeed = "";
let userTug = "";
const prismaQuestions = ["prisma-1", "prisma-2", "prisma-3", "prisma-4", "prisma-5"];
const prismaAnswers = {
    "prisma-1": "no",
    "prisma-2": "no",
    "prisma-3": "no",
    "prisma-4": "no",
    "prisma-5": "no",
}

// Function to get all values
function getValues() {
    userAge = document.getElementById("age-range").value;
    userGender = document.getElementById("gender").value;
    prismaQuestions.forEach(question => {
        const radios = document.getElementsByName(question);
        radios.forEach(radio => {
            if (radio.checked) {
                prismaAnswers[question] = radio.value;
            }
        });
    });

    //Gait Speed validation  - Resets to empty if invalid
    userGaitSpeed = document.getElementById("gait-input").value;
    if (userGaitSpeed === "" || isNaN(userGaitSpeed) || userGaitSpeed <= 0) {
        userGaitSpeed = "";
        alert("Please enter a valid positive number for gait speed.");
    }

    //TuG validation - Resets to empty if invalid
    userTug = document.getElementById("tug-input").value;
    if (userTug === "" || isNaN(userTug) || userTug <= 0) {
        userTug = "";
        alert("Please enter a valid positive number for Timed Up and Go.");
    }

    //Console Logging
    console.log(userAge);
    console.log(userGender);
    console.log(prismaAnswers);
    console.log(userGaitSpeed);
    console.log(userTug);
}

// Export variables and functions for testing
module.exports = {
    userAge,
    userGender,
    userGaitSpeed,
    userTug,
    getValues
};