import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import authReducer from "./Auth/Reducer";
import authorReducer from "./Author/Reducer";
import bookReducer from "./Book/Reducer";
import categoryReducer from "./Category/Reducer";
import reviewReducer from "./Review/Reducer";
import readingListReducer from "./Readinglist/Reducer";


const rootReducer = combineReducers({
    auth:authReducer,
    author:authorReducer,
    book:bookReducer,
    category:categoryReducer,
    review:reviewReducer, 
    readinglist:readingListReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))