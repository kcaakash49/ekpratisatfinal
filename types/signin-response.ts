export type SignInResponse = 
  | {
      message: string;
      user: {
        id: number;
        fullname: string;
        mobile: string;
        email: string;
        role: string;
        isAdmin: boolean;
      };
    }
  | {
      error: string; // Add this to handle errors
    };