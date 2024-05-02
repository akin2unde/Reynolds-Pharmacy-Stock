import { EncryptStorage } from 'storage-encryption';
interface IStorage {
  encrypt(key: string, value: any): void;
  decrypt(key: string): any;
  remove(key: string): void;
}
export const AppName="Device Management";
export enum AppKey {
  USER = 'USER',
}

export default class Store {
  private readonly storage: IStorage;
  private SECRET_KEY = '</devmgtintruder003';
  public constructor(

    getStorage = (): IStorage =>
       new EncryptStorage(this.SECRET_KEY,'sessionStorage'
        // 'localStorage'
       )
  ) {
    this.storage = getStorage();
  }

  public get(key: string): any | null {
    const data = this.storage.decrypt(key);
    return data;
  }

  public set(key: string, value: any): void {
    this.storage.encrypt(key, value);
  }

  public clearItem(key: string): void {
    this.storage.remove(key);
  }
  public clearAll(exclude: string[]=[]): void {
    // exclude.push(AppKey.BASE_URL);
    Object.keys(AppKey).forEach((k) => {
      if(!exclude.find(f=>f==k)) {
        this.clearItem(k);
      }
    });
  }

  public clearItems(keys: string[]): void {
    keys.forEach((key) => this.clearItem(key));
  }
}
