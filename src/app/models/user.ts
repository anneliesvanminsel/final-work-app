
export class User {
    email: string;
    name: string;
    first_name: string;
    roles: [any];
    user_id: string;

    constructor(name: string, first_name: string, email: string, role: string, user_id: string) {
        this.email = email;
        this.name = name;
        this.first_name = first_name;
        this.roles.push(role);
        this.user_id = user_id
    }
}
