import {
  GET_STRAPIDATA_SUCCUES,
  GET_ARTICLEDATA_SUCCUES,
  GET_STRAPIHUB_BANNER_SUCCUES,
} from "../../actions/types";

const intialState = {
  IsLoading: true,
  Articles_Data: [],
  Category_Data: null,
  Review_Article: null,
  Review_Article_Description: null,
  Review_Article_Key_Features: null,
  Articles_Hub_Data: [],
};

export default function (state = intialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_STRAPIDATA_SUCCUES:
      return {
        ...state,
        Articles_Data: payload.Articles_Data,
        Category_Data: payload.Category_Data,
        IsLoading: false,
      };
    case GET_ARTICLEDATA_SUCCUES:
      return {
        ...state,
        Review_Article: payload.Review_Article,
        Review_Article_Description: payload.Review_Article_Description,
        Review_Article_Key_Features: payload.Review_Article_Key_Features,
        IsLoading: false,
      };
    case GET_STRAPIHUB_BANNER_SUCCUES:
      return {
        ...state,
        Articles_Hub_Data: payload,
        IsLoading: false,
      };

    default:
      return state;
  }
}
