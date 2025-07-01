import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "./TextField";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import toast from "react-hot-toast";
import { useStoreContext } from "../contextApi/ContextApi";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const { setToken } = useStoreContext();
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

  const loginHandler = async (data) => {
    setLoader(true);
    try {
      const { data: response } = await api.post("/api/auth/public/login", data);
      setToken(response.token);
      localStorage.setItem("JWT_TOKEN", JSON.stringify(response.token));
      toast.success("Login Successful!");
      reset();
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Login Failed!");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 px-4">
      <form
        onSubmit={handleSubmit(loginHandler)}
        className="w-full max-w-md bg-zinc-800 rounded-2xl p-8 shadow-xl shadow-zinc-900 hover:shadow-2xl hover:shadow-zinc-800 transition duration-300"
      >
        <h1 className="text-center font-serif text-blue-400 font-bold text-4xl mb-2">
          Welcome Back
        </h1>
        <p className="text-center text-zinc-400 mb-6">Login to your account</p>

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
          className={`mt-8 w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500
                    transition duration-150 ease-in-out hover:scale-[1.02] hover:brightness-110 active:scale-95
                    disabled:opacity-70 disabled:cursor-not-allowed`}
        >
          {loader ? "Loading..." : "Login"}
        </button>

        <p className="text-center text-sm text-zinc-400 mt-6">
          Don't have an account?{" "}
          <Link
            className="font-semibold text-blue-400 underline hover:text-zinc-100 transition"
            to="/register"
          >
            SignUp
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
