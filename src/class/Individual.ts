export class Individual {
  private id: number; // >0
  private gender: string; // 'male' or 'female'
  private age: number; // >= 18
  private intro: string; // <= 200
  private habits: string[]; // per habit: 1<= ; <=20
  private coord: number[]; // [latitude, longitude] latitude >= 0, longitude >= 0

  constructor(
    id: number,
    gender: string,
    age: number,
    intro: string,
    habits: string[],
    coord: number[]
  ) {
    if (id <= 0) throw new Error("ID must be greater than 0");
    if (gender !== "male" && gender !== "female")
      throw new Error("Gender must be 'male' or 'female'");
    if (age < 18) throw new Error("Age must be at least 18");
    if (intro.length > 200)
      throw new Error("Intro must be 200 characters or less");
    if (
      habits.some(
        (habit) => habit.trim().length < 1 || habit.trim().length > 20
      )
    )
      throw new Error("Each habit must be between 1 and 20 characters");
    if (coord.length !== 2)
      throw new Error("Coord must be an array of [latitude, longitude]");
    if (coord.some((item) => item < 0))
      throw new Error("Coord must be at least 0");

    this.id = id;
    this.gender = gender;
    this.age = age;
    this.intro = intro;
    this.habits = habits;
    this.coord = coord;
  }

  public getId(): number {
    return this.id;
  }

  public getGender(): string {
    return this.gender;
  }

  public getAge(): number {
    return this.age;
  }

  public getIntro(): string {
    return this.intro;
  }

  public getHabits(): string[] {
    return this.habits;
  }

  public getCoord(): number[] {
    return this.coord;
  }
}
