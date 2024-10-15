"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import CustomFromField from "../CustomFromField"

export enum FormFieldType {
    INPUT = 'input',
    TEXTAREA = 'textarea',
    PHONE_INPUT = 'phone-input',
    CHECKBOX = 'checkbox',
    DATAPICKER = 'datapicker',
    SELECT = 'select',
    SKELETION = 'skeleton'
}

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
})

const PatientFrom = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
        },
    })


    function onSubmit(values: z.infer<typeof formSchema>) {

        console.log(values)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                <section className="mb-10 space-y-4">
                    <h1 className="header">Hi there 👋</h1>
                    <p className="text-dark-700 ">Schedule your first appoinment.</p>
                </section>
                <CustomFromField
                    fieldType = {FormFieldType.INPUT}
                    control = {form.control}
                    name = "name"
                    label = "full name"
                    placeholder = "Arnab"
                    iconSrc = "/assets/icons/user.svg"
                    iconAlt = "user"
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}

export default PatientFrom
