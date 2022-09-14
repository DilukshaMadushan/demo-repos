import axios from "axios";
import {
  GET_STRAPIDATA_SUCCUES,
  GET_ARTICLEDATA_SUCCUES,
  GET_STRAPIHUB_BANNER_SUCCUES,
} from "../types";

// SET ENVIRONMENT BASE URL
const STRAPI_BASE_URL = process.env.STRAPI_BASE_URL;

export const getStrapiData = (Category_Id) => async (dispatch) => {
  try {
    const response1 = await axios
      .get(`${STRAPI_BASE_URL}/categories/${Category_Id}`)
      .then((item) => item.data.articles);
    const response2 = await axios.get(
      `${STRAPI_BASE_URL}/categories/${Category_Id}`
    );
    dispatch({
      type: GET_STRAPIDATA_SUCCUES,
      payload: {
        Articles_Data: response1,
        Category_Data: response2.data,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const getReviewArticle = (Article_Id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${STRAPI_BASE_URL}/articles/${Article_Id}`
    );

    let descriptionString = response.data.article_body;
    let targetJson = [];

    // Loop through <p> tag parts
    descriptionString.split("<p>").forEach((pair) => {
      if (pair !== "") {
        // Split by end </p> tag
        let splitpair = pair.split("</p>");

        // Remove line breakers
        let originalDescription = splitpair[0].replace(/(\r\n|\n|\r)/gm, "");

        // Assign to object
        let object = {
          type: "description",
          description: `<p>${originalDescription}</p>`,
        };

        // Add to original Json List
        targetJson.push(object);

        //Loop through <img> tag within splitted <p> tags
        splitpair[1].split("<img>").forEach((image) => {
          if (image.length > 1) {
            // Take image attributes from <img>
            let preImage = image.slice(0, image.indexOf(","));

            const sliceImage_1_removeSpaces = preImage.replace(
              /(\r\n| |\n|\r)/gm,
              ""
            );
            const sliceImage_1 = sliceImage_1_removeSpaces.replace(/\:/, "~");

            // Assign src Object Field
            let sliceImage_1_key = sliceImage_1.split("~");
            let key_1 =
              sliceImage_1_key[0].charAt(0).toLowerCase() +
              sliceImage_1_key[0].slice(1).split(" ").join("");

            let section_2 = image.slice(image.indexOf(",") + 1);

            if (section_2.includes(",")) {
              const sliceImage_2 = image.slice(image.indexOf(",") + 1);

              // Take position attributes from <img>
              const preImage_2 = sliceImage_2.slice(
                0,
                sliceImage_2.indexOf(",")
              );
              const sliceImage_3 = preImage_2.replace(/(\r\n| |\n|\r)/gm, "");

              // Assign position Object Field
              let sliceImage_2_key = sliceImage_3.split(":");
              let key_2 =
                sliceImage_2_key[0].charAt(0).toLowerCase() +
                sliceImage_2_key[0].slice(1).split(" ").join("");

              const sliceImage_4 = sliceImage_2.slice(
                sliceImage_2.indexOf(",") + 1
              );

              const sliceImage_4_removeSymbol = sliceImage_4.replace(/\:/, "~");
              let sliceImage_3_key = sliceImage_4_removeSymbol.split("~");

              // Assign caption
              let key_3 =
                sliceImage_3_key[0].charAt(0).toLowerCase() +
                sliceImage_3_key[0].slice(1).split(" ").join("");

              const original_target = {
                type: "image",
              };

              // Assign to Object
              original_target[key_1] = sliceImage_1_key[1];
              original_target[key_2] = sliceImage_2_key[1];
              original_target[key_3] = sliceImage_3_key[1].slice(
                0,
                sliceImage_3_key[1].indexOf("</img>")
              );

              // Add to original JSON
              targetJson.push(original_target);
            } else {
              const preImage_2 = image.slice(image.indexOf(",") + 1);

              const sliceImage_2 = preImage_2.replace(/(\r\n| |\n|\r)/gm, "");

              let sliceImage_2_key = sliceImage_2.split(":");

              // Assign Position
              let key_2 =
                sliceImage_2_key[0].charAt(0).toLowerCase() +
                sliceImage_2_key[0].slice(1).split(" ").join("");

              const original_target = {
                type: "image",
              };

              // Assign to Object
              original_target[key_1] = sliceImage_1_key[1];
              original_target[key_2] = sliceImage_2_key[1].slice(
                0,
                sliceImage_2_key[1].indexOf("</img>")
              );

              // Add to original JSON
              targetJson.push(original_target);
            }
          }
        });
      }
    });

    //features json region
    let featuresString = response.data.key_features;
    let featuresJson = [];

    // Loop through <f> tag parts*
    featuresString.split("<f>").forEach((pair) => {
      if (pair !== "") {
        // Split by end </p> tag
        let featureSplitpair = pair.split("</f>");

        // Remove line breakers
        let originalFeature = featureSplitpair[0].replace(/(\r\n|\n|\r)/gm, "");

        // Assign to object
        let featureObject = {
          type: "features",
          description: originalFeature,
        };
        // Add to original Json List
        featuresJson.push(featureObject);
      }
    });
    //end of features json region

    dispatch({
      type: GET_ARTICLEDATA_SUCCUES,
      payload: {
        Review_Article: response.data,
        Review_Article_Description: targetJson,
        Review_Article_Key_Features: featuresJson,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const getRealoadReviewArticle = (Slug) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${STRAPI_BASE_URL}/articles?Slug=${Slug}`
    );

    let descriptionString = response.data[0].article_body;
    let targetJson = [];

    // Loop through <p> tag parts
    descriptionString.split("<p>").forEach((pair) => {
      if (pair !== "") {
        // Split by end </p> tag
        let splitpair = pair.split("</p>");

        // Remove line breakers
        let originalDescription = splitpair[0].replace(/(\r\n|\n|\r)/gm, "");

        // Assign to object
        let object = {
          type: "description",
          description: `<p>${originalDescription}</p>`,
        };

        // Add to original Json List
        targetJson.push(object);

        //Loop through <img> tag within splitted <p> tags
        splitpair[1].split("<img>").forEach((image) => {
          if (image.length > 1) {
            // Take image attributes from <img>
            let preImage = image.slice(0, image.indexOf(","));

            const sliceImage_1_removeSpaces = preImage.replace(
              /(\r\n| |\n|\r)/gm,
              ""
            );
            const sliceImage_1 = sliceImage_1_removeSpaces.replace(/\:/, "~");

            // Assign src Object Field
            let sliceImage_1_key = sliceImage_1.split("~");
            let key_1 =
              sliceImage_1_key[0].charAt(0).toLowerCase() +
              sliceImage_1_key[0].slice(1).split(" ").join("");

            let section_2 = image.slice(image.indexOf(",") + 1);

            if (section_2.includes(",")) {
              const sliceImage_2 = image.slice(image.indexOf(",") + 1);

              // Take position attributes from <img>
              const preImage_2 = sliceImage_2.slice(
                0,
                sliceImage_2.indexOf(",")
              );
              const sliceImage_3 = preImage_2.replace(/(\r\n| |\n|\r)/gm, "");

              // Assign position Object Field
              let sliceImage_2_key = sliceImage_3.split(":");
              let key_2 =
                sliceImage_2_key[0].charAt(0).toLowerCase() +
                sliceImage_2_key[0].slice(1).split(" ").join("");

              const sliceImage_4 = sliceImage_2.slice(
                sliceImage_2.indexOf(",") + 1
              );

              const sliceImage_4_removeSymbol = sliceImage_4.replace(/\:/, "~");
              let sliceImage_3_key = sliceImage_4_removeSymbol.split("~");

              // Assign caption
              let key_3 =
                sliceImage_3_key[0].charAt(0).toLowerCase() +
                sliceImage_3_key[0].slice(1).split(" ").join("");

              const original_target = {
                type: "image",
              };

              // Assign to Object
              original_target[key_1] = sliceImage_1_key[1];
              original_target[key_2] = sliceImage_2_key[1];
              original_target[key_3] = sliceImage_3_key[1].slice(
                0,
                sliceImage_3_key[1].indexOf("</img>")
              );

              // Add to original JSON
              targetJson.push(original_target);
            } else {
              const preImage_2 = image.slice(image.indexOf(",") + 1);

              const sliceImage_2 = preImage_2.replace(/(\r\n| |\n|\r)/gm, "");

              let sliceImage_2_key = sliceImage_2.split(":");

              // Assign Position
              let key_2 =
                sliceImage_2_key[0].charAt(0).toLowerCase() +
                sliceImage_2_key[0].slice(1).split(" ").join("");

              const original_target = {
                type: "image",
              };

              // Assign to Object
              original_target[key_1] = sliceImage_1_key[1];
              original_target[key_2] = sliceImage_2_key[1].slice(
                0,
                sliceImage_2_key[1].indexOf("</img>")
              );

              // Add to original JSON
              targetJson.push(original_target);
            }
          }
        });
      }
    });

    //features json region
    let featuresString = response.data[0].key_features;
    let featuresJson = [];

    // Loop through <f> tag parts*
    featuresString.split("<f>").forEach((pair) => {
      if (pair !== "") {
        // Split by end </p> tag
        let featureSplitpair = pair.split("</f>");

        // Remove line breakers
        let originalFeature = featureSplitpair[0].replace(/(\r\n|\n|\r)/gm, "");

        // Assign to object
        let featureObject = {
          type: "features",
          description: originalFeature,
        };
        // Add to original Json List
        featuresJson.push(featureObject);
      }
    });
    //end of features json region

    dispatch({
      type: GET_ARTICLEDATA_SUCCUES,
      payload: {
        Review_Article: response.data[0],
        Review_Article_Description: targetJson,
        Review_Article_Key_Features: featuresJson,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const getStrapiHubBanner = () => async (dispatch) => {
  try {
    const response = await axios.get(`${STRAPI_BASE_URL}/articles`);
    dispatch({
      type: GET_STRAPIHUB_BANNER_SUCCUES,
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
};
