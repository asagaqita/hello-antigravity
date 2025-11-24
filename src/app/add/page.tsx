import { addSubscription } from "../actions";

export default function AddSubscriptionPage() {
    return (
        <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="max-w-md mx-auto flex flex-col gap-8">
                <h1 className="text-2xl font-bold">Add New Subscription</h1>
                <form action={addSubscription} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="font-medium">Subscription Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="border rounded p-2 bg-transparent"
                            placeholder="e.g. Netflix"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-medium">Billing Cycle</label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2">
                                <input type="radio" name="isYearly" value="false" defaultChecked />
                                Monthly
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="radio" name="isYearly" value="true" />
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
                            required
                            min="0"
                            className="border rounded p-2 bg-transparent"
                            placeholder="e.g. 1000"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-foreground text-background rounded p-2 font-medium hover:opacity-90 transition-opacity"
                    >
                        Add Subscription
                    </button>
                </form>
            </main>
        </div>
    );
}
