import client from "@/db";
import bcrypt from 'bcryptjs';
import { signUpSchema, SignUpSchema } from "@/zod/schema";
import { Role } from "@prisma/client";

export async function signupservice(formData: SignUpSchema) {
    try {
        const result = signUpSchema.safeParse(formData);
        console.log(result.error?.format());
        if (!result.success) {
            const formattedErrors: any = result.error?.format();
            const simplifiedErrors = Object.keys(formattedErrors).reduce(
                (acc: any, key) => {
                    // Skip the _errors property as it is not a form field
                    if (key !== "_errors" && formattedErrors[key]._errors.length > 0) {
                        acc[key] = formattedErrors[key]._errors[0]; // Take the first error message
                    }
                    return acc;
                },
                {}
            );
            return {
                error: simplifiedErrors,
            };
        }

        // Check if the mobile or email already exists
        const existingUser = await client.user.findFirst({
            where: {
                OR: [{ mobile: formData.mobile }, { email: formData.email }],
            },
        });

        if (existingUser) {
            if (existingUser.mobile === formData.mobile) {
                return {
                    error: {
                        error: "Phone Number is already taken. Please choose another one.",
                    },
                };
            }
            if (existingUser.email === formData.email) {
                return {
                    error: {
                        error: "Email is already registered. Please use another email.",
                    },
                };
            }
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(formData.password, 10); // 10 salt rounds

        // Create a new user with the hashed password
        await client.user.create({
            data: {
                ...formData, // Spread the formData
                password: hashedPassword, // Set the hashed password
            },
        });

        return { message: "Signup successful" };
    } catch (error) {
        return {
            error: { error: "An unexpected error occurred. Please try again later." },
        };
    }
}
