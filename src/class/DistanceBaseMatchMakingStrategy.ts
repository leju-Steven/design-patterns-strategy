import { MatchMakingStrategy } from "./MatchMakingStrategy";
import { Individual } from "./Individual";

export class DistanceBaseMatchMakingStrategy implements MatchMakingStrategy {
  match(user: Individual, matchedPeople: Individual[]): Individual[] {
    const distanceScore = getDistanceScoreArr(user, matchedPeople);

    const result = sortScoreArr(distanceScore).map((score) => {
      return matchedPeople.find((person) => person.getId() === score.id)!;
    });

    return result;
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

const sortScoreArr = (scoreArr: { id: number; distance: number }[]) => {
  return scoreArr.sort((a, b) => {
    // 如果距離相同，則先排比較小的 ID
    if (a.distance === b.distance) {
      return a.id - b.id;
    }

    return a.distance - b.distance;
  });
};
