import { combineReducers } from "redux";
import authReducer from './authReducer';
import DalalbullReducer from "../DalalbullReducer/Dalalbull.Reducer";
import KryptosReducer from "../KryptosReducer/Kryptos.Reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    Dalalbull: DalalbullReducer,
    Kryptos: KryptosReducer,
});

export type rootType = ReturnType<typeof rootReducer>;

export default rootReducer;