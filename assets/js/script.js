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

    //Age validation - Resets to empty if invalid
    userAge = document.getElementById("age-range").value;
    if (userAge === "") {
        userAge = "";
        alert("Age range is needed to accurately categorise your results. Please select an option.");
    }

    //Gender validation - Resets to empty if invalid
    userGender = document.getElementById("gender").value;
    if (userGender === "") {
        userGender = "";
        alert("Gender is needed to accurately categorise your results. Please select an option.");
    }

    //Console Logging
    console.log(userAge);
    console.log(userGender);
    console.log(prismaAnswers);
    console.log(userGaitSpeed);
    console.log(userTug);
}

//Calculate TuG risk category based on 10 second BGS cutoff 
function calculateTugScore(userTug) {
    if (userTug > 10) {
        return "Potential Risk of Frailty";
    } else {
        return "Low Risk of Frailty";
    }
}

//Calculate Gait Speed risk category based on 5 second BGS cutoff 
function calculateGaitResult(userGaitSpeed) {
    if (userGaitSpeed > 5) {
        return "Potential Risk of Frailty";
    } else {
        return "Low Risk of Frailty";
    }
}

// Event Listener for the "Submit All" button
document.getElementById("submit-btn").addEventListener("click", () => {
    getValues();

    function calculateOverallRisk(tugResult, gaitResult) {
        if (tugResult === "Potential Risk of Frailty" || gaitResult === "Potential Risk of Frailty") {
            return "Potential Risk of Frailty";
        } else {
            return "Low Risk of Frailty";
        }
    }

    // Calculating the risk scores
    const tugResult = calculateTugScore(userTug);
    const gaitResult = calculateGaitResult(userGaitSpeed);
    const overallResult = calculateOverallRisk(tugResult, gaitResult);

    //Display risk scores
    document.getElementById("tug-result").textContent = `TuG Risk Result: ${tugResult}`;
    document.getElementById("gait-result").textContent = `Gait Speed Risk Result: ${gaitResult}`;
    document.getElementById("overall-result").textContent = `Overall Risk Result: ${gaitResult}`;
});




// Export variables and functions for testing
module.exports = {
    userAge,
    userGender,
    userGaitSpeed,
    userTug,
    prismaQuestions,
    prismaAnswers,
    getValues
};