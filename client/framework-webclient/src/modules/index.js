import {SystemReducer} from "./ducks/System";
import {ConsignReducer} from "./ducks/Consign";
import {LayoutReducer} from "./ducks/Layout";
import {ContrastReducer} from "./ducks/Contrast";

export const moduleReducers = {
    System: SystemReducer,
    Consign: ConsignReducer,
    Contrast: ContrastReducer,
    Layout: LayoutReducer
};