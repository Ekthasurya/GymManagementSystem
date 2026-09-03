import { useEffect, useState } from "react";

const defaultForm = {
  name: "",
  duration: "",
  price: "",
  description: "",
  features: "",
  status: "active",
};

const MembershipForm = ({
  initialData,
  onSubmit,
  loading = false,
}) => {
  const [form, setForm] =
    useState(defaultForm);


  useEffect(() => {
    if (initialData) {
      setForm({
        ...defaultForm,
        ...initialData,

        features: Array.isArray(
          initialData.features
        )
          ? initialData.features.join("\n")
          : initialData.features || "",
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

    const formattedData = {
      ...form,

      duration: Number(form.duration),

      price: Number(form.price),

      features: form.features
        .split("\n")
        .map((feature) => feature.trim())
        .filter(Boolean),
    };

    onSubmit(formattedData);
  };


  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >

      {/* Basic Information */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <h2 className="mb-6 text-lg font-semibold text-slate-900">
          Membership Information
        </h2>

        <div className="grid gap-5 md:grid-cols-2">

          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Plan Name *
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="e.g. Premium Monthly"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
            />
          </div>


          {/* Duration */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Duration (Days) *
            </label>

            <input
              type="number"
              name="duration"
              value={form.duration}
              onChange={handleChange}
              required
              min="1"
              placeholder="30"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
            />
          </div>


          {/* Price */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Price (₹) *
            </label>

            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              min="0"
              placeholder="999"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
            />
          </div>


          {/* Status */}
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


        {/* Description */}
        <div className="mt-5">

          <label className="mb-2 block text-sm font-medium text-slate-700">
            Description
          </label>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="3"
            placeholder="Describe this membership plan..."
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
          />

        </div>


        {/* Features */}
        <div className="mt-5">

          <label className="mb-2 block text-sm font-medium text-slate-700">
            Features
          </label>

          <textarea
            name="features"
            value={form.features}
            onChange={handleChange}
            rows="5"
            placeholder={
              "Unlimited gym access\nPersonal trainer\nDiet consultation\nSteam & sauna"
            }
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
          />

          <p className="mt-2 text-xs text-slate-400">
            Enter one feature per line.
          </p>

        </div>

      </div>


      {/* Submit */}
      <div className="flex justify-end">

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-slate-900 px-7 py-3 font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : initialData
            ? "Update Plan"
            : "Create Plan"}
        </button>

      </div>

    </form>
  );
};

export default MembershipForm;