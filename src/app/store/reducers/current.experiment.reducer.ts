import {
    AddStrategiesToExperiment,
    ExperimentsActionsTypes,
    InitExperimentSuccess,
    StartQuizSuccess,
} from '../actions/experiment.actions';
import { IExperiment } from 'app/interfaces';
const initState: IExperiment = { _id: 1, barCapacity: 100, strategies: [] };

export function currentExperimentReducer(state: IExperiment = initState, action: ExperimentsActionsTypes): IExperiment {
    if (action instanceof InitExperimentSuccess) {
        return action.payload;
    }
    if (action instanceof StartQuizSuccess) {
        state.applicantsNumber = action.payload.length;
        action.payload.length = action.payload.length > state.barCapacity ? state.barCapacity : action.payload.length;
        state.customers = [... action.payload];
        return state;
    }
    if (action instanceof AddStrategiesToExperiment) {
        console.log(`adding `, action.payload);
        state.strategies = [... action.payload];
        return { ...state};
    }
    return state;
}
