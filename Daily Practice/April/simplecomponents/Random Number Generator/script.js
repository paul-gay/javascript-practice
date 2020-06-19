// gives number bt 0 - 0.9999999
// var n = Math.random();

// want to get random nubmer bt 1 and 6
// gives # bt 0 and 5.9999999, but never reaches 6
// n = n * 6;

// rounds down to nearest whole number
// need to add 1 since it will never reach 6
// n = Math.floor(n) + 1;

// refactored
// n = Math.floor(n * 6) + 1;

// console.log(n);


///////////////
//// LOVE CALCULATOR
///////////////

prompt('What is your name?');
prompt('what is their name?');

var loveScore = Math.random() * 100;
loveScore = Math.floor(loveScore) + 1;

if(loveScore > 75) {
    alert("Your love score it " + loveScore + "% " + "You are meant to be");
} else if (loveScore > 30 && loveScore <= 75) {
    alert("Your love score it " + loveScore + "% ");
} else {
    alert("Your love score it " + loveScore + "% " + "Probably not going to work");
}
 