import { MatchMakingStrategy } from "./MatchMakingStrategy";
import { Individual } from "./Individual";

export class HabitBaseMatchMakingStrategy implements MatchMakingStrategy {
  match(user: Individual, matchedPeople: Individual[]): Individual[] {
    const habitsArr = getHabitsArr(user, matchedPeople);

    const result = sortScoreArr(habitsArr).map((score) => {
      return matchedPeople.find((person) => person.getId() === score.id)!;
    });

    return result;
  }
}

const getHabitsArr = (
  user: Individual,
  matchedPeople: Individual[]
): {
  id: number;
  habitIntersectionCount: number;
}[] => {
  return matchedPeople.map((person) => {
    const habitIntersectionCount = person
      .getHabits()
      .filter((habit) => user.getHabits().includes(habit)).length;

    return { id: person.getId(), habitIntersectionCount };
  });
};

const sortScoreArr = (
  habitsArr: { id: number; habitIntersectionCount: number }[]
) => {
  return habitsArr.sort((a, b) => {
    // 如果興趣交集數相同，則先排比較小的 ID
    if (a.habitIntersectionCount === b.habitIntersectionCount) {
      return a.id - b.id;
    }

    return b.habitIntersectionCount - a.habitIntersectionCount;
  });
};
