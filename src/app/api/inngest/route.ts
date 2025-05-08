import { inngestMain } from "@/inngest/client";
import { mainWorkflow } from "@/inngest/functions";
import { serve } from "inngest/next";

export const { GET, POST, PUT } = serve({
  client: inngestMain,
  functions: [mainWorkflow],
  servePath: "/api/inngest",
});
