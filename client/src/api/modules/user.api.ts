/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from "axios";
import privateClient from "../client/private.client";
import publicClient from "../client/public.client";

const userEndpoints = {
  signin: "auth/signin",
  signup: "auth/signup",
  getInfo: "auth/get-info",
  passwordUpdate: "auth/update-password",
};

interface SigninData {
  email: string;
  password: string;
}

interface SignupData {
  email: string;
  password: string;
  confirmPassword: string;
  displayName: string;
}

interface PasswordUpdateData {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
}

interface ApiResponse<T> {
  response?: AxiosResponse<T>;
  err?: {
    message: string;
    status?: string;
  };
}

interface UserInfo {
  id: string;
  email: string;
  displayName: string;
}

interface SigninResponse {
  token: string;
  status: string;
  message: string;
  data: UserInfo;
}

interface SignupResponse {
  token: string;
  status: string;
  message: string;
  data: UserInfo;
}

interface PasswordUpdateResponse {
  message: string;
  status: string;
}

interface GetInfoResponse {
  status: string;
  data: UserInfo;
}

const userApi = {
  signin: async ({
    email,
    password,
  }: SigninData): Promise<ApiResponse<SigninResponse>> => {
    try {
      const response = await publicClient.post<SigninResponse>(
        userEndpoints.signin,
        {
          email,
          password,
        }
      );
      return { response };
    } catch (err: any) {
      console.error(err);
      return {
        err: {
          message: err.message || "Something went wrong",
          status: err.status,
        },
      };
    }
  },

  signup: async ({
    email,
    password,
    confirmPassword,
    displayName,
  }: SignupData): Promise<ApiResponse<SignupResponse>> => {
    try {
      const response = await publicClient.post<SignupResponse>(
        userEndpoints.signup,
        {
          email,
          password,
          confirmPassword,
          displayName,
        }
      );
      return { response };
    } catch (err: any) {
      console.error(err);
      return {
        err: {
          message: err.message || "Something went wrong",
          status: err.status,
        },
      };
    }
  },

  getInfo: async (): Promise<ApiResponse<GetInfoResponse>> => {
    try {
      const response = await privateClient.get<GetInfoResponse>(
        userEndpoints.getInfo
      );
      return { response };
    } catch (err: any) {
      return {
        err: {
          message: err.message || "Something went wrong",
          status: err.status,
        },
      };
    }
  },

  passwordUpdate: async ({
    password,
    newPassword,
    confirmNewPassword,
  }: PasswordUpdateData): Promise<ApiResponse<PasswordUpdateResponse>> => {
    try {
      const response = await privateClient.put<PasswordUpdateResponse>(
        userEndpoints.passwordUpdate,
        {
          password,
          newPassword,
          confirmNewPassword,
        }
      );
      return { response };
    } catch (err: any) {
      return {
        err: {
          message: err.message || "Something went wrong",
          status: err.status,
        },
      };
    }
  },
};

export default userApi;
