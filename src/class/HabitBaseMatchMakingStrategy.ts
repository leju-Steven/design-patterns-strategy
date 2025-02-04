import { MatchMakingStrategy } from "./MatchMakingStrategy";
import { ReverseMatchMakingStrategy } from "./ReverseMatchMakingStrategy";
import { Individual } from "./Individual";

export class HabitBaseMatchMakingStrategy
  implements MatchMakingStrategy, ReverseMatchMakingStrategy
{
  match(user: Individual, matchedPeople: Individual[]): Individual {
    const habitsArr = getHabitsArr(user, matchedPeople);

    return matchedPeople.find(
      (person) =>
        person.getId() === getMaxOrMinHabitIntersectionId(habitsArr, false)
    )!;
  }

  reverseMatch(user: Individual, matchedPeople: Individual[]): Individual {
    const habitsArr = getHabitsArr(user, matchedPeople);

    return matchedPeople.find(
      (person) =>
        person.getId() === getMaxOrMinHabitIntersectionId(habitsArr, true)
    )!;
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

const getMaxOrMinHabitIntersectionId = (
  habitsArr: { id: number; habitIntersectionCount: number }[],
  isReverse: boolean
) => {
  const getMaxOrMinBy = <T>(arr: T[], compareFn: (a: T, b: T) => boolean) => {
    return arr.reduce((acc, current) => {
      if (compareFn(current, acc)) {
        return current;
      }
      return acc;
    });
  };

  // 找出興趣交集最多/最少的對象
  const maxHabitIntersection = getMaxOrMinBy(
    habitsArr,
    (a, b) => a.habitIntersectionCount > b.habitIntersectionCount
  );
  const minHabitIntersection = getMaxOrMinBy(
    habitsArr,
    (a, b) => a.habitIntersectionCount < b.habitIntersectionCount
  );

  // 篩選出所有距離相同的對象
  const habitsIntersectionList = habitsArr.filter((person) =>
    // 如果是反向配對，則選擇興趣交集最少的對象
    isReverse
      ? person.habitIntersectionCount ===
        minHabitIntersection.habitIntersectionCount
      : person.habitIntersectionCount ===
        maxHabitIntersection.habitIntersectionCount
  );

  // 如果有多個對象，則選擇 ID 最小的
  const habitIntersectionId = getMaxOrMinBy(
    habitsIntersectionList,
    (a, b) => a.id < b.id
  ).id;

  return habitIntersectionId;
};
