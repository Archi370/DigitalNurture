// Ex 1, 2: Basics
console.log("Welcome to the Community Portal");
window.onload = () => alert("Page Loaded!");
const eName = "Music Fest"; 
let seats = 5; 
console.log(`Registering for ${eName}. Seats left: ${seats}`);

// Ex 4: Closure for Registration Tracking
const createTracker = () => {
    let count = 0;
    return () => ++count;
};
const trackReg = createTracker();

// Ex 5, 6: Objects & Arrays
class Event { constructor(n, s, cat) { this.n=n; this.s=s; this.cat=cat; } }
Event.prototype.checkAvailability = function() { return this.s > 0; };
let events = [new Event("Music Fest", 5, "Music"), new Event("Baking", 0, "Workshop")];

// Ex 7, 8, 11: DOM, Events, Forms
document.getElementById('regForm').onsubmit = function(e) {
    e.preventDefault(); // Ex 11
    try {
        if(seats <= 0) throw "No seats!";
        seats--;
        trackReg();
        alert("Registered!");
    } catch(err) { alert(err); }
};

// Ex 14: jQuery
$('#registerBtn').click(function() {
    $(this).fadeOut(500).fadeIn(500);
});