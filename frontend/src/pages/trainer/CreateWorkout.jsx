import { useState } from "react";

import {
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import WorkoutForm from "../../components/workouts/WorkoutForm";

import {
  createWorkout,
} from "../../services/workoutService";

import {
  getMembers,
} from "../../services/memberService";

import { useEffect } from "react";

const CreateWorkout = () => {

  const navigate = useNavigate();


  const [members, setMembers] =
    useState([]);

  const [loadingMembers, setLoadingMembers] =
    useState(true);

  const [saving, setSaving] =
    useState(false);


  useEffect(() => {

    const fetchMembers = async () => {

      try {

        const response =
          await getMembers();

        setMembers(
          response.data ||
            response
        );

      } catch (error) {

        toast.error(
          "Failed to load members"
        );

      } finally {

        setLoadingMembers(false);

      }

    };


    fetchMembers();

  }, []);


  const handleSubmit = async (
    data
  ) => {

    try {

      setSaving(true);

      await createWorkout(data);

      toast.success(
        "Workout created successfully"
      );

      navigate(
        "/trainer/workouts"
      );

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Failed to create workout"
      );

    } finally {

      setSaving(false);

    }

  };


  if (loadingMembers) {

    return (
      <div className="p-10 text-center">
        Loading members...
      </div>
    );

  }


  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold text-slate-900">
          Create Workout
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Create a workout plan and assign it to a member.
        </p>

      </div>


      <WorkoutForm
        members={members}
        onSubmit={handleSubmit}
        loading={saving}
      />

    </div>
  );
};

export default CreateWorkout;