import { updateSubscription, getSubscription } from "../../actions";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";

export default async function EditSubscriptionPage({ params }: { params: Promise<{ id: string }> }) {
    // Next.js 15以降、paramsはPromiseなのでawaitする
    const { id } = await params;
    const subscriptionId = parseInt(id);

    if (isNaN(subscriptionId)) {
        notFound();
    }

    const subscription = await getSubscription(subscriptionId);

    if (!subscription) {
        redirect("/");
    }

    // updateSubscriptionにIDを渡すためにbindを使用
    const updateWithId = updateSubscription.bind(null, subscriptionId);

    return (
        <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="max-w-md mx-auto flex flex-col gap-8">
                <h1 className="text-2xl font-bold">Edit Subscription</h1>

                <form action={updateWithId} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="font-medium">Subscription Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            defaultValue={subscription.name}
                            required
                            className="border rounded p-2 bg-transparent"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-medium">Billing Cycle</label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="isYearly"
                                    value="false"
                                    defaultChecked={!subscription.isYearly}
                                />
                                Monthly
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="isYearly"
                                    value="true"
                                    defaultChecked={subscription.isYearly}
                                />
                                Yearly
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="price" className="font-medium">Price (JPY)</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            defaultValue={subscription.price}
                            required
                            min="0"
                            className="border rounded p-2 bg-transparent"
                        />
                    </div>

                    <div className="flex gap-4 mt-4">
                        <Link
                            href="/"
                            className="flex-1 text-center border p-2 rounded hover:bg-black/5 dark:hover:bg-white/5"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="flex-1 bg-foreground text-background rounded p-2 font-medium hover:opacity-90 transition-opacity"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}