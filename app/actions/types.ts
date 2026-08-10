export interface User {
  id: number;
  name: string;
  username: string;
  mobile: string;
  nationalCode: string;
  type: number[];
  passwordIsChange: boolean;
  pharmacyId: number;
}

export interface Token {
  token: string;
  expireDate: string;
}

export interface UsersLoginResponse {
  user: User;
  accessToken: Token;
  refreshToken: Token;
}
