import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import TextField from './TextField'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/api'
import toast from 'react-hot-toast'

const RegisterPage = () => {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
        mode: "onTouched",
    })

    const registerHandler = async (data) => {
        setLoader(true)
        try {
            const { data: response } = await api.post(
                "/api/auth/public/register",
                data
            )
            reset()
            navigate("/login")
            toast.success("Registration Successful!")
        } catch (error) {
            console.log(error)
            toast.error("Registration Failed!")
        } finally {
            setLoader(false)
        }
    }

    return (
        <div className="min-h-[calc(100vh-64px)] flex justify-center items-center bg-gradient-to-br from-slate-50 via-white to-slate-100 px-4">
            <form
                onSubmit={handleSubmit(registerHandler)}
                className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl transition hover:shadow-2xl"
            >
                <h1 className="text-center font-serif text-btnColor font-bold text-3xl mb-6">
                    Register Here
                </h1>

                <hr className="mb-6 border-slate-300" />

                <div className="space-y-5">
                    <TextField
                        label="UserName"
                        required
                        id="username"
                        type="text"
                        message="*Username is required"
                        placeholder="Type your username"
                        register={register}
                        errors={errors}
                    />

                    <TextField
                        label="Email"
                        required
                        id="email"
                        type="email"
                        message="*Email is required"
                        placeholder="Type your email"
                        register={register}
                        errors={errors}
                    />

                    <TextField
                        label="Password"
                        required
                        id="password"
                        type="password"
                        message="*Password is required"
                        placeholder="Type your password"
                        register={register}
                        min={6}
                        errors={errors}
                    />
                </div>

                <button
                    disabled={loader}
                    type="submit"
                    className={`mt-8 w-full py-3 rounded-lg font-semibold text-white bg-custom-gradient transition
                    duration-150 ease-in-out hover:brightness-110 active:scale-95
                    disabled:opacity-70 disabled:cursor-not-allowed`}
                >
                    {loader ? "Loading..." : "Register"}
                </button>

                <p className="text-center text-sm text-slate-600 mt-6">
                    Already have an account?{" "}
                    <Link
                        className="font-semibold text-btnColor underline hover:text-black transition"
                        to="/login"
                    >
                        Login
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default RegisterPage
