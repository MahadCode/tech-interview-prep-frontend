import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../authSlice";
import Button from "../../../components/Button.jsx";
import Input from "../../../components/Input.jsx";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import {
  register as registerApi,
  login as loginApi,
  getCurrentUser,
} from "../api/auth.js";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const response = await registerApi({
        username: data.username,
        password: data.password,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        bio: data.bio,
      });

      if (response.data) {
        const userResponse = await loginApi(data.username, data.password);
        console.log(userResponse.data);

        if (userResponse.data) {
          dispatch(
            login({
              userData: userResponse.data,
            }),
          );
        }

        navigate("/");
      }
    } catch (error) {
      let errorMessage = {};
      for (let key in error.response?.data) {
        let errorMsg = "";
        for (let e of error.response.data[key]) {
          errorMsg = errorMsg + " " + e;
        }
        if (errorMsg != "") {
          errorMessage[key] = errorMsg;
        }
      }
      let fields = ["username", "first_name", "last_name", "email", "phone", "bio", "password"];
      
      let displayError = "Unable to create account";
      for(let field of fields){
        if( field in errorMessage){
          displayError = errorMessage[field];
          break;
        }

      }

      setError(displayError);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>

        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>

        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)} className="mt-8">
          <div className="space-y-5">
            {/* Username */}
            <Input
              label="Username"
              placeholder="Enter your username"
              error={errors.username?.message}
              {...register("username", {
                required: "Username is required",
              })}
            />

            {/* First Name */}
            <Input
              label="First Name"
              placeholder="Enter your first name"
              error={errors.first_name?.message}
              {...register("first_name", {
                required: "First name is required",
              })}
            />

            {/* Last Name */}
            <Input
              label="Last Name"
              placeholder="Enter your last name"
              error={errors.last_name?.message}
              {...register("last_name", {
                required: "Last name is required",
              })}
            />

            {/* Email */}
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              error={errors.email?.message}
              {...register("email", {
                required: "Email is required",
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be valid",
                },
              })}
            />

            {/* Phone */}
            <Input
              label="Phone"
              placeholder="Enter your phone number"
              type="tel"
              error={errors.phone?.message}
              {...register("phone", {
                required: "Phone number is required",
              })}
            />

            {/* Bio */}
            <Input
              label="Bio"
              placeholder="Tell us about yourself"
              error={errors.bio?.message}
              {...register("bio", {
                required: "Bio is required",
              })}
            />

            {/* Password */}
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              error={errors.password?.message}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />

            {/* Submit */}
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
