interface LoginBody {
  email: string;
  password: string;
  fcmToken: string;
  deviceName: string;
  platform: number;
}

export interface LoginRes {
  statusCode: string;
  message: string;
  data: LoginResData;
}

interface LoginResData {
  accessToken: string;
  refreshToken: string;
  userDetails: UserLoginData;
}

export interface UserLoginData {
  id: number;
  firstName: string;
  lastName: string;
  profilePicture: string;
  profilePictureUrl: string;
  thumbnail_url: string;
  isOnboardingCompleted: boolean;
}

export interface LoginType {
  type: string;
  payload: LoginBody;
}

export interface LoginResType {
  type: string;
  payload: LoginRes;
}

export interface LoginErrType {
  type: string;
  payload: string;
}

export interface LogoutRes {
  statusCode: string;
  message: string;
}

export interface LogoutBody {
  fcmToken: string;
  deviceName: string;
  platform: number;
}

export interface LogoutType {
  type: string;
  payload: LogoutBody;
}
