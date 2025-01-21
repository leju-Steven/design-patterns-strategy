import { MatchMakingStrategy } from "./MatchMakingStrategy";
import { Individual } from "./Individual";

export class DistanceBaseMatchMakingStrategy implements MatchMakingStrategy {
  match(user: Individual, people: Individual[]): Individual {
    const distanceScore = people.map((person) => {
      if (user.getCoord().length !== 2 || person.getCoord().length !== 2) {
        throw new Error("Invalid coord");
      }

      const [x1, y1] = user.getCoord();
      const [x2, y2] = person.getCoord();

      return {
        id: person.getId(),
        distance: Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2),
      };
    });

    const minDistanceId = getMinDistanceId(distanceScore);

    return people.find((person) => person.getId() === minDistanceId)!;
  }
}

const getMinDistanceId = (distanceArr: { id: number; distance: number }[]) => {
  const getMinBy = <T>(arr: T[], compareFn: (a: T, b: T) => boolean) => {
    return arr.reduce((min, current) => {
      if (compareFn(current, min)) {
        return current;
      }
      return min;
    });
  };

  // 找出距離最小的對象
  const minDistance = getMinBy(distanceArr, (a, b) => a.distance < b.distance);

  // 篩選出所有距離相同的對象
  const minDistanceArr = distanceArr.filter(
    (person) => person.distance === minDistance.distance
  );

  // 如果有多個對象，則選擇 ID 最小的
  const minDistanceId = getMinBy(minDistanceArr, (a, b) => a.id < b.id).id;

  return minDistanceId;
};
