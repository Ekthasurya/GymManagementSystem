import { Link } from "react-router-dom";
import { ShieldX } from "lucide-react";

const Unauthorized = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">

        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
          <ShieldX size={32} />
        </div>

        <h1 className="text-3xl font-bold text-slate-900">
          Access Denied
        </h1>

        <p className="mt-3 text-slate-500">
          You don't have permission to access
          this page.
        </p>

        <Link
          to="/"
          className="mt-6 inline-block rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
        >
          Go Home
        </Link>

      </div>
    </main>
  );
};

export default Unauthorized;