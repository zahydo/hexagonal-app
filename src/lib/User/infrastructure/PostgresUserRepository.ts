import { Pool } from "pg";
import { User } from "../domain/User";
import { UserId } from "../domain/UserId";
import { UserRepository } from "../domain/UserRepository";
import { UserEmail } from "../domain/UserEmail";
import { UserCreatedAt } from "../domain/UserCreatedAt";
import { UserName } from "../domain/UserName";

type PostgresUser = {
    id: string;
    name: string;
    email: string;
    created_at: Date;
}

export class PostgresRepository implements UserRepository {
    client: Pool;

    constructor(databaseUrl: string) {
        this.client = new Pool({
            connectionString: databaseUrl
        });
    }

    async create(user: User): Promise<void> {
        const query = {
            text: 'INSERT INTO users(id, name, email) VALUES($1, $2, $3)',
            values: [user.id.value, user.name.value, user.email.value]
        };
        await this.client.query(query);
    }
    async update(user: User): Promise<void> {
        const query = {
            text: 'UPDATE users SET name = $2, email = $3 WHERE id = $1',
            values: [user.id.value, user.name.value, user.email.value]
        };
        await this.client.query(query);
    }
    async delete(id: UserId): Promise<void> {
        const query = {
            text: 'DELETE FROM users WHERE id = $1',
            values: [id.value]
        }
        await this.client.query(query);
    }
    async getOneById(id: UserId): Promise<User | null> {
        const query = {
            text: 'SELECT * FROM users WHERE id = $1',
            values: [id.value]
        }
        const result = await this.client.query<PostgresUser>(query);
        if (result.rows.length === 0) {
            return null;
        }
        const row = result.rows[0];
        return this.mapToDomain(row);
    }
    async getAll(): Promise<User[]> {
        const query = {
            text: 'SELECT * FROM users',
        }
        const result = await this.client.query<PostgresUser>(query);

        return result.rows.map(row => this.mapToDomain(row));
    }
    private mapToDomain(user: PostgresUser): User {
        return new User(
            new UserId(user.id),
            new UserName(user.name),
            new UserEmail(user.email),
            new UserCreatedAt(user.created_at)
        );
    }
}