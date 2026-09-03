import { useEffect, useState } from "react";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  gender: "",
  dateOfBirth: "",
  address: "",
  emergencyContact: "",
  emergencyPhone: "",
  status: "active",
};

const MemberForm = ({
  initialData,
  onSubmit,
  loading = false,
}) => {
  const [form, setForm] =
    useState(initialForm);

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialForm,
        ...initialData,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >

      {/* Personal Information */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <h2 className="mb-6 text-lg font-semibold text-slate-900">
          Personal Information
        </h2>

        <div className="grid gap-5 md:grid-cols-2">

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Full Name *
            </label>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Enter full name"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email *
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Enter email"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Phone *
            </label>

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              placeholder="Enter phone number"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Gender
            </label>

            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-slate-400"
            >
              <option value="">
                Select Gender
              </option>

              <option value="male">
                Male
              </option>

              <option value="female">
                Female
              </option>

              <option value="other">
                Other
              </option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Date of Birth
            </label>

            <input
              type="date"
              name="dateOfBirth"
              value={
                form.dateOfBirth
                  ? form.dateOfBirth.substring(
                      0,
                      10
                    )
                  : ""
              }
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Status
            </label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-slate-400"
            >
              <option value="active">
                Active
              </option>

              <option value="inactive">
                Inactive
              </option>
            </select>
          </div>

        </div>

        <div className="mt-5">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Address
          </label>

          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            rows="3"
            placeholder="Enter address"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
          />
        </div>

      </div>


      {/* Emergency Contact */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <h2 className="mb-6 text-lg font-semibold text-slate-900">
          Emergency Contact
        </h2>

        <div className="grid gap-5 md:grid-cols-2">

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Contact Name
            </label>

            <input
              name="emergencyContact"
              value={
                form.emergencyContact
              }
              onChange={handleChange}
              placeholder="Emergency contact name"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Contact Phone
            </label>

            <input
              name="emergencyPhone"
              value={
                form.emergencyPhone
              }
              onChange={handleChange}
              placeholder="Emergency phone number"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
            />
          </div>

        </div>

      </div>


      {/* Submit */}
      <div className="flex justify-end">

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-slate-900 px-7 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : initialData
            ? "Update Member"
            : "Create Member"}
        </button>

      </div>

    </form>
  );
};

export default MemberForm;