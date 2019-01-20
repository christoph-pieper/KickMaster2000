const express = require('express'),
  router = express.Router(),
  HttpStatus = require('http-status-codes'),
  connection = require('../database/db'),
  HashMap = require('hashmap');;

router.get('/', function(req, res) {
  let sql = 'select * from users';
  connection.query(sql, (err, users, fields) => {
    if (err || !users) {
      console.log(err);
      res.sendStatus(HttpStatus.NOT_FOUND);
    } else {
      const usersMap = new HashMap();
      for( let user of users ){
        user.goals = 0;
        user.goalsConceded = 0;
        user.wins = 0;
        user.ties = 0;
        user.losses = 0;
        usersMap.set(user._id, user);
      }
      let sql2 = 'select b._id as home_id, c._id as away_id, a.player_home_goals_total, a.player_home_goals_halftime, a.player_away_goals_total, a.player_away_goals_halftime \
      from matches_table a join users b on a.player_home = b._id join users c on a.player_away = c._id';
      connection.query(sql2, (err, matches, fields) => {
        if (err) {
          console.log(err);
          res.sendStatus(HttpStatus.NOT_FOUND);
        } else if( !matches) {
          res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }else {
          for(let match of matches) {
            let homePlayer = usersMap.get(match.home_id);
            let awayPlayer = usersMap.get(match.away_id);

            homePlayer.goals += match.player_home_goals_total;
            homePlayer.goalsConceded += match.player_away_goals_total;
            awayPlayer.goals += match.player_away_goals_total;
            awayPlayer.goalsConceded += match.player_home_goals_total;

            if(match.player_home_goals_total > match.player_away_goals_total) {
              // Heim gewinnt
              homePlayer.wins += 1;
              awayPlayer.losses += 1;
            } else if (match.player_home_goals_total < match.player_away_goals_total) {
              // Auswärts gewinnt
              homePlayer.losses += 1;
              awayPlayer.wins += 1;
            } else {
              homePlayer.ties += 1;
              awayPlayer.ties += 1;
            }
          }

          let users = usersMap.values();
          users.map( user => {
            return calcPlayer(user);
          });

          res.json(sortPlayers(users));
        }
      });
    }
  });
});

router.get('/matches', function(req, res) {
  let sql = 'select b._id as home_id, b.name as home_name, c._id as away_id, c.name as away_name, a._id, a.match_day, a.player_home_goals_total, a.player_home_goals_halftime, a.player_away_goals_total, a.player_away_goals_halftime \
  from matches_table a join users b on a.player_home = b._id join users c on a.player_away = c._id \
  order by a.match_day desc';
  connection.query(sql, (err, matches, fields) => {
    if (err || !matches) {
      console.log(err);
      res.sendStatus(HttpStatus.NOT_FOUND);
    } else {
      matches.forEach((match) => {
        match.player_home = {};
        match.player_home._id = match.home_id;
        delete match.home_id;
        match.player_home.name = match.home_name;
        delete match.home_name;

        match.player_away = {};
        match.player_away._id = match.away_id;
        delete match.away_id;
        match.player_away.name = match.away_name;
        delete match.away_name;
      })

      res.json(matches);
    }
  });
});

function calcPlayer(player) {
  player.matchesPlayed = player.wins + player.losses + player.ties;
  player.goalDiff = player.goals - player.goalsConceded;
  player.points = player.wins * 3 + player.ties;
  return player;
}

function sortPlayers(users) {
  return users.sort( (a, b) => {
    if(a.points != b.points) {
      return b.points - a.points;
    }
    if( a.goalDiff != b.goalDiff ) {
      return b.goalDiff - a.goalDiff;
    }
    console.log('default sorting, not implemented')
    return -1;
  });
}


module.exports = router;
