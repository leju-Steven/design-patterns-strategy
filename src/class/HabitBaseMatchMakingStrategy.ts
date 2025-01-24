import { MatchMakingStrategy } from "./MatchMakingStrategy";
import { Individual } from "./Individual";

export class HabitBaseMatchMakingStrategy implements MatchMakingStrategy {
  match(user: Individual, people: Individual[]): Individual {
    const habitArr = people.map((person) => {
      const habitIntersectionCount = person
        .getHabits()
        .filter((habit) => user.getHabits().includes(habit)).length;

      return { id: person.getId(), habitIntersectionCount };
    });

    return people.find(
      (person) => person.getId() === getMaxHabitIntersectionId(habitArr)
    )!;
  }
}

const dummy = [
  {
    id: 1,
    habitIntersectionCount: 2,
  },
  {
    id: 2,
    habitIntersectionCount: 3,
  },
  {
    id: 3,
    habitIntersectionCount: 5,
  },
  {
    id: 4,
    habitIntersectionCount: 3,
  },
];

const getMaxHabitIntersectionId = (
  habitArr: { id: number; habitIntersectionCount: number }[]
) => {
  const getMaxOrMinBy = <T>(arr: T[], compareFn: (a: T, b: T) => boolean) => {
    return arr.reduce((max, current) => {
      if (compareFn(current, max)) {
        return current;
      }
      return max;
    });
  };

  // 找出興趣交集最多的對象
  const maxHabitIntersection = getMaxOrMinBy(
    habitArr,
    (a, b) => a.habitIntersectionCount > b.habitIntersectionCount
  );

  // 篩選出所有距離相同的對象
  const maxHabitIntersectionArr = habitArr.filter(
    (person) =>
      person.habitIntersectionCount ===
      maxHabitIntersection.habitIntersectionCount
  );

  // 如果有多個對象，則選擇 ID 最小的
  const maxHabitIntersectionId = getMaxOrMinBy(
    maxHabitIntersectionArr,
    (a, b) => a.id < b.id
  ).id;

  return maxHabitIntersectionId;
};
