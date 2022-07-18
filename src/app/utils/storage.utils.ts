import {User} from '@models/user.model';

interface Token {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

export class StorageUtils {

  private static readonly USER = 'USER';

  private constructor() {}

  public static setUser(user: User): void {
    localStorage.setItem(StorageUtils.USER, JSON.stringify(user));
  }

  public static getUser(): User {
    const userJson = localStorage.getItem(StorageUtils.USER);
    return userJson ? new User(JSON.parse(userJson)) : null;
  }

  public static removeUser(): void {
    localStorage.removeItem(StorageUtils.USER);
  }
}
