import { MatchMakingStrategy } from "./MatchMakingStrategy";
import { Individual } from "./Individual";

export class MatchMakingSystem {
  constructor(private matchMakingStrategy: MatchMakingStrategy) {}

  match(user: Individual, matchedPeople: Individual[]): Individual[] {
    return this.matchMakingStrategy.match(user, matchedPeople);
  }
}
