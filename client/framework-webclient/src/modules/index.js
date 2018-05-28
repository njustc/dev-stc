import {SystemReducer} from "./ducks/System";
import {LayoutReducer} from "./ducks/Layout";
import {ProjectReducer} from "./ducks/Project";
import {ConsignReducer} from "./ducks/Consign";

export const moduleReducers = {
    System: SystemReducer,
    Layout: LayoutReducer,
    Project: ProjectReducer,
    Consign: ConsignReducer
};