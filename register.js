document.getElementById("studentForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const regNumber = document.getElementById("regNumber").value.trim();
    const studentName = document.getElementById("studentName").value;

    if (!regNumber || studentName === "Unknown Student") {
        alert("Please enter a valid registration number.");
        return;
    }

    const examDates = {
        "WAD": "2025-03-01",
        "DATA MINING": "2025-03-05",
        "IOT": "2025-03-10",
        "DBMS": "2025-03-15",
        "NETWORKING": "2025-03-20"
    };

    const defaultSubjects = Object.keys(examDates);
    const subjectExamDates = defaultSubjects.map(subject => ({ subject, date: examDates[subject] }));

    const photoFilename = `photos/${regNumber}.jpg`;

    const studentData = {
        regNumber,
        name: studentName,
        subjects: subjectExamDates,
        photo: photoFilename
    };

    let studentsData = JSON.parse(localStorage.getItem("studentsData")) || {};
    studentsData[regNumber] = studentData;
    localStorage.setItem("studentsData", JSON.stringify(studentsData));

    alert("Student registered successfully!");

    // Redirect to Hall Ticket page
    window.location.href = `view-students.html?regNumber=${regNumber}`;
});

function assignStudentName() {
    const regNumber = document.getElementById("regNumber").value.trim();
    let studentName = "Unknown Student";

    const studentNames = {
        "22BCA043": "SATHISH RAJA E",
        "22BCA028": "MOHAMMED ALTHAF I"
        "U22SC011": "ARUN KUMAR"
    };

    if (studentNames.hasOwnProperty(regNumber)) {
        studentName = studentNames[regNumber];
    }

    document.getElementById("studentName").value = studentName;
}
