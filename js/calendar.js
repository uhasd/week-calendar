const eventClass = "table-warning";

window.onload = () => {
    const participant = document.getElementById("participant").value;
    renderCalendar(participant);
}

function selected() {
    const participant = document.getElementById("participant").value;
    renderCalendar(participant);
}

function renderCalendar(participant) {
    refreshCalendar();

    const data = getEvents();

    for (let i of participant == "all" ? data : data.filter(i => i.participants.includes(participant))) {
        const cell = document.querySelector(`[data-id="${i.day}-${i.time}"]`);

        const data = `
            <div class="d-flex justify-content-center align-items-center" draggable="true">
                <div>
                    ${i.eventName}
                </div>
                <div class="ms-3">
                    <a href="#" onclick="delEvent('${i.day}', '${i.time}')" class="float-end">&times</a>
                </div>
            </div>
        `;

        cell.classList.add(eventClass);
        cell.innerHTML = data;
    }
}

function refreshCalendar() {
    const cells = document.querySelectorAll("[data-id]");

    for (let i of cells) {
        i.innerHTML = "";
        i.classList.remove(eventClass);
    }
}

function delEvent(day, time) {
    const answer = confirm("Are you sure that you want to delete this event?");
    if (!answer) return;

    removeEvent(day, time);
    const cell = document.querySelector(`[data-id="${day}-${time}"]`);
    cell.innerHTML = "";
    cell.classList.remove(eventClass);
}

function clearAll() {
    const answer = confirm("Are you sure that you want to delete all of the events?");
    if (!answer) return;

    clearEvents();
    refreshCalendar();
}
