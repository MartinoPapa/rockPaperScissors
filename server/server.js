const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;

var players = [];
var reses = [];
app.use(bodyParser.urlencoded({ extended: true })); 

app.post('/rockPaperScissors', (req, res) => {
  if(players.indexOf(req.body.name) == -1){
    players.push([req.body.name, req.body.scelta]);
    reses.push(res);

    if(players.length>=2){
      whoWon();
      players = [];
      reses = [];
    }
    
  }
  else{
    res.end("this player name is alredy taken");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

function whoWon (){
  if(players[0][1] == players[1][1]){
    reses[0].send("It's a draw, also "+ players[1][0] +" have played "+ players[0][1]);
    reses[1].send("It's a draw, also "+ players[0][0] +" have played "+ players[0][1]);
  }
  else{
    if(players[0][1]=="rock"){
      if(players[1][1]=="paper"){
        reses[1].send("You won angainst "+players[0][0]);
        reses[0].send("You lose angainst "+players[1][0]);
      }
      else{
        reses[1].send("You lose angainst "+players[0][0]);
        reses[0].send("You won angainst "+players[1][0]);
      }
    }
    else{
      if(players[0][1]=="paper"){
        if(players[1][1]=="scissors"){
          reses[1].send("You won angainst "+players[0][0]);
          reses[0].send("You lose angainst "+players[1][0]);
        }
        else{
          reses[1].send("You lose angainst "+players[0][0]);
          reses[0].send("You won angainst "+players[1][0]);
        }
      }
      else{
        if(players[0][1]=="scissors"){
          if(players[1][1]=="rock"){
            reses[1].send("You won angainst "+players[0][0]);
            reses[0].send("You lose angainst "+players[1][0]);
          }
          else{
            reses[1].send("You lose angainst "+players[0][0]);
            reses[0].send("You won angainst "+players[1][0]);
          }
        }
      }
    }
  }
}