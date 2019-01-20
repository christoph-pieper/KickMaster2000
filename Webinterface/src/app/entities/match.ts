import { User } from './user';

export class Match {
  _id?: number;
  player_home?: User;
  player_away?: User;
  player_home_goals_total?: number;
  player_home_goals_halftime?: number;
  player_away_goals_total?: number;
  player_away_goals_halftime?: number;
}
