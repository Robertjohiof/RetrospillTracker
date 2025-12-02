export interface SignUpPayload {
  firstName: string;
  lastName: string;
  userName: string;
  passWord: string;
  email: string;
  biography: string;
  role: string;
  profilePic: File | null;
  banner: File | null;
}
