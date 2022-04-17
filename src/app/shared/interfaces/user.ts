export interface User {
  id: string;
  email: string;
  name: string;
  lastName: string;
  phoneNumber: string;
  jwtToken: string;
  isProfileSet: boolean;
}