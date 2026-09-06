import { useState } from "react";

const ProgressForm = ({ members = [], initialData, onSubmit, loading = false }) => {
  const [formData, setFormData] = useState({
    member: initialData?.member?._id || initialData?.member || "",
    date: initialData?.date?.slice(0, 10) || "",
    weight: initialData?.weight || "",
    height: initialData?.height || "",
    bodyFat: initialData?.bodyFat || "",
    chest: initialData?.chest || "",
    waist: initialData?.waist || "",
    arms: initialData?.arms || "",
    thighs: initialData?.thighs || "",
    notes: initialData?.notes || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...formData,
      weight: Number(formData.weight),
      height: Number(formData.height),
      bodyFat: Number(formData.bodyFat),
      chest: Number(formData.chest),
      waist: Number(formData.waist),
      arms: Number(formData.arms),
      thighs: Number(formData.thighs),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow p-6 space-y-6"
    >
      <h2 className="text-xl font-semibold text-gray-800">
        Progress Tracking
      </h2>

      {/* Member */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Member
        </label>

        <select
          name="member"
          value={formData.member}
          onChange={handleChange}
          required
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="">Select Member</option>

          {members.map((member) => (
            <option key={member._id} value={member._id}>
              {member.name}
            </option>
          ))}
        </select>
      </div>

      {/* Date */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Date
        </label>

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      {/* Measurements */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        <div>
          <label className="block text-sm mb-2">
            Weight (kg)
          </label>
          <input
            type="number"
            step="0.1"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-2">
            Height (cm)
          </label>
          <input
            type="number"
            step="0.1"
            name="height"
            value={formData.height}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm mb-2">
            Body Fat (%)
          </label>
          <input
            type="number"
            step="0.1"
            name="bodyFat"
            value={formData.bodyFat}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm mb-2">
            Chest (cm)
          </label>
          <input
            type="number"
            step="0.1"
            name="chest"
            value={formData.chest}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm mb-2">
            Waist (cm)
          </label>
          <input
            type="number"
            step="0.1"
            name="waist"
            value={formData.waist}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm mb-2">
            Arms (cm)
          </label>
          <input
            type="number"
            step="0.1"
            name="arms"
            value={formData.arms}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm mb-2">
            Thighs (cm)
          </label>
          <input
            type="number"
            step="0.1"
            name="thighs"
            value={formData.thighs}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Notes
        </label>

        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows="4"
          placeholder="Progress notes..."
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Progress"}
      </button>
    </form>
  );
};

export default ProgressForm;