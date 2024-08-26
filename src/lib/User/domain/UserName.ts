export class UserName {
    value: string;

    constructor(value: string) {
        this.value = value;
        this.ensureIsValidName();
    }

    private ensureIsValidName(): void {
        if (this.value.length < 5) {
            throw new Error(`Invalid name: ${this.value}. Less than 5 characters.`);
        }
    }
}