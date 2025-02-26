window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const regNumber = urlParams.get("regNumber");
    const studentsData = JSON.parse(localStorage.getItem("studentsData")) || {};
    const studentDetailsDiv = document.getElementById("studentDetails");

    if (!regNumber || !studentsData[regNumber]) {
        studentDetailsDiv.innerHTML = "<p style='color: red;'>Student not found.</p>";
        return;
    }

    const student = studentsData[regNumber];

    let subjectsHTML = "";
    student.subjects.forEach(subject => {
        subjectsHTML += `<p><strong>${subject.subject}:</strong> ${subject.date}</p>`;
    });

    studentDetailsDiv.innerHTML = `
        <div class="hall-ticket">
            <div class="hall-ticket-header">
                <img src="${student.photo}" alt="Student Photo" class="student-photo">
                <div id="qr-${student.regNumber}" class="qr-code"></div>
            </div>
            <h3>${student.name}</h3>
            <p><strong>Reg Number:</strong> ${student.regNumber}</p>
            ${subjectsHTML}
            <br>
            <button onclick="downloadHallTicket('${student.regNumber}')">Download Hall Ticket</button>
        </div>
    `;

    new QRCode(document.getElementById(`qr-${student.regNumber}`), {
        text: `view-students.html?regNumber=${student.regNumber}`,
        width: 100,
        height: 100
    });
};

// Function to download Hall Ticket
function downloadHallTicket(regNumber) {
    const filePath = `hall_tickets/${regNumber}.pdf`;

    const link = document.createElement("a");
    link.href = filePath;
    link.download = `${regNumber}-HallTicket.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
