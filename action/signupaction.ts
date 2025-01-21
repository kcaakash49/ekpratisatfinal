"use server";

import { signupservice } from "@/services/signupservice";
import { Role } from "@prisma/client";



interface formType {
    fullname: string;
    email: string;
    password: string;
    mobile: string
    role: Role
}

export async function signupaction(formData: formType) {
    return await signupservice(formData.fullname, formData.email, formData.password, formData.mobile,formData.role);
}
