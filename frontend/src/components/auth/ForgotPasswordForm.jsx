import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  ArrowLeft,
  Send,
  Loader2,
  Dumbbell,
} from "lucide-react";
import toast from "react-hot-toast";

import { forgotPassword } from "../../services/authService";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [submitted, setSubmitted] =
    useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error(
        "Please enter your email address"
      );
      return;
    }

    try {
      setLoading(true);

      const data =
        await forgotPassword(email);

      toast.success(
        data.message ||
          "Password reset link sent"
      );

      setSubmitted(true);

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">

      {/* Header */}
      <div className="mb-8 text-center">

        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg">
          <Dumbbell size={32} />
        </div>

        <h1 className="text-3xl font-bold text-slate-900">
          Forgot Password?
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Enter your email and we'll send you
          a password reset link.
        </p>

      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl bg-white p-8 shadow-xl"
      >

        {/* Success message */}
        {submitted ? (
          <div className="rounded-xl bg-green-50 p-4 text-center text-sm text-green-700">
            If an account exists with this
            email, a password reset link has
            been sent.
          </div>
        ) : (
          <>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Email Address
              </label>

              <div className="relative">

                <Mail
                  size={19}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="Enter your email"
                  autoComplete="email"
                  className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                />

              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2
                    size={19}
                    className="animate-spin"
                  />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={19} />
                  Send Reset Link
                </>
              )}
            </button>
          </>
        )}

        {/* Back */}
        <div className="mt-6 text-center">

          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:underline"
          >
            <ArrowLeft size={16} />
            Back to Login
          </Link>

        </div>

      </form>
    </div>
  );
};

export default ForgotPasswordForm;