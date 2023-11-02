require("dotenv").config({ path: `./.env.local` });
const contentfulManagement = require("contentful-management");
const EnvironmentGetter = require("contentful-typescript-codegen");

const getContentfulEnvironment = () => {
  const contentfulClient = contentfulManagement.createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN,
  });

  return contentfulClient
    .getSpace(process.env.CONTENTFUL_SPACE_ID)
    .then((space: any) =>
      space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT)
    );
};

module.exports = getContentfulEnvironment;
