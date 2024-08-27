export class UserId {
    value: string;

    constructor(value: string) {
        this.value = value;
        this.ensureIsValidId();
    }

    private ensureIsValidId(): void {
        if (this.value.length < 5) {
            throw new Error(`Invalid ID: ${this.value}. Less than 5 characters.`);
        }
    }
}