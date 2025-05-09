# Inngest functions on separate Next.js route segments

This is an example of how to use [Inngest](https://inngest.com) to easily add durable work flows to your Next.js application. It keeps things simple, with the same initial steps as the [official Inngest example](https://github.com/vercel/next.js/tree/canary/examples/inngest):

- Bare bones examples with a single button UI that triggers an event
- Runs the Inngest dev server locally for immediate feedback

What this project illustrates is the separation of one computationally expensive Inngest function from the other tasks in its workflow. The method that enables this is [step.invoke()](https://www.inngest.com/docs/reference/functions/step-invoke), which allows the async execution of separate functions as steps in a workflow. Crucially, this works across multiple apps. In order to split Inngest functions across Next.js route segments for greater configurability, they must be separated into different apps because apps and paths map one to one.

## Deploy your own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/pbzona/inngest-next&project-name=inngest-next&repository-name=inngest-next)

To full deploy you'll need an [Inngest Cloud account](https://inngest.com) and the [Vercel Inngest integration](https://vercel.com/integrations/inngest) configured.

## How to use

Clone this repo and, optionally, deploy it to your Vercel account.

Open the running application at [http://localhost:3000](http://localhost:3000) and click the button. This sends an event to the "main" workflow, a multi-step function that we'll pretend is doing some kind of scanning.

Like in a real scanning pipeline, one particular step might be significantly more resource intensive than the rest. We want to ensure this step has what it needs to complete, but we also don't want to waste resources on steps that don't need them. In a single path configuration, every Inngest function executes in the same Vercel function runtime environment. So in order to configure one step differently, we create a second Inngest app with a single Inngest function, and we configure the route's memory allocation in `vercel.json`.

Two comments on the second app:

1. I placed it at a sub-path of the "main" Inngest app. This is arbitrary, it can be served by any valid route handler.
2. The `inngest.json` configuration file was necessary in order to get Inngest to sync with the second app. It seems to assume there is only one app in the Vercel deployment, so this needs to be specified. Also quite possible I was doing it wrong.

The "main" scanning workflow calls the secondary "expensive" step via `step.invoke()`:

```
export const mainWorkflow = inngestMain.createFunction(
  { id: "scanning-pipeline", name: "Scan pipeline" },
  { event: "workflow/main.step" },
  async ({ event, step }) => {
    //...

    await step.invoke('expensive-step', {
      function: referenceFunction({
        appId: 'scan-with-headless-browser',
        functionId: 'expensive-scan'
      }),
      data: {}
    });

    //...
  },
);
```

Note that this allows you to send event data to the external function while preserving its logical structure as part of the current workflow. Because we use `referenceFunction` here, we also avoid pulling in heavy dependencies as we might if we imported the function directly.

For more details, see the [Inngest docs](https://www.inngest.com/docs/reference/functions/step-invoke).

## Notes

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The Inngest dev server will be running at [http://localhost:8288](http://localhost:8288). It can take a few seconds to start up.
