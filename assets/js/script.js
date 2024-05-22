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
        showModal();
    }

    //TuG validation - Resets to empty if invalid
    userTug = document.getElementById("tug-input").value;
    if (userTug === "" || isNaN(userTug) || userTug <= 0) {
        userTug = "";
        showModal();
    }

    //Age validation - Resets to empty if invalid
    userAge = document.getElementById("age-range").value;
    if (userAge === "") {
        userAge = "";
        showModal();
    }

    //Gender validation - Resets to empty if invalid
    userGender = document.getElementById("gender").value;
    if (userGender === "") {
        userGender = "";
        showModal();
    }
}

/* Calculate TuG risk category based on 10 second BGS cutoff */
function calculateTugScore(userTug) {
    if (userTug > 10) {
        return true;
    } else {
        return false;
    }
}

/* Calculate Gait Speed risk category based on 5 second BGS cutoff */
function calculateGaitResult(userGaitSpeed) {
    if (userGaitSpeed > 5) {
        return true;
    } else {
        return false;
    }
}

/* Calculate Prisma risk category based on <3 yes answers */
function calculatePrismaScore(prismaAnswers, userAge, userGender) {
    let prismaScore = 0;

    // Adding age and gender to the PRISMA score calculation
    if (userAge === "85-plus") prismaScore++;
    if (userGender === "male") prismaScore++;

    // Calculate score based on PRISMA answers
    for (const question in prismaAnswers) {
        if (prismaAnswers[question] === "yes") {
            prismaScore++;
        }
    }
    return prismaScore;
}


/* Function to count the number of valid assessments, then display the results section if at least 2 valid assessments have been completed, or display a modal warning if this criteria has not been met */
function showResults(prismaScore, overallResult) {
    let validAssessments = 0;
    if (userGaitSpeed !== "") validAssessments++;
    if (userTug !== "") validAssessments++;
    if (prismaScore > 0) validAssessments++;

    if (validAssessments >= 2) {
        document.getElementById("results").style.display = "block";
        document.getElementById("submit-btn").style.display = "none";
        document.getElementById("overall-result").textContent = `Overall Risk Result: ${overallResult}`;
    } else {
        showModal();
    }
}

// Event Listener for the "Submit All" button
document.getElementById("submit-btn").addEventListener("click", () => {
    getValues();

    // Storing the risk scores
    const tugResult = calculateTugScore(userTug);
    const gaitResult = calculateGaitResult(userGaitSpeed);
    const prismaScore = calculatePrismaScore(prismaAnswers, userAge, userGender);

    /*Function to calculate overall risk of frailty from the 2 or 3 assessments completed */
    function evaluateOverallRisk(tugResult, gaitResult, prismaScore) {
        let riskCount = 0;

        if (tugResult === true) riskCount++;
        if (gaitResult === true) riskCount++;
        if (prismaScore > 3) riskCount++;

        if (riskCount === 0) {
            return "Low Risk of Frailty";
        } else if (riskCount === 1) {
            return "Medium Risk of Frailty";
        } else if (riskCount === 2) {
            return "High Risk of Frailty";
        } else {
            return "Very High Risk of Frailty";
        }
    }

    const overallResult = evaluateOverallRisk(tugResult, gaitResult, prismaScore);

    // Display results section
    showResults(prismaScore, overallResult);
});

/* Function to refresh the page */
function refreshPage() {
    topFunction();
    location.reload();
}

// Event Listener for the Reset button
document.getElementById("reset-btn").addEventListener("click", refreshPage);

/* Function to display a global alert modal if required inputs are not provided */
function showModal() {
    $('#alertModal').modal('show');
}

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