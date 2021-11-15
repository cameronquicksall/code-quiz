function displayHighScores() {
    var highScores = JSON.parse(localStorage.getItem("highscores"));
    if(highScores !=null){
        highScores.sort(function(a, b){
            return parseInt(b.score) - parseInt(a.score);
        });
        for(var i = 0 < highScores.length; i++;){
            var scoreLi = document.createElement("li");
            scoreLi.textContent = highScores[i].initials + " - " + highScores[i].score;
            document.getElementById("highscores").appendChild(scoreLi);
        }
    } else {
        var temp = document.getElementById("highscores");
        temp.textContent = "Take the quiz to see your score";
    }
}
function clearHighscores() {
    localStorage.removeItem("highscores");
    location.reload();
}
var clearButton = document.getElementById("clear");
    clearButton.addEventListener("click", function(){
        clearHighscores();
    })
    displayHighScores();