
import { signinservice } from "@/services/signinservice";
import { SignInResponse } from "@/types/signin-response";

export async function signinaction(mobile: string, password: string): Promise<SignInResponse> {
  const response = await signinservice(mobile, password);

  if (response.error) {
    return { error: response.error || "Unknown error" };  // Default to "Unknown error" if no error message
  }

  // Ensure that user and isAdmin have default values
  const user = response.user || {
    id: 0,
    fullname: "",
    mobile: "",
    email: "",
    role: "",  // Default empty values for user object
  };
  const isAdmin = response.isAdmin ?? false;  // Default to false if undefined

  return {
    message: response.message || "Login successful",  // Default to a success message if not provided
    user,
    isAdmin,
  };
}
