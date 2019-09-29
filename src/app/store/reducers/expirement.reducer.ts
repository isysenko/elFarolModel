import { AddExperimentToList, ExperimentsActions, ExperimentsActionsTypes } from '../actions/experiment.actions';
import { IExperiment } from 'app/interfaces';
const initialState: IExperiment[] = [];

export function experimentsReducer(
    state: IExperiment[] = initialState,
    action: ExperimentsActionsTypes
): IExperiment[] {
    if (action instanceof AddExperimentToList) {
        action.payload._id = state.length;
        state.push(action.payload);
        return Array.from(state);
    }
    if (action.type === ExperimentsActions.RESET) {
        return Array.from([]);
    }
    return state;
}
