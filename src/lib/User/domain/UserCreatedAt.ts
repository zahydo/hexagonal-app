export class UserCreatedAt {
    value: Date;

    constructor(value: Date) {
        this.value = value;
        this.ensureIsValidDate();
    }

    private ensureIsValidDate(): void {
        if (this.value > new Date()) {
            throw new Error(`Invalid date: ${this.value}. Date is in the future.`);
        }
    }
}