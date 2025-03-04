import { jwtDecode, JwtPayload } from "jwt-decode";

// Define a custom type that extends JwtPayload
interface CustomJwtPayload extends JwtPayload {
  sessionId: string;
  id: string;
  mobileNumber: string;
  role: "admin" | "agent" | "user";
}
export const decodedToken = (token: string): CustomJwtPayload => {
  return jwtDecode<CustomJwtPayload>(token); // Use the custom type
};

// export const decodedToken = (token: string) => {
//   return jwtDecode(token);
// };
