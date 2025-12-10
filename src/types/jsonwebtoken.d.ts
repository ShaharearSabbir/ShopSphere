declare global {
  namespace JsonWebToken {
    interface JwtPayload {
      id: string;
      email: string;
      role: "user" | "manager" | "admin";
    }
  }
}
