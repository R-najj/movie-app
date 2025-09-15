export class ProductionCompany {
  constructor(
    public readonly id: number,
    public readonly logoPath: string | null,
    public readonly name: string,
    public readonly originCountry: string
  ) {}

  get hasLogo(): boolean {
    return this.logoPath !== null;
  }

  /**
   * convert to plain object for serialization (Next.js Client Component compatibility)
   */
  toJSON() {
    return {
      id: this.id,
      logoPath: this.logoPath,
      name: this.name,
      originCountry: this.originCountry,
      // include computed properties as plain values
      hasLogo: this.hasLogo,
    };
  }
}
