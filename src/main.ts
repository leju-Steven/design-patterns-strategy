import { MatchMakingSystem } from "./class/MatchMakingSystem";
import { Individual } from "./class/Individual";
import { DistanceBaseMatchMakingStrategy } from "./class/DistanceBaseMatchMakingStrategy";
import { HabitBaseMatchMakingStrategy } from "./class/HabitBaseMatchMakingStrategy";
import { ReverseMatchDecorator } from "./class/ReverseMatchDecorate";

import { users } from "./users";

const currentUser = new Individual(
  99,
  "male",
  18,
  "intro",
  ["swimming", "coding", "hiking", "gaming", "cooking"],
  [1, 2]
);

const reverseMatchDecorator = new ReverseMatchDecorator();

// 距離匹配
const matchMakingStrategy1 = new MatchMakingSystem(
  new DistanceBaseMatchMakingStrategy()
);

// 興趣匹配
const matchMakingStrategy2 = new MatchMakingSystem(
  new HabitBaseMatchMakingStrategy()
);

const match1 = matchMakingStrategy1.match(currentUser, users)[0];
const match2 = matchMakingStrategy2.match(currentUser, users)[0];
const match3 = reverseMatchDecorator.reverseMatch(matchMakingStrategy1.match(currentUser, users))[0];
const match4 = reverseMatchDecorator.reverseMatch(matchMakingStrategy2.match(currentUser, users))[0];

console.log('距離匹配(最近)',match1);
console.log('興趣匹配(最多)',match2);
console.log('距離匹配(最遠)',match3);
console.log('興趣匹配(最少)',match4);
