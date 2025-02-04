import { Individual } from "./Individual";

export interface ReverseMatchMakingStrategy {
  reverseMatch(user: Individual, people: Individual[]): Individual;
}
