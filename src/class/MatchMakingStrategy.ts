import { Individual } from "./Individual";

export interface MatchMakingStrategy {
  match(user: Individual, people: Individual[]): Individual;
  reverseMatch(user: Individual, people: Individual[]): Individual;
}
