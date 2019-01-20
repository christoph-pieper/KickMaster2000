module.exports = function(players) {
  // 2 Spieler --> 1 Spiel in der ersten Runde
  // 3 Spieler --> 2 Spiele in der ersten Runde (davon 1 Wildcard-Game)
  // 4 Spieler --> 2 Spiele in der ersten Runde
  // 5 Spieler --> 4 Spiele in der ersten Runde (davon 3 Wildcard-Games)
  // 6 Spieler --> 4 Spiele in der ersten Runde (davon 2 Wildcard-Games)
  // 7 Spieler --> 4 Spiele in der ersten Runde (davon 1 Wildcard-Game)
  // 8 Spieler --> 4 Spiele in der ersten Runde
  // 9 Spieler --> 8 Spiele in der ersten Runde (davon 7 Wildcard-Games)

  let countGames = Math.pow(2, Math.ceil(Math.log2(players.length))-1);
  let countWildcards = (countGames * 2 - players.length);
  let countNormalGames = countGames - countWildcards;

  let games = new Array(countGames).fill(undefined);
  games = games.map( (game) => {
    return new Array(2).fill(undefined);
  });

  let max = players.length - 1;

  let gamesFilled = false;

  let i = 0;
  while(max >= 0) {
    let r = Math.floor(Math.random() * (max + 1) );
    let player = players[r];
    if(Math.floor(i/2) >= countNormalGames) {
      gamesFilled = true;
    }

    games[Math.floor(i/2)][i % 2] = player;
    if(!gamesFilled) {
      i++;
    } else {
      i+=2;
    }
    //hier switchen

    players.push(players.splice(r,1)[0]);
    max--;
  }
  return games;

}
