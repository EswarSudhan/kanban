// import { combineReducers } from "redux";
// import { persistReducer, persistStore } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// // slices
// import authReducer from "../redux/slices/authSlice";
// import kanbanReducer from "../redux/slices/kanbanSlice";
// import interviewerReducer from "../redux/slices/interviewerSlice";
// import searchListReducer from "../redux/slices/searchSlice";
// import summaryReducer from "../redux/slices/summarySlice";
// import webCanReducer from "../redux/slices/webCandidatesSlice";
// // ----------------------------------------------------------------------

// const authPersistConfig = {
//   key: "auth",
//   storage,
//   keyPrefix: "redux-",
//   whitelist: ["isAuthenticated", "userDetails"],
//   blacklist: ["isLoading"],
// };

// const kanbanPersistConfig = {
//   key: "kanban",
//   storage,
//   keyPrefix: "redux-",
//   whitelist: ["addTask", "moveTask"],
//   blacklist: ["isLoading"],
// };

// const interviewerPersistConfig = {
//   key: "interviewer",
//   storage,
//   keyPrefix: "redux-",
//   whitelist: ["addTask", "moveTask"],
//   blacklist: ["isLoading"],
// };

// const searchListConfig = {
//   key: "search",
//   storage,
//   keyPrefix: "redux-",
//   whitelist: [],
//   blacklist: ["isLoading"],
// };

// const summaryPersistConfig = {
//   key: "summary",
//   storage,
//   keyPrefix: "redux-",
//   whitelist: [],
//   blacklist: ["isLoading"],
// };
// const webCanPersistConfig = {
//   key: "webcandidate",
//   storage,
//   keyPrefix: "redux-",
//   whitelist: ["jobDetails"],
//   blacklist: ["isLoading"],
// };

// const rootReducer = combineReducers({
//   auth: persistReducer(authPersistConfig, authReducer),
//   kanban: persistReducer(kanbanPersistConfig, kanbanReducer),
//   interviewer: persistReducer(interviewerPersistConfig, interviewerReducer),
//   search: persistReducer(searchListConfig, searchListReducer),
//   summary: persistReducer(summaryPersistConfig, summaryReducer),
//   webcandidate: persistReducer(webCanPersistConfig, webCanReducer),
// });

// const persistedReducer = persistReducer({ key: "root", storage }, rootReducer);

// const reducers = (state, action) => {
//   if (action.type === "USER_LOGOUT") {
//     const store = persistStore();
//     store.purge(); // This will clear the entire persisted state
//     return persistedReducer(undefined, action);
//   }
//   return persistedReducer(state, action);
// };

// export { rootReducer, reducers };


import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
// slices
import authReducer from "../redux/slices/authSlice";
import kanbanReducer from "../redux/slices/kanbanSlice";
import interviewerReducer from "../redux/slices/interviewerSlice";
import searchListReducer from "../redux/slices/searchSlice";
import summaryReducer from "../redux/slices/summarySlice";
import webCanReducer from "../redux/slices/webCandidatesSlice";
import exampleReducer from "../redux/slices/newCanSlice"; // Import the new slice

const authPersistConfig = {
  key: "auth",
  storage,
  keyPrefix: "redux-",
  whitelist: ["isAuthenticated", "userDetails"],
  blacklist: ["isLoading"],
};

const kanbanPersistConfig = {
  key: "kanban",
  storage,
  keyPrefix: "redux-",
  whitelist: ["addTask", "moveTask"],
  blacklist: ["isLoading"],
};

const interviewerPersistConfig = {
  key: "interviewer",
  storage,
  keyPrefix: "redux-",
  whitelist: ["addTask", "moveTask"],
  blacklist: ["isLoading"],
};

const searchListConfig = {
  key: "search",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
  blacklist: ["isLoading"],
};

const summaryPersistConfig = {
  key: "summary",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
  blacklist: ["isLoading"],
};

const webCanPersistConfig = {
  key: "webcandidate",
  storage,
  keyPrefix: "redux-",
  whitelist: ["jobDetails"],
  blacklist: ["isLoading"],
};

const examplePersistConfig = {
  key: "example",
  storage,
  keyPrefix: "redux-",
  whitelist: ["exampleState"],
  blacklist: ["isLoading"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  kanban: persistReducer(kanbanPersistConfig, kanbanReducer),
  interviewer: persistReducer(interviewerPersistConfig, interviewerReducer),
  search: persistReducer(searchListConfig, searchListReducer),
  summary: persistReducer(summaryPersistConfig, summaryReducer),
  webcandidate: persistReducer(webCanPersistConfig, webCanReducer),
  example: persistReducer(examplePersistConfig, exampleReducer), // Add the new slice
});

const persistedReducer = persistReducer({ key: "root", storage }, rootReducer);

const reducers = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    state = undefined;
    storage.removeItem('persist:root'); // This will clear the entire persisted state
  }
  return persistedReducer(state, action);
};

export { rootReducer, reducers };
