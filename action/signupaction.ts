"use server";

import { signupservice } from "@/services/signupservice";



interface formType {
    fullname: string;
    email: string;
    password: string;
}

export async function signupaction(formData: formType) {
    return await signupservice(formData.fullname, formData.email, formData.password);
}
