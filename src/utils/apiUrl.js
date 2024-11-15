const rootPath = "http://localhost:8000";
// const rootPath = "http://34.224.166.207";

const GET_TASKS_API_URL = `${rootPath}/getTasks`;
const DELETE_TASK_API_URL = `${rootPath}/deleteTask`;
const POST_TASK_API_URL = `${rootPath}/postTask`;
const UPDATE_TASK_API_URL = `${rootPath}/updateTask`;
const UPDATE_COMPLETED_TASK_API_URL = `${rootPath}/updateCompletedTask`;

export {
  GET_TASKS_API_URL,
  DELETE_TASK_API_URL,
  POST_TASK_API_URL,
  UPDATE_TASK_API_URL,
  UPDATE_COMPLETED_TASK_API_URL,
};
