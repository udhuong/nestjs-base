interface EnumValue<ID = string | number> {
  getId(): ID;

  getLabel(): string;
}

abstract class EnumLike {
  static values<T extends EnumLike>(): T[] {
    return Object.values(this);
  }

  static getLabels<T extends EnumValue>(): string[] {
    return this.values<T>().map(value => value.getLabel());
  }

  static tryFrom<T extends EnumValue<ID>, ID = string | number>(id: ID): T | undefined {
    return this.values<T>().find(value => value.getId() === id);
  }

  static getIds<T extends EnumValue<ID>, ID = string | number>(): ID[] {
    return this.values<T>().map(value => value.getId());
  }
}

export abstract class EnumNumberLike extends EnumLike implements EnumValue<number> {
  private readonly id: number;
  private readonly label: string;

  protected constructor(id: number, label: string) {
    super();
    this.id = id;
    this.label = label;
  }

  getId(): number {
    return this.id;
  }

  getLabel(): string {
    return this.label;
  }
}

export abstract class EnumStringLike extends EnumLike implements EnumValue<string> {
  private readonly id: string;
  private readonly label: string;

  protected constructor(id: string, label: string) {
    super();
    this.id = id;
    this.label = label;
  }

  getId(): string {
    return this.id;
  }

  getLabel(): string {
    return this.label;
  }
}
