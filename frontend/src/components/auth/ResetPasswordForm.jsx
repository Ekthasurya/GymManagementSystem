import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Lock,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle,
} from "lucide-react";
import toast from "react-hot-toast";

import { resetPassword } from "../../services/authService";

const ResetPasswordForm = ({ token }) => {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      password: "",
      confirmPassword: "",
    });

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      password,
      confirmPassword,
    } = formData;

    if (!password || !confirmPassword) {
      toast.error(
        "Please fill in all fields"
      );
      return;
    }

    if (password.length < 6) {
      toast.error(
        "Password must be at least 6 characters"
      );
      return;
    }

    if (password !== confirmPassword) {
      toast.error(
        "Passwords do not match"
      );
      return;
    }

    if (!token) {
      toast.error(
        "Invalid or missing reset token"
      );
      return;
    }

    try {
      setLoading(true);

      const data =
        await resetPassword(
          token,
          password
        );

      toast.success(
        data.message ||
          "Password reset successfully"
      );

      setSuccess(true);

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to reset password"
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">

        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
          <CheckCircle size={34} />
        </div>

        <h1 className="text-2xl font-bold text-slate-900">
          Password Reset Successful
        </h1>

        <p className="mt-3 text-sm text-slate-500">
          Your password has been updated.
          You can now login with your new
          password.
        </p>

        <button
          onClick={() =>
            navigate("/login")
          }
          className="mt-6 w-full rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white hover:bg-slate-800"
        >
          Go to Login
        </button>

      </div>
    );
  }

  return (
    <div className="w-full max-w-md">

      {/* Header */}
      <div className="mb-8 text-center">

        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg">
          <Lock size={30} />
        </div>

        <h1 className="text-3xl font-bold text-slate-900">
          Reset Password
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Create a new password for your
          account.
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl bg-white p-8 shadow-xl"
      >

        {/* Password */}
        <div>

          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            New Password
          </label>

          <div className="relative">

            <Lock
              size={19}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="password"
              name="password"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter new password"
              className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-12 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  (prev) => !prev
                )
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
            >
              {showPassword ? (
                <EyeOff size={19} />
              ) : (
                <Eye size={19} />
              )}
            </button>

          </div>

        </div>

        {/* Confirm Password */}
        <div>

          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Confirm Password
          </label>

          <div className="relative">

            <Lock
              size={19}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="confirmPassword"
              name="confirmPassword"
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              value={
                formData.confirmPassword
              }
              onChange={handleChange}
              placeholder="Confirm new password"
              className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-12 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  (prev) => !prev
                )
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
            >
              {showConfirmPassword ? (
                <EyeOff size={19} />
              ) : (
                <Eye size={19} />
              )}
            </button>

          </div>

        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2
                size={19}
                className="animate-spin"
              />
              Resetting...
            </>
          ) : (
            "Reset Password"
          )}
        </button>

        {/* Login */}
        <div className="text-center">

          <Link
            to="/login"
            className="text-sm font-semibold text-slate-900 hover:underline"
          >
            Back to Login
          </Link>

        </div>

      </form>
    </div>
  );
};

export default ResetPasswordForm;