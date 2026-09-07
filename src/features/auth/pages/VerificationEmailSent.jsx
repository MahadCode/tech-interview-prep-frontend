import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resendEmailVerification } from "../api/auth";
import { login } from "../authSlice";
import { login as loginApi, getCurrentUser } from "../api/auth";
import { AwardIcon } from "lucide-react";

function VerificationEmailSent() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const from = location.state?.from;
  const user = location.state?.user;
  const redirectTo = location.state?.redirectTo;

  const [countdown, setCountdown] = useState(from === "signup" ? 10 : null);

  useEffect(() => {
    if (from !== "signup") return;
    const loginCall = async () => {
      try {
        const response = await loginApi(user.username, user.password);
        const userResponse = await getCurrentUser();

        if (userResponse.data) {
          dispatch(
            login({
              userData: userResponse.data,
            }),
          );
        }
      } catch (error) {
        console.error(error.respone?.data);
      }
    };
    loginCall();
  }, [from, user, dispatch]);

  useEffect(() => {
    const resendEmail = async () => {
      try {
        await resendEmailVerification();
      } catch (error) {
        console.error(error?.response?.data);
      }
    };

    if (from === "verify-email") {
      resendEmail();
    }
  }, [from]);

  useEffect(() => {
    if (from !== "signup") return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/");

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [from, navigate]);

  const getVerificationMessage = () => {
    if (redirectTo === "/add-question") {
      return "You need to verify your email before you can add a question.";
    }

    if (
      redirectTo?.includes("/questions/") &&
      redirectTo?.includes("/submit-solution")
    ) {
      return "You need to verify your email before you can submit a solution.";
    }

    if (
      redirectTo?.includes("/questions/") &&
      redirectTo?.includes("/report")
    ) {
      return "You need to verify your email before you can report a question.";
    }

    if (redirectTo?.includes("/questions/") && redirectTo?.includes("/edit")) {
      return "You need to verify your email before you can edit a question.";
    }

    if (redirectTo?.includes("/questions/")) {
      return "You need to verify your email before you can view the question and participate in its discussion.";
    }

    if (redirectTo?.startsWith("/dashboard")) {
      return "You need to verify your email before you can access your dashboard.";
    }

    if (redirectTo?.startsWith("/moderation")) {
      return "You need to verify your email before you can access the moderation section.";
    }

    return "You need to verify your email before you can access this section.";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm border border-gray-100">
        {/* Success Icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900">Check your inbox</h1>

        <div className="mt-6 rounded-lg border border-gray-900 bg-white p-4 text-left dark:border-gray-300 dark:bg-gray-900">
          {redirectTo && (
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {getVerificationMessage()}
            </p>
          )}

          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            We've sent a verification link to your Gmail. Please check your
            inbox and click the link to verify your account.
          </p>
        </div>

        <p className="mt-4 text-sm text-gray-400">
          Don't see it? Check your spam or junk folder.
        </p>

        {/* Demo countdown */}
        {from === "signup" && countdown !== null && (
          <p className="mt-6 text-sm text-gray-500">
            Redirecting to Home in{" "}
            <span className="font-semibold text-gray-900">{countdown}</span>{" "}
            seconds...
          </p>
        )}

        <Link
          to="/"
          className="mt-7 inline-flex w-full items-center justify-center rounded-lg bg-black px-5 py-3 font-medium text-white transition hover:bg-gray-800"
        >
          Go to Website
        </Link>
      </div>
    </div>
  );
}

export default VerificationEmailSent;
