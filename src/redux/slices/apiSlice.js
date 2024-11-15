import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  DELETE_TASK_API_URL,
  GET_TASKS_API_URL,
  POST_TASK_API_URL,
  UPDATE_TASK_API_URL,
  UPDATE_COMPLETED_TASK_API_URL,
} from "../../utils/apiUrl";
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
  patchRequest,
} from "../../utils/requestMethods";

const updateItemFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (updateData) => {
    const options = {
      body: JSON.stringify(updateData),
    };

    return await putRequest(apiURL, options);
  });
};

// update item data
export const fetchUpdateItemData = updateItemFetchThunk(
  "fetchUpdateItem", // action type
  UPDATE_TASK_API_URL // 요청 url
); // thunk 함수 호출

const getItemsFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (userId) => {
    // console.log(apiURL, userId);
    const fullPath = `${apiURL}/${userId}`;
    return await getRequest(fullPath);
  });
};

// get items data
export const fetchGetItemsData = getItemsFetchThunk(
  "fetchGetItems", // action type
  GET_TASKS_API_URL // 요청 url
); // thunk 함수 호출

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

// delete item
export const fetchDeleteItemData = deleteItemFetchThunk(
  "fetchDeleteItem",
  DELETE_TASK_API_URL
);

// post thunk function 정의
const postItemFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (postData) => {
    // console.log(postData);
    const options = {
      body: JSON.stringify(postData), // 표준 json 문자열로 변환
    };
    return await postRequest(apiURL, options);
  });
};

// post item
export const fetchPostItemData = postItemFetchThunk(
  "fetchPostItem",
  POST_TASK_API_URL
);

// update completed thunk function 정의
const updateCompletedFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (completedData) => {
    console.log(completedData);

    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(completedData), // 표준 json 문자열로 변환
    };
    return await patchRequest(apiURL, options);
  });
};

// update completed item
export const fetchUpdateCompletedData = updateCompletedFetchThunk(
  "fetchupdateCompletedItem",
  UPDATE_COMPLETED_TASK_API_URL
);

// handleFulfilled 함수 정의 : 요청 성공 시 상태 업데이트 로직을 별도의 함수로 분리
const handleFulfilled = (stateKey) => (state, action) => {
  state[stateKey] = action.payload; // action.payload에 응답 데이터가 들어있음
};

// handleRejected 함수 정의 : 요청 실패 시 상태 업데이트 로직을 별도의 함수로 분리
const handleRejected = (state, action) => {
  console.log("Error", action.payload);
  state.isError = true;
};

// create slice
const apiSlice = createSlice({
  name: "apis", // slice 기능 이름
  initialState: {
    // 초기 상태 지정
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

      .addCase(
        fetchUpdateCompletedData.fulfilled,
        handleFulfilled("updateCompletedData")
      )
      .addCase(fetchUpdateCompletedData.rejected, handleRejected);
  },
}); // slice 객체 저장

export default apiSlice.reducer;
