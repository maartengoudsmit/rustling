// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
function getFormattedDate(prefix) {
  const date = /* @__PURE__ */ new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const YY = String(date.getFullYear());
  const MM = pad(date.getMonth() + 1);
  const DD = pad(date.getDate());
  const HH = pad(date.getHours());
  const mm = pad(date.getMinutes());
  return `${prefix}${YY}-${MM}-${DD}@${HH}${mm}`;
}
var config_default = defineConfig({
  branch,
  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "./",
    basePath: "rustling"
  },
  media: {
    tina: {
      mediaRoot: "media",
      publicFolder: "./"
    }
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
            }
          },
          beforeSubmit: async ({
            form,
            cms,
            values
          }) => {
            if (form.crudType === "create") {
              const now = (/* @__PURE__ */ new Date()).toISOString();
              return {
                ...values,
                published: now,
                updated: now
              };
            } else {
              return {
                ...values,
                updated: (/* @__PURE__ */ new Date()).toISOString()
              };
            }
          }
        },
        fields: [
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
            ui: {
              parse: (val) => val.map((t) => t && t.toLowerCase())
            }
          },
          {
            type: "string",
            name: "published",
            label: "Published",
            ui: {
              component: null
            }
          },
          {
            type: "string",
            name: "updated",
            label: "Updated",
            ui: {
              component: null
            }
          }
        ]
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
            }
          },
          beforeSubmit: async ({
            form,
            cms,
            values
          }) => {
            if (form.crudType === "create") {
              const now = (/* @__PURE__ */ new Date()).toISOString();
              return {
                ...values,
                published: now,
                updated: now
              };
            } else {
              return {
                ...values,
                updated: (/* @__PURE__ */ new Date()).toISOString()
              };
            }
          }
        },
        fields: [
          {
            type: "string",
            name: "topic",
            label: "Topic",
            isTitle: true,
            required: true
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
            ui: {
              parse: (val) => val.map((t) => t && t.toLowerCase())
            }
          },
          {
            type: "string",
            name: "url",
            label: "Link"
          },
          {
            type: "string",
            name: "image",
            label: "Image URL"
          },
          {
            type: "string",
            name: "published",
            label: "Published",
            ui: {
              component: null
            }
          },
          {
            type: "string",
            name: "updated",
            label: "Updated",
            ui: {
              component: null
            }
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
