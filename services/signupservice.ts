import client from "@/db";
import { Role } from "@prisma/client";

export async function signupservice(fullname: string, email: string, password: string, mobile: string, role: Role) {
    try {
        // Check if the username or email already exists
        const existingUser = await client.user.findFirst({
            where: {
                OR: [
                    { mobile: mobile },
                    { email: email },
                ],
            },
        });

        if (existingUser) {
            if (existingUser.mobile === mobile) {
                return { error: "Phone Number is already taken. Please choose another one." };
            }
            if (existingUser.email === email) {
                return { error: "Email is already registered. Please use another email." };
            }
        }

        // Create a new user if no conflicts exist
        await client.user.create({
            data: {
                fullname: fullname,
                email: email,
                password: password,
                mobile: mobile,
                role: role
            },
        });

        return { message: "Signup successful" };
    } catch (error) {
        console.error("Error during signup:", error);

        // Return a generic error if something unexpected happens
        return { error: "An unexpected error occurred. Please try again later." };
    }
}
