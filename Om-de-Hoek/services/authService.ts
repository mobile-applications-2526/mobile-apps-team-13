import { AuthResponse, LoginBody, RegisterRequestBody } from "@/types/auth";
import { fetchData } from "./requestService";

const authRegister = async (data: RegisterRequestBody) : Promise<void> => {
  await fetchData("auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

const authLogin = async (data: LoginBody): Promise<AuthResponse> => {
  const response = await fetchData("auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response as AuthResponse;
};

const refreshToken = async (token: string) : Promise<AuthResponse> => {
  const response = await fetchData("auth/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken: token }),
  });
  return response as AuthResponse;
};

const logout = async (refreshToken: string): Promise<void> => {
  try {
    await fetchData("auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });
    return;
  } catch (error) {
    console.error("Error during logout:", error);
    return;
  }
};

export default {
  authRegister,
  authLogin,
  refreshToken,
  logout,
};
