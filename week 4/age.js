// AgeVerifier class to handle the age verification logic
class AgeVerifier {
    constructor(dob) {
        this.dob = dob; // Date of birth input
        this.minAge = 18; // Minimum age required to access the site
    }

    // Method to calculate age based on the input date of birth
    calculateAge() {
        const birthDate = new Date(this.dob);
        const currentDate = new Date();
        let age = currentDate.getFullYear() - birthDate.getFullYear();
        const month = currentDate.getMonth();
        const day = currentDate.getDate();

        // Adjust age if the birthday hasn't occurred yet this year
        if (month < birthDate.getMonth() || (month === birthDate.getMonth() && day < birthDate.getDate())) {
            age--;
        }

        return age;
    }

    // Method to check if the user is old enough
    isOldEnough() {
        return this.calculateAge() >= this.minAge;
    }
}

// Variables for DOM elements
const verifyBtn = document.getElementById('verifyBtn');
const dobInput = document.getElementById('dob');
const messageElement = document.getElementById('message');
const content = document.getElementById('content');

// Event listener for the verify button
verifyBtn.addEventListener('click', () => {
    const dobValue = dobInput.value;

    // Check if the input is empty
    if (!dobValue) {
        messageElement.textContent = "Please enter a valid date of birth.";
        messageElement.classList.add('error');
        messageElement.classList.remove('hidden');
        content.classList.add('hidden');
        return;
    }

    // Create an instance of AgeVerifier class
    const verifier = new AgeVerifier(dobValue);

    // Check if the user is old enough
    if (verifier.isOldEnough()) {
        messageElement.textContent = "Age verified successfully!";
        messageElement.classList.add('success');
        messageElement.classList.remove('hidden');
        content.classList.remove('hidden');
    } else {
        messageElement.textContent = "Sorry, you are not old enough to access this site.";
        messageElement.classList.add('error');
        messageElement.classList.remove('hidden');
        content.classList.add('hidden');
    }
});
