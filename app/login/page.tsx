"use client";
import React from "react";
import { ZodType, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    password: string;
    confirmPassword: string;
};

const LoginPage: React.FC = () => {
    const schema: ZodType<FormData> = z
        .object({
            firstName: z.string().min(2).max(30),
            lastName: z.string().min(2).max(30),
            email: z.string().email(),
            age: z.number().min(18).max(70),
            password: z.string().min(5).max(20),
            confirmPassword: z.string().min(5).max(20),
        })
        .refine((data) => data.password === data.confirmPassword, {
            message: "Passwords do not match",
            path: ["confirmPassword"],
        });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const submitData = (data: FormData) => {
        console.log("It worked", data);
    };

    return (
        <div className="flex justify-center p-2">
            <form className="flex flex-col" onSubmit={handleSubmit(submitData)}>
                <label>First name:</label>
                <input
                    className="border-2 border-black"
                    type="text"
                    {...register("firstName")}
                />
                {errors.firstName && <span>{errors.firstName.message}</span>}
                <label>Last name:</label>
                <input
                    className="border-2 border-black"
                    type="text"
                    {...register("lastName")}
                />
                {errors.lastName && <span>{errors.lastName.message}</span>}
                <label>Email:</label>
                <input
                    className="border-2 border-black"
                    type="text"
                    {...register("email")}
                />
                {errors.email && <span>{errors.email.message}</span>}
                <label>Age:</label>
                <input
                    className="border-2 border-black"
                    type="number"
                    {...register("age", { valueAsNumber: true })}
                />
                {errors.age && <span>{errors.age.message}</span>}
                <label>Password:</label>
                <input
                    className="border-2 border-black"
                    type="password"
                    {...register("password")}
                />
                {errors.password && <span>{errors.password.message}</span>}
                <label>Confirm password:</label>
                <input
                    className="border-2 border-black"
                    type="password"
                    {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                    <span>{errors.confirmPassword.message}</span>
                )}
                <input className="border-2 border-black" type="submit" />
            </form>
        </div>
    );
};

export default LoginPage;
