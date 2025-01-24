import { Individual } from "./class/Individual";

function generateRandomUsers(): Individual[] {
  const genders = ["male", "female"];
  const habitsList = [
    "reading",
    "swimming",
    "coding",
    "hiking",
    "gaming",
    "cooking",
    "traveling",
    "dancing",
    "singing",
    "painting",
  ];

  const getRandomElement = (arr: string[]) =>
    arr[Math.floor(Math.random() * arr.length)];
  const getRandomNumber = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const getRandomHabitsList = () => {
    const habitsNum = getRandomNumber(1, habitsList.length);

    const randomHabitsList = new Set<string>();
    while (randomHabitsList.size < habitsNum) {
      randomHabitsList.add(getRandomElement(habitsList));
    }

    return Array.from(randomHabitsList);
  };

  const users: Individual[] = [];
  for (let i = 1; i <= 10; i++) {
    const id = i;
    const gender = getRandomElement(genders);
    const age = getRandomNumber(18, 60);
    const intro = "This is a random intro.";
    const habits = getRandomHabitsList();
    const coord = [getRandomNumber(0, 90), getRandomNumber(0, 180)];

    users.push(new Individual(id, gender, age, intro, habits, coord));
  }

  return users;
}

const users = generateRandomUsers();

export { users };
