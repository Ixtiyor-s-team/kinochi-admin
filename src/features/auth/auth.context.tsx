import React, { createContext, useContext } from "react";
import Cookies from "js-cookie";
import Dotenv from "../../lib/dotenv";
import { useQueryClient } from "@tanstack/react-query";
import type { AdminUser, PostApiV1AdminAuthLoginBody } from "../../api/model";
import {
  getGetApiV1AdminAuthMeQueryKey,
  useGetApiV1AdminAuthMe,
  usePostApiV1AdminAuthLogin,
} from "../../api/generated";
import { appNotification } from "../../lib/app-notification";

interface AuthContextType {
  loading: boolean;
  mutationPending: boolean;
  logout: () => Promise<void>;
  login: (data: LoginForm) => void;
  user: AdminUser | undefined;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
type LoginForm = PostApiV1AdminAuthLoginBody & { remember: boolean };

interface AuthProviderProps {
  children: React.ReactNode;
}
const isProd = Dotenv.NODE_ENV === "production";
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = usePostApiV1AdminAuthLogin();
  const { data, isLoading } = useGetApiV1AdminAuthMe(undefined);

  const login = (data: LoginForm) => {
    mutate(
      { data: data },
      {
        onSuccess: (res) => {
          const userData = res.data?.admin;
          const token = res.data?.token;

          Cookies.set("auth_token", token!, {
            ...(data.remember && {
              expires: 1,
            }),
            path: "/",
            secure: isProd,
            sameSite: "lax",
          });

          if (userData) {
            localStorage.setItem("user", JSON.stringify(userData));
          }
          queryClient.invalidateQueries({
            queryKey: getGetApiV1AdminAuthMeQueryKey(),
          });
          appNotification.success("Hisobga kirdingiz!");
        },
        onError: (error: any) => {
          const msg = error.response.data.message;
          appNotification.error(msg);
        },
      },
    );
  };
  const logout = async () => {
    Cookies.remove("auth_token", { path: "/" });
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider
      value={{
        loading: isLoading,
        logout,
        login,
        user: data?.data,
        mutationPending: isPending,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
