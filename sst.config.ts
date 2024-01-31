import { SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "media-library",
      region: "sa-east-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const site = new NextjsSite(stack, "media-library", {
        environment: {
          DATABASE_URL: process.env.DATABASE_URL!,
          BUCKET_NAME: process.env.BUCKET_NAME!,
          BUCKET_REGION: process.env.BUCKET_REGION!,
          ACCESS_KEY: process.env.ACCESS_KEY!,
          SECRET_ACCESS_KEY: process.env.SECREET_ACCESS_KEY!,
          CDN_URL: process.env.CDN_URL!,
        },
        experimental: {
          streaming: true,
        },
        timeout: 30,
        buildCommand: 'npx open-next@latest build --streaming'
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
