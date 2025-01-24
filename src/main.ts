import { Individual } from "./class/Individual";
import { DistanceBaseMatchMakingStrategy } from "./class/DistanceBaseMatchMakingStrategy";
import { HabitBaseMatchMakingStrategy } from "./class/HabitBaseMatchMakingStrategy";

import { users } from "./users";

const user1 = new Individual(
  99,
  "male",
  18,
  "intro",
  ["swimming", "coding", "hiking", "gaming", "cooking"],
  [1, 2]
);

const matchMakingStrategy1 = new DistanceBaseMatchMakingStrategy();
const matchMakingStrategy2 = new HabitBaseMatchMakingStrategy();

const match1 = matchMakingStrategy1.match(user1, users);
const match2 = matchMakingStrategy2.match(user1, users);

console.log(match1, match2);
