import { User } from 'src/app/entities/user';

export class PlannedMatchday {
  index: number;
  matches: User[][];
  wildcardPlayer: User;
}
