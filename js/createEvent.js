const participants = [];

function multiSelect() {
    const selected = document.getElementById("participantsSelect");

    if (participants.includes(selected.value)) return;
    participants.push(selected.value);

    updateSelections();
}

function multiRemove() {
    const selected = document.getElementById("participantsSelect");
    const index = participants.indexOf(selected.value);

    if (index == -1) return;
    participants.splice(index, 1);

    updateSelections();
}

function updateSelections() {
    const selections = document.getElementById("participants");
    selections.value = participants.map(i => i[0].toUpperCase() + i.slice(1)).join(", ");
}

function submitEvent(e) {
    e.preventDefault();

    const data = {
        "eventName": document.getElementById("eventName").value,
        "participants": participants,
        "day": document.getElementById("day").value,
        "time": document.getElementById("time").value
    }

    const submitted = addEvent(data);
    if (!submitted.error) {
        submitted.msg += " - Redirecting back to calendar";
        setTimeout(() => location.href = "calendar.html", 1000);
    }
    return createAlert(submitted.error, submitted.msg);
}

function createAlert(error, msg) {
    const alert = document.getElementById("alert");
    const content = document.getElementById("alertContent");

    alert.classList.add(error ? "alert-danger" : "alert-primary");
    alert.classList.remove(error ? "alert-primary" : "alert-danger");

    content.textContent = msg;
    alert.style.display = "block";
}

function closeAlert() {
    document.getElementById("alert").style.display = "none";
}
