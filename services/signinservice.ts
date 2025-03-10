import bcrypt from "bcryptjs";
import client from "@/db";

export async function signinservice(mobile: string, password: string) {
    try {
        const user = await client.user.findUnique({
            where: { mobile: mobile },
        });

        if (!user) {
            return { error: "Wrong username or password" };
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return { error: "Wrong username or password" };
        }

        // Check if the user is an admin
        const isAdmin = user.role === "ADMIN";

        return {
            message: "Login Success",
            user: {
                id: user.id,
                fullname: user.fullname,
                mobile: user.mobile,
                email: user.email,
                role: user.role, // Pass role to frontend
            },
            isAdmin, // Add this field to indicate if the user is an admin
        };
    } catch (e) {
        return { error: "An error occurred during login. Please try again later." };
    }
}
