import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  DELETE_TASK_API_URL,
  GET_TASKS_API_URL,
  POST_TASK_API_URL,
  UPDATE_TASK_API_URL,
  UPDATE_COMPLETED_TASK_API_URL,
} from "../../utills/apiUrl";

import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
  patchRequest,
} from "../../utills/requestMethods";

const updateItemFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (updateData) => {
    console.log(updateData);
    const options = {
      body: JSON.stringify(updateData),
    };
    return await putRequest(apiURL, options);
  });
};

export const fetchUpdateItemData = updateItemFetchThunk(
  "fetchUpdateItems",
  UPDATE_TASK_API_URL // 요청 url
);

const getItemsFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (userId) => {
    // console.log(apiURL, userId);
    const fullPath = `${apiURL}/${userId}`;
    return await getRequest(fullPath);
  });
};

export const fetchGetItemsData = getItemsFetchThunk(
  "fetchGetItems", // action type
  GET_TASKS_API_URL // 요청 url
);

const postItemsFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (postData) => {
    // console.log(postData);
    const options = {
      body: JSON.stringify(postData),
    };
    return await postRequest(apiURL, options);
  });
};

export const fetchPostItemData = postItemsFetchThunk(
  "fetchPostItems",
  POST_TASK_API_URL // 요청 url
);


const updateCompletedFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (completedData) => {
     console.log(completedData);

    const options = {
      Method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(completedData),
    };
    return await patchRequest(apiURL, options);
  });
};

export const fetchUpdateCompletedData = updateCompletedFetchThunk(
  "fetchupdateCompleteditem",
  UPDATE_COMPLETED_TASK_API_URL // 요청 url
);



const deleteItemFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (id) => {
    // console.log(apiURL, id);
    const options = {
      method: "DELETE",
    };
    const fullPath = `${apiURL}/${id}`;
    return await deleteRequest(fullPath, options);
  });
};

const handleFulfilled = (stateKey) => (state, action) => {
  state[stateKey] = action.payload; // action.payload에 응답 데이터가 들어있음
};

const handleRejected = (state, action) => {
  console.log("Error", action.payload);
  state.isError = true;
};
//delete item

export const fetchDeleteItemData = deleteItemFetchThunk(
  "fetchDeleteItem", // action type
  DELETE_TASK_API_URL
);

//post item

//create slice

const apiSlice = createSlice({
  name: "apis", // slice 이름
  initialState: {
    // 초기상태
    getItemsData: null,
    deleteItemData: null,
    postItemData: null,
    updateItemData: null,
    updateCompletedData: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetItemsData.fulfilled, handleFulfilled("getItemsData"))
      .addCase(fetchGetItemsData.rejected, handleRejected)

      .addCase(fetchDeleteItemData.fulfilled, handleFulfilled("deleteItemData"))
      .addCase(fetchDeleteItemData.rejected, handleRejected)

      .addCase(fetchPostItemData.fulfilled, handleFulfilled("postItemData"))
      .addCase(fetchPostItemData.rejected, handleRejected)

      .addCase(fetchUpdateItemData.fulfilled, handleFulfilled("updateItemData"))
      .addCase(fetchUpdateItemData.rejected, handleRejected)

      .addCase(fetchUpdateCompletedData.fulfilled, handleFulfilled("updateCompletedData"))
      .addCase(fetchUpdateCompletedData.rejected, handleRejected);
  },
}); // slice 객체 저장

export default apiSlice.reducer;
