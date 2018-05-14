import {SystemReducer} from "./ducks/System";
import {ConsignReducer} from "./ducks/Consign";
import {LayoutReducer} from "./ducks/Layout";

export const moduleReducers = {
    System: SystemReducer,
    Consign: ConsignReducer,
    Layout: LayoutReducer
};