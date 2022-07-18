export class User {

    public id: number;
    public username: string;
    public password: string;
    public address: string;
    public token: string;
    public refreshToken: string;
    public name: string;
    public surname: string;
    public role: string;
    public phone: string;
    public email: string;


    constructor(data?: any) {
      if (data) {
        this.id = data.id;
        this.username = data.username;
        this.password = data.password;
        this.address = data.address;
        this.token = data.token;
        this.refreshToken = data.refreshToken;
        this.name = data.name;
        this.surname = data.surname;
        this.role = data.role;
        this.phone = data.phone;
        this.email = data.email;
      }
    }
  }