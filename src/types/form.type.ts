export interface FormData {
  id: string;
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: 'F' | 'M';
  isAgreed: boolean;
  picture: Base64URLString;
  country: string;
}
