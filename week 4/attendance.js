// AttendanceCalculator class to handle attendance calculation logic
class AttendanceCalculator {
    constructor(totalClasses, attendedClasses) {
        this.totalClasses = totalClasses;
        this.attendedClasses = attendedClasses;
        this.minimumAttendancePercentage = 75; // Minimum attendance percentage required
    }

    // Method to calculate attendance percentage
    calculateAttendancePercentage() {
        if (this.totalClasses <= 0) {
            return 0;
        }
        return (this.attendedClasses / this.totalClasses) * 100;
    }

    // Method to check if the attendance is sufficient
    isAttendanceSufficient() {
        const attendancePercentage = this.calculateAttendancePercentage();
        return attendancePercentage >= this.minimumAttendancePercentage;
    }

    // Method to get the attendance message
    getAttendanceMessage() {
        const attendancePercentage = this.calculateAttendancePercentage();
        if (attendancePercentage >= this.minimumAttendancePercentage) {
            return `You have attended ${attendancePercentage.toFixed(2)}% of classes. Your attendance is sufficient!`;
        } else {
            return `You have attended ${attendancePercentage.toFixed(2)}% of classes. Your attendance is insufficient.`;
        }
    }
}

// Variables for DOM elements
const calculateBtn = document.getElementById('calculateBtn');
const totalClassesInput = document.getElementById('totalClasses');
const attendedClassesInput = document.getElementById('attendedClasses');
const attendanceMessage = document.getElementById('attendanceMessage');

// Event listener for the calculate button
calculateBtn.addEventListener('click', () => {
    const totalClasses = parseInt(totalClassesInput.value);
    const attendedClasses = parseInt(attendedClassesInput.value);

    // Check if the inputs are valid numbers
    if (isNaN(totalClasses) || isNaN(attendedClasses) || totalClasses <= 0 || attendedClasses < 0 || attendedClasses > totalClasses) {
        attendanceMessage.textContent = "Please enter valid values for total classes and attended classes.";
        attendanceMessage.classList.add('error');
        return;
    }

    // Create an instance of the AttendanceCalculator class
    const calculator = new AttendanceCalculator(totalClasses, attendedClasses);

    // Get and display the attendance message
    attendanceMessage.textContent = calculator.getAttendanceMessage();
    attendanceMessage.classList.remove('error');
    attendanceMessage.classList.add('success');
});
