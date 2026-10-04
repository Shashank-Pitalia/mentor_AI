import api from "./axios";

export const register = (data) =>
    api.post("/auth/register", data);

export const login = (data) =>
    api.post("/auth/login", data);

export const googleLogin = (token) =>
    api.post("/auth/google", { token });

export const getMe = () =>
    api.get("/auth/me");