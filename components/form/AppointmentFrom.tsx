"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

import { Form } from "../ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { getAppointmentSchema } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { FormFieldType } from "./PatientForm";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import { Doctors } from "@/constants";
import { createAppointment } from "@/lib/actions/appointment.action";

const AppointmentFrom = ({
    userId, 
    patientId, 
    type = "create"
}: {
    userId: string;
    patientId: string;
    type: "create" | "schedule" | "cancel" ;
}) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);

    const AppointmentFromValidation = getAppointmentSchema(type);

    const form = useForm<z.infer<typeof AppointmentFromValidation>>({
        resolver: zodResolver(AppointmentFromValidation),
        defaultValues: {
            primaryPhysician: "",
            schedule: new Date(),
            reason: "",
            note: "",
            cancellationReason: "",
        },
    })

    async function onSubmit(value: z.infer<typeof AppointmentFromValidation>) {
        setIsLoading(true);

        let status;
        switch (type) {
            case "schedule":
                status = "scheduled";
            case "cancel":
                status = "cancelled";
                break;
            default:
                status = "panding" //typo mistake
                break;
        }

        // console.log("Before the Type", type); ERROR CHECKING

        try {
            if (type === "create" && patientId) {
                // console.log("I'm here"); ERROR CHECKING

                const appointmentData = {
                    userId,
                    patient: patientId!,
                    primaryPhysician: value.primaryPhysician,
                    schedule: new Date(value.schedule),
                    reason: value.reason!,
                    note: value.note,
                    status: status as Status,
                };

                const appointment = await createAppointment(appointmentData);
                // console.log("The new appointment", appointment); ERROR CHECKING

                if (appointment) {
                    form.reset();
                    router.push(`/patients/${userId}/new-appointment/success?appointmentId=${appointment.id}`)
                }
            }

        } catch (error) {
            console.log("Appointment From error", error);
        }
    }

    let buttonLabel;

    switch (type) {
        case "cancel":
            buttonLabel = "Cancel Appointment";
            break;
        case "create":
            buttonLabel = "Create Appointment";
            break;
        case "schedule":
            buttonLabel = "Schedule Appointment";
            break;
        default:
            break;
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                <section className="mb-12 space-y-4">
                    <h1 className="header">New Appointment 👋</h1>
                    <p className="text-dark-700">Requst a new appointment in 10 seconds.</p>
                </section>

                {type !== "cancel" && (
                    <>
                        <CustomFormField
                            fieldType={FormFieldType.SELECT}
                            control={form.control}
                            name="primaryPhysician"
                            label="Doctor"
                            placeholder="Select a doctor"
                        >
                            {Doctors.map((doctor) => (
                                <SelectItem key={doctor.name} value={doctor.name}>
                                    <div className="flex cursor-pointer items-center gap-2">
                                        <Image
                                            src={doctor.image}
                                            width={32}
                                            height={32}
                                            alt={doctor.name}
                                            className="rounded-full border border-dark-500"
                                        />
                                        <p>{doctor.name}</p>
                                    </div>
                                </SelectItem>
                            ))}
                        </CustomFormField>

                        <CustomFormField
                            fieldType={FormFieldType.DATE_PICKER}
                            control={form.control}
                            name="schedule"
                            label="Expected appointment date"
                            showTimeSelect
                            dateFormat="dd/mm/yyyy - h:mm aa"
                        ></CustomFormField>

                        <div className="flex flex-col gap-6 xl:flex-row">
                            <CustomFormField
                                fieldType={FormFieldType.TEXTAREA}
                                control={form.control}
                                name="reason"
                                label="Reason for appointment"
                                placeholder="Enter reason for appointment"
                            />

                            <CustomFormField
                                fieldType={FormFieldType.TEXTAREA}
                                control={form.control}
                                name="note"
                                label="Notes"
                                placeholder="Enter notes"
                            />
                        </div>
                    </>
                )}

                {type === "cancel" && (
                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="cancellationReason"
                        label="Reason for cancellation"
                        placeholder="Enter reason for cancellation"
                    />
                )}

                <SubmitButton
                    isLoading={isLoading}
                    className={`${type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"} w-full`}
                >{buttonLabel}
                </SubmitButton>
            </form>
        </Form>
    );
};

export default AppointmentFrom