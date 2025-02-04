import { ReverseMatchMakingStrategy } from "./ReverseMatchMakingStrategy";
import { Individual } from "./Individual";
import { MatchMakingStrategy } from "./MatchMakingStrategy";

export class ReverseMatchRecorator implements MatchMakingStrategy {
  constructor(private matchMakingStrategy: ReverseMatchMakingStrategy) {}

  match(user: Individual, matchedPeople: Individual[]): Individual {
    return this.matchMakingStrategy.reverseMatch(user, matchedPeople);
  }
}