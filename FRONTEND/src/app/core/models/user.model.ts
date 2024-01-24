export class User {
  constructor(
    public id: number,
    public username: string,
    public email: string,
    public role: string,
    public password: string,
    public token: string,
    public nom: string,
    public prenom: string,
    public adresse: string,
    public codepostal: string,
    public ville: string,
    public sexe: string,
    public login: string,
    public telephone: string,
    public isAdmin : boolean
  ) {}
}
