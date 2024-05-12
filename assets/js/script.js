//Getting the values
//Global values (initialised)
let userDob = "";
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

    //Gait Speed
    userGaitSpeed = document.getElementById("gait-input").value;
    //TuG
    userTug = document.getElementById("tug-input").value;

    //Console Logging
    console.log(userAge);
    console.log(userGender);
    console.log(prismaAnswers);
    console.log(userGaitSpeed);
    console.log(userTug);
}

//Event listener for submit button
document.getElementById("submit-btn").addEventListener("click", getValues);