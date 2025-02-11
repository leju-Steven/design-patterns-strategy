import { Individual } from "./Individual";

export class ReverseMatchDecorator {
  reverseMatch( sortedPeople: Individual[]): Individual[] {
    return sortedPeople.reverse();
  }
}
