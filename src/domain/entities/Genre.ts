export class Genre {
  constructor(public readonly id: number, public readonly name: string) {}

  /**
   * convert to plain object for serialization (Next.js Client Component compatibility)
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
    };
  }
}
