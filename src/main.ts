import { MatchMakingSystem } from "./class/MatchMakingSystem";
import { Individual } from "./class/Individual";
import { DistanceBaseMatchMakingStrategy } from "./class/DistanceBaseMatchMakingStrategy";
import { HabitBaseMatchMakingStrategy } from "./class/HabitBaseMatchMakingStrategy";
import { ReverseMatchMakingStrategy } from "./class/ReverseMatchMakingStrategy";

import { users } from "./users";
import { ReverseMatchRecorator } from "./class/ReverseMatchDecorate";

const user1 = new Individual(
  99,
  "male",
  18,
  "intro",
  ["swimming", "coding", "hiking", "gaming", "cooking"],
  [1, 2]
);

const matchMakingStrategy1 = new MatchMakingSystem(
  new ReverseMatchRecorator(new HabitBaseMatchMakingStrategy())
);

const match1 = matchMakingStrategy1.match(user1, users);

console.log(match1);
console.log("all users:", users);
