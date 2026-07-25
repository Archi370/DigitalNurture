// Ex 5: Form Confirmation
function showConfirm() { alert("Registered!"); }

// Ex 8: LocalStorage (Save Preference)
function savePref() {
    localStorage.setItem("event", document.getElementById("eventType").value);
}

// Ex 9: Geolocation
function findLocation() {
    navigator.geolocation.getCurrentPosition((pos) => {
        console.log(pos.coords.latitude, pos.coords.longitude);
    }, (err) => console.log(err), {enableHighAccuracy: true});
}