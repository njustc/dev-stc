import {SystemReducer} from "./ducks/System";
import {ConsignReducer} from "./ducks/Consign";

export const moduleReducers = {
    System: SystemReducer,
    Consign: ConsignReducer,
};