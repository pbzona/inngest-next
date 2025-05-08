import { EventSchemas, Inngest } from "inngest";

// TypeScript schema for the events
export type Events = {
  "workflow/main.step": {
    name: "workflow/main.step";
    data: {
      message?: string;
    };
  };
  "workflow/secondary.step": {
    name: "workflow/secondary.step";
    data: {
      message?: string;
    };
  };
};

// Inngest client to send and receive events
export const inngestMain = new Inngest({
  id: "scan",
  schemas: new EventSchemas().fromRecord<Events>(),
});

export const inngestSecondary = new Inngest({
  id: "scan-with-headless-browser",
  schemas: new EventSchemas().fromRecord<Events>(),
});