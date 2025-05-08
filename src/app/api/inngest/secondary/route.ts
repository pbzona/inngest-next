import { inngestSecondary } from '@/inngest/client';
import { secondaryTask } from '@/inngest/functions';
import { serve } from "inngest/next";

export const { GET, POST, PUT } = serve({
  client: inngestSecondary,
  functions: [
    secondaryTask
  ],
  servePath: "/api/inngest/secondary"
});
