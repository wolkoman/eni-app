export interface Credentials {
  api_key: string;
  email: string;
  group: string;
}
export interface AuthState {
  userdata?: Credentials;
}
