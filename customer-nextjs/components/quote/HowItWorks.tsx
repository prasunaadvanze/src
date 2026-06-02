import { Card } from "@/components/ui/Card";

const steps = [
  {
    step: "01",
    title: "Start your quote",
    description:
      "Tell us about your driver profile so we can match you to the right journey.",
  },
  {
    step: "02",
    title: "Answer guided questions",
    description:
      "Dynamic forms adapt to your path — fast track or detailed review.",
  },
  {
    step: "03",
    title: "Review your premium",
    description:
      "See your personalized rate and verification summary when you're done.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="border-y border-gainsco-100 bg-white py-14 sm:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">
            How it works
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-slate-600">
            Three simple steps from start to bound quote.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {steps.map((item) => (
            <Card
              key={item.step}
              className="relative border-slate-200/80 pt-8 transition hover:border-gainsco-200 hover:shadow-md"
            >
              <span className="absolute -top-3 left-6 flex h-10 w-10 items-center justify-center rounded-full bg-gainsco-600 text-sm font-bold text-white shadow-md">
                {item.step}
              </span>
              <h3 className="font-display text-lg font-semibold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
