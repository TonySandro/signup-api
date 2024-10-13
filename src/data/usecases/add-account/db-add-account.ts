import { Encrypter } from "./../../protocols/encrypter";
import { AccountModel } from "../../../domain/models/account";
import {
  AddAccount,
  AddAccountModel,
} from "../../../domain/usecases/add-account";

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter;

  constructor(encrypter: Encrypter) {
    this.encrypter = encrypter;
  }
  add(account: AddAccountModel): Promise<AccountModel> {
    this.encrypter.encrypt(account.password);
    return new Promise((resolve) => resolve(null));
  }
}
