export class Createuser {

    public id: number;
    public name: string;
    public surname: string;
    public email: string;
    public username: string;
    public password: string;
    public address: string;
    public phone: string;
    public role: string;
    public status: string;

    constructor(data?: any) {
      if (data) {
        this.id = data.id;
        this.name = data.name;
        this.surname = data.surname;
        this.email = data.email;
        this.username = data.username;
        this.password = data.password;
        this.address = data.address;
        this.phone = data.phone;
        this.role = data.role;
        this.status = data.status;
      }
    }
  }