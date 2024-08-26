export class UserEmail {
    value: string;

    constructor(value: string) {
        this.value = value;
        this.ensureIsValidEmail();
    }

    private ensureIsValidEmail(): void {
        // validates email with regex
        if (!this.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            throw new Error(`Invalid email: ${this.value}.`);
        }
    }
}