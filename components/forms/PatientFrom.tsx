"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { Form } from "@/components/ui/form"
import CustomFromField from "../CustomFromField"
import SubmitButton from "../SubmitButton"
import { UserFormValidation } from "@/lib/validation"

export enum FormFieldType {
    INPUT = 'input',
    TEXTAREA = 'textarea',
    PHONE_INPUT = 'phone-input',
    CHECKBOX = 'checkbox',
    DATAPICKER = 'datapicker',
    SELECT = 'select',
    SKELETION = 'skeleton'
}



const PatientFrom = () => {
    const router = useRouter

    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof UserFormValidation>>({
        resolver: zodResolver(UserFormValidation),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
        },
    })


    async function onSubmit({ name, email, phone }: z.infer<typeof UserFormValidation>) {
        setIsLoading(true);

        try {
            // const userData = { name, email, phone, }

            // const user = await createUser(userData)

            // if(user) router.push(`/patients/${user.$id}/register`)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                <section className="mb-10 space-y-4">
                    <h1 className="header">Hi There 👋</h1>
                    <p className="text-dark-700 ">Schedule your first appoinment.</p>
                </section>

                <CustomFromField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="name"
                    label="Full name"
                    placeholder="Arnab"
                    iconSrc="/assets/icons/user.png"
                    iconAlt="user"
                />

                <CustomFromField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="email"
                    label="Email"
                    placeholder="user@example.com"
                    iconSrc="/assets/icons/email.png"
                    iconAlt="email"
                />

                <CustomFromField
                    fieldType={FormFieldType.PHONE_INPUT}
                    control={form.control}
                    name="phone-number"
                    label="Phone Number"
                    placeholder="+880 111 222 3334"
                    iconSrc="/assets/icons/phone.png"
                    iconAlt="email"
                />

                <SubmitButton isLoading={isLoading}>
                    Get Started
                </SubmitButton>
            </form>
        </Form>
    )
}

export default PatientFrom
