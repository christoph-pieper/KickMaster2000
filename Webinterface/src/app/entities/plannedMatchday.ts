import { User } from './user';

export class PlannedMatchday {
  index: number;
  matches: User[][];
  wildcardPlayer: User;
}
