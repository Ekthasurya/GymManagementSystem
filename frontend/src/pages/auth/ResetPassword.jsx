import { useParams } from "react-router-dom";

import ResetPasswordForm from "../../components/auth/ResetPasswordForm";

const ResetPassword = () => {
  const { token } = useParams();

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <ResetPasswordForm token={token} />
    </main>
  );
};

export default ResetPassword;