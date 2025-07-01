import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "./TextField";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const registerHandler = async (data) => {
    setLoader(true);
    try {
      const { data: response } = await api.post(
        "/api/auth/public/register",
        data
      );
      reset();
      navigate("/login");
      toast.success("Registration Successful!");
    } catch (error) {
      console.log(error);
      toast.error("Registration Failed!");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex justify-center items-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 px-4">
      <form
        onSubmit={handleSubmit(registerHandler)}
        className="w-full max-w-md bg-zinc-800 p-8 rounded-2xl shadow-xl shadow-zinc-900 hover:shadow-2xl hover:shadow-zinc-800 transition"
      >
        <h1 className="text-center font-serif text-blue-400 font-bold text-3xl mb-6">
          Register Here
        </h1>

        <hr className="mb-6 border-zinc-600" />

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
            type={showPassword ? "text" : "password"}
            message="*Password is required"
            placeholder="Type your password"
            register={register}
            min={6}
            errors={errors}
          />
          <div className="text-right mt-1">
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="text-sm text-blue-400 underline hover:text-zinc-100 transition"
            >
              {showPassword ? "Hide Password" : "Show Password"}
            </button>
          </div>
        </div>

        <button
          disabled={loader}
          type="submit"
          className={`mt-8 w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 transition
                    duration-150 ease-in-out hover:brightness-110 active:scale-95
                    disabled:opacity-70 disabled:cursor-not-allowed`}
        >
          {loader ? "Loading..." : "Register"}
        </button>

        <p className="text-center text-sm text-zinc-400 mt-6">
          Already have an account?{" "}
          <Link
            className="font-semibold text-blue-400 underline hover:text-zinc-100 transition"
            to="/login"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
