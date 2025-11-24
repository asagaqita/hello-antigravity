import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { getSubscriptions, deleteSubscription } from "./actions";
import Link from "next/link";

export default async function Home() {
  const subscriptions = await getSubscriptions();

  const monthlyTotal = subscriptions.reduce((acc, sub) => {
    return acc + (sub.isYearly ? Math.round(sub.price / 12) : sub.price);
  }, 0);

  const yearlyTotal = subscriptions.reduce((acc, sub) => {
    return acc + (sub.isYearly ? sub.price : sub.price * 12);
  }, 0);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] relative">
      <div className="absolute top-4 left-4">
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-2xl">
        <SignedOut>
          <h1 className="text-4xl font-bold text-center sm:text-left">Welcome to SubManager</h1>
          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <SignInButton mode="modal">
              <button className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
                Sign Up
              </button>
            </SignUpButton>
          </div>
        </SignedOut>

        <SignedIn>
          <div className="w-full flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="p-4 border rounded-lg bg-black/[.05] dark:bg-white/[.05]">
                <h3 className="text-sm opacity-70">Monthly Total</h3>
                <p className="text-2xl font-bold">¥{monthlyTotal.toLocaleString()}</p>
              </div>
              <div className="p-4 border rounded-lg bg-black/[.05] dark:bg-white/[.05]">
                <h3 className="text-sm opacity-70">Yearly Total</h3>
                <p className="text-2xl font-bold">¥{yearlyTotal.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Your Subscriptions</h2>
              <Link href="/add" className="bg-foreground text-background px-4 py-2 rounded-full text-sm font-medium hover:opacity-90">
                + Add New
              </Link>
            </div>

            <div className="flex flex-col gap-4">
              {subscriptions.map((sub) => (
                <div key={sub.id} className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <h3 className="font-bold">{sub.name}</h3>
                    <p className="text-sm opacity-70">
                      {sub.isYearly ? 'Yearly' : 'Monthly'} • ¥{sub.price.toLocaleString()}
                      {sub.isYearly && ` (≈¥${Math.round(sub.price / 12).toLocaleString()}/mo)`}
                    </p>
                  </div>
                  <form action={deleteSubscription.bind(null, sub.id)}>
                    <button className="text-red-500 hover:text-red-700 text-sm">Delete</button>
                  </form>
                </div>
              ))}
              {subscriptions.length === 0 && (
                <p className="text-center opacity-50 py-8">No subscriptions yet.</p>
              )}
            </div>
          </div>
        </SignedIn>
      </main>
    </div>
  );
}
