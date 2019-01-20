module.exports = function(players) {
  let unevenPlayerCount = false;
  if(players.length % 2 != 0 ) {
    unevenPlayerCount = true;
    players.push(null);
  }

  let matchesPerDay = Math.floor(players.length / 2);

  let matchdays = [];

  let player1 = players.shift();

  // 1 ist special team
  // 2 ist erster gegner

  /*
      sp----- 0
            /   \
          4 ---- 1
          |      |
          3 ---- 2
  */

  let player1home = true;

  for(let i = 0; i < players.length; i++) {
    const matchday = {
      index: (i + 1),
      matches: []
    };

    let match1 = new Array(2);
    match1[player1home ? 0 : 1] = player1;
    match1[player1home ? 1 : 0] = players[0];
    matchday.matches.push(match1);

    // other matches

    let matchups = players.slice(1, players.length);
    let j;
    for( j = 0; j < matchesPerDay - 1; j++ ) {
      let match = new Array(2);
      match[ j % 2 ] = matchups[j];
      match[ 1 - (j % 2)] = matchups[matchups.length-j-1];
      //hier drüber weitermachen
      matchday.matches.push(match);
    }

    matchdays.push(matchday);

    // shift clockwise
    players.unshift(players.pop());
    player1home = !player1home;
  }


  let matchdayCount = matchdays.length;
  for(let i = 0; i < matchdayCount; i++) {
    const matchday = {
      index: (matchdayCount + i + 1),
      matches: []
    };
    for(let game of matchdays[i].matches) {
      let newMatch = new Array(2);
      newMatch[0] = game[1];
      newMatch[1] = game[0];
      matchday.matches.push(newMatch);
    }
    matchdays.push(matchday);
  }

  if( unevenPlayerCount ) {
    matchdays.forEach((matchday) => {
      let wildcardIndex = matchday.matches.findIndex( (match) => {
        return match[0] == null || match[1] == null;
      });
      let wildcardMatch = matchday.matches.splice(wildcardIndex, 1)[0];
      matchday.wildcardPlayer = (wildcardMatch[0] == null ? wildcardMatch[1] : wildcardMatch[0]);
    });
  }
  return matchdays;
}
