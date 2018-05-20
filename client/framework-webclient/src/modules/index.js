import {SystemReducer} from "./ducks/System";
import {LayoutReducer} from "./ducks/Layout";
import {ProjectReducer} from "./ducks/Project";

export const moduleReducers = {
    System: SystemReducer,
    Layout: LayoutReducer,
    Project: ProjectReducer
};