import { defineConfig } from "tinacms";
import { TinaCMS, Form } from "tinacms";

type BeforeSubmitFunction = (args: {
  values: Record<string, unknown>;
  cms: TinaCMS;
  form: Form;
}) => Promise<void | Record<string, unknown>>;

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

function getFormattedDate(prefix: string) {
  const date = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const YY = String(date.getFullYear());
  const MM = pad(date.getMonth() + 1);
  const DD = pad(date.getDate());
  const HH = pad(date.getHours());
  const mm = pad(date.getMinutes());
  return `${prefix}${YY}-${MM}-${DD}@${HH}${mm}`;
}

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "./",
    basePath: "rustling",
  },
  media: {
    tina: {
      mediaRoot: "media",
      publicFolder: "./",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/r/content-modelling-collections/
  schema: {
    collections: [
      {
        name: "notes",
        format: "md",
        label: "Notes",
        path: "content/notes",
        ui: {
          filename: {
            slugify(values, meta) {
              return getFormattedDate("n");
            },
          },
          beforeSubmit: async ({
            form,
            cms,
            values,
          }: {
            form: Form;
            cms: TinaCMS;
            values: Record<string, any>;
          }) => {
            if (form.crudType === "create") {
              return {
                ...values,
                published: new Date().toISOString(),
                updated: new Date().toISOString(),
              };
            } else {
              return {
                ...values,
                updated: new Date().toISOString(),
              };
            }
          },
        },
        fields: [
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
          },
          {
            type: "string",
            name: "published",
            label: "Published",
            ui: {
              component: null,
            },
          },
          {
            type: "string",
            name: "updated",
            label: "Updated",
            ui: {
              component: null,
            },
          },
        ],
      },
      {
        name: "reviews",
        format: "md",
        label: "Reviews",
        path: "content/reviews",
        ui: {
          filename: {
            slugify(values, meta) {
              return getFormattedDate("r");
            },
          },
          beforeSubmit: async ({
            form,
            cms,
            values,
          }: {
            form: Form;
            cms: TinaCMS;
            values: Record<string, any>;
          }) => {
            if (form.crudType === "create") {
              return {
                ...values,
                published: new Date().toISOString(),
                updated: new Date().toISOString(),
              };
            } else {
              return {
                ...values,
                updated: new Date().toISOString(),
              };
            }
          },
        },
        fields: [
          {
            type: "string",
            name: "topic",
            label: "Topic",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
          },
          {
            type: "string",
            name: "url",
            label: "Link",
          },
          {
            type: "string",
            name: "image",
            label: "Image URL",
          },
          {
            type: "string",
            name: "published",
            label: "Published",
            ui: {
              component: null,
            },
          },
          {
            type: "string",
            name: "updated",
            label: "Updated",
            ui: {
              component: null,
            },
          },
        ],
      },
    ],
  },
});
