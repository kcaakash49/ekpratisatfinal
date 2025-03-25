import { signinservice } from "@/services/signinservice";
import { SignInResponse } from "@/types/signin-response";
import { Role } from "@prisma/client"; // Import the Role enum

export async function signinaction(mobile: string, password: string): Promise<SignInResponse> {
  const response = await signinservice(mobile, password);

  if (response.error) {
    return { error: response.error || "Unknown error" }; // Default to "Unknown error" if no error message
  }

  // Ensure that user and isAdmin have default values
  const user = response.user || {
    id: 0,
    fullname: "",
    mobile: "",
    email: "",
    role: Role.USER, // Default role as USER
  };

  // Correct way to check if the user is an admin
  const isAdmin = user.role === Role.ADMIN;

  return {
    message: response.message || "Login successful", // Default to a success message if not provided
    user: { ...user, isAdmin }, // Append isAdmin inside user object
  };
}
