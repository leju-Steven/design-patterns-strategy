import { MatchMakingStrategy } from "./MatchMakingStrategy";
import { Individual } from "./Individual";

export class DistanceBaseMatchMakingStrategy implements MatchMakingStrategy {
  match(user: Individual, matchedPeople: Individual[]): Individual {
    const distanceScore = getDistanceScoreArr(user, matchedPeople);
    const minDistanceId = getMinOrMaxDistanceId(distanceScore, false);

    return matchedPeople.find((person) => person.getId() === minDistanceId)!;
  }

  reverseMatch(user: Individual, matchedPeople: Individual[]): Individual {
    const distanceScore = getDistanceScoreArr(user, matchedPeople);
    const maxDistanceId = getMinOrMaxDistanceId(distanceScore, true);

    return matchedPeople.find((person) => person.getId() === maxDistanceId)!;
  }
}

const getDistanceScoreArr = (user: Individual, matchedPeople: Individual[]) => {
  return matchedPeople.map((person) => {
    if (user.getCoord().length !== 2 || person.getCoord().length !== 2) {
      throw new Error("Invalid coord"); // 判斷是否有兩個座標
    }

    const [x1, y1] = user.getCoord();
    const [x2, y2] = person.getCoord();

    return {
      id: person.getId(),
      distance: Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2),
    };
  });
};

const getMinOrMaxDistanceId = (
  distanceScoreArr: { id: number; distance: number }[],
  isReverse = false
) => {
  const getMinOrMaxBy = <T>(arr: T[], compareFn: (a: T, b: T) => boolean) => {
    return arr.reduce((acc, current) => {
      if (compareFn(current, acc)) {
        return current;
      }
      return acc;
    });
  };

  // 找出距離最遠/近的對象
  const minDistance = getMinOrMaxBy(
    distanceScoreArr,
    (a, b) => a.distance < b.distance
  );
  const maxDistance = getMinOrMaxBy(
    distanceScoreArr,
    (a, b) => a.distance > b.distance
  );

  // 篩選出所有距離相同的對象
  const minOrMaxDistanceScoreArr = distanceScoreArr.filter((person) =>
    isReverse
      ? person.distance === maxDistance.distance
      : person.distance === minDistance.distance
  );

  // 如果有多個對象，則選擇 ID 最小的
  const targetDistanceId = getMinOrMaxBy(
    minOrMaxDistanceScoreArr,
    (a, b) => a.id < b.id
  ).id;

  return targetDistanceId;
};
