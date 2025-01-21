"use server";

import { signupservice } from "@/services/signupservice";
import { SignUpSchema } from "@/zod/schema";
import { Role } from "@prisma/client";



// interface formType {
//     fullname: string;
//     email: string;
//     password: string;
//     mobile: string
//     role: Role
// }

export async function signupaction(formData: SignUpSchema) {
    return await signupservice(formData);
}
