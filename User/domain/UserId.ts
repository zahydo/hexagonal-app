export class UserId {
    value: string;

    constructor(value: string) {
        this.value = value;
        this.ensureIsValidUuid();
    }

    private ensureIsValidUuid(): void {
        if (this.value.length < 5) {
            throw new Error(`Invalid ID: ${this.value}. Less than 5 characters.`);
        }
    }
}