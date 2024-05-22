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

// Get the scroll to top button:
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
    scrollFunction()
};

/* Function to switch the results section from hidden to block when assessments have been completed */
function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

/* Function to scroll to the top of the document when the user clicks on the button */
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

/* Function to get all values */
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

/* Calculate TuG risk category based on 10 second BGS cutoff */
function calculateTugScore(userTug) {
    if (userTug > 10) {
        return "Potential Risk of Frailty";
    } else {
        return "Low Risk of Frailty";
    }
}

/* Calculate Gait Speed risk category based on 5 second BGS cutoff */
function calculateGaitResult(userGaitSpeed) {
    if (userGaitSpeed > 5) {
        return "Potential Risk of Frailty";
    } else {
        return "Low Risk of Frailty";
    }
}


/* Function to count the number of valid assessments, then display the results section if at least 2 valid assessments have been completed, or display a modal warning if this criteria has not been met */
function showResults() {
    let validAssessments = 0;
    if (userGaitSpeed !== "") validAssessments++;
    if (userTug !== "") validAssessments++;

    if (validAssessments >= 2) {
        document.getElementById("results").style.display = "block";
        document.getElementById("submit-btn").style.display = "none";
    } else {
        alert("Please complete at least two of the assessments.");
    }
}

// Event Listener for the "Submit All" button
document.getElementById("submit-btn").addEventListener("click", () => {
    getValues();

    /*Function to calculate overall risk of frailty from the 2 or 3 assessments completed */
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

    // Display results section
    showResults();

    //Display risk scores
    document.getElementById("tug-result").textContent = `TuG Risk Result: ${tugResult}`;
    document.getElementById("gait-result").textContent = `Gait Speed Risk Result: ${gaitResult}`;
    document.getElementById("overall-result").textContent = `Overall Risk Result: ${gaitResult}`;

});

/* Function to refresh the page */
function refreshPage() {
    topFunction();
    location.reload();
}

// Event Listener for the Reset button
document.getElementById("reset-btn").addEventListener("click", refreshPage);

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