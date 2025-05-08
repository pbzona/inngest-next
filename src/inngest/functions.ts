import { cheapStep } from '@/inngest/cheap-step';
import { inngestMain, inngestSecondary } from '@/inngest/client';
import { expensiveStep } from '@/inngest/expensive-step';
import { logStart } from '@/inngest/log-start';
import { referenceFunction } from 'inngest';

export const secondaryTask = inngestSecondary.createFunction(
  { id: "expensive-scan", name: "Expensive scan task" },
  { event: "workflow/secondary.step" },
  async ({ event, step }) => {
    return await expensiveStep();
  }
);

export const mainWorkflow = inngestMain.createFunction(
  { id: "scanning-pipeline", name: "Scan pipeline" },
  { event: "workflow/main.step" },
  async ({ event, step }) => {
    await step.run('start-logging', async () => {
      return await logStart();
    });

    await step.run('cheap-step', async () => {
      return await cheapStep();
    });

    await step.invoke('expensive-step', {
      function: referenceFunction({
        appId: 'scan-with-headless-browser',
        functionId: 'expensive-scan'
      }),
      data: {}
    });

    await step.sleep("Short wait", "3s");

    return { event, body: event.data.message };
  },
);

