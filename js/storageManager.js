const storage = localStorage;
const key = "events";

function verifyEvent(event) {
    if (!event.eventName) return false;
    if (!event.participants || !Array.isArray(event.participants) || !event.participants.length) return false;
    if (!event.day || !["mon", "tue", "wed", "thu", "fri"].includes(event.day)) return false;
    if (!event.time || !/1[0-8]:00/.test(event.time)) return false;

    return true;
}

function getEvents(participant = "all") {
    const data = JSON.parse(storage.getItem(key)) || [];

    if (participant == "all") return data;
    return data.filter(i => i.participants.includes(participant));
}

function addEvent(event) {
    if (!verifyEvent(event)) return { "error": true, "msg": "Invalid event data" };
    const data = getEvents();

    if (data.some(i => i.day == event.day && i.time == event.time))
        return { "error": true, "msg": "An event with that date and time already exists" };

    data.push(event);
    storage.setItem(key, JSON.stringify(data));

    return { "error": false, "msg": "Event added successfully" };
}

function removeEvent(day, time) {
    const data = getEvents();

    storage.setItem(key, JSON.stringify(data.filter(i => i.day != day || i.time != time)));

    return { "error": false, "msg": "Event has been removed" };
}

function clearEvents() {
    storage.clear();
}

function moveEvent(prev, next) {
    const data = getEvents();
    const [oldDay, oldTime] = prev.split("-");
    const [newDay, newTime] = next.split("-");

    if (data.some(i => i.day == newDay && i.time == newTime)) return { "error": true };
    
    const event = data.find(i => i.day == oldDay && i.time == oldTime);
    event.day = newDay;
    event.time = newTime;

    removeEvent(oldDay, oldTime);
    addEvent(event);

    return { "error": false };
}
