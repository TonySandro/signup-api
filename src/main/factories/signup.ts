import { AddAccountRepository } from "./../../data/protocols/add-account-repository";
import { EmailValidator } from "./../../presentation/protocols/email-validator";
import { SignUpController } from "../../presentation/controllers/signup/signup";
import { EmailValidatorAdapter } from "../../utils/email-validator-adapter";
import { DbAddAccount } from "../../data/usecases/add-account/db-add-account";
import { BcryptAdapter } from "../../infra/criptography/bcrypt-adapter";
import { AccountMongoRepository } from "../../infra/db/mongodb/account-repository/account-mongo-repository";

export const makeSignUpController = (): SignUpController => {
  const addAccountRepository = new AccountMongoRepository();
  const bcryptAdapter = new BcryptAdapter(12);
  const addAccount = new DbAddAccount(bcryptAdapter, addAccountRepository);
  const emailValidatorAdapter = new EmailValidatorAdapter();

  const signUpController = new SignUpController(
    emailValidatorAdapter,
    addAccount
  );

  return signUpController;
};
