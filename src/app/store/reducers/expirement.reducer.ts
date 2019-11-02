import { AddExperimentToList, ExperimentsActions, ExperimentsActionsTypes } from '../actions/experiment.actions';
import { IExperiment } from '../../interfaces';
const initialState: IExperiment[] = [];

export function experimentsReducer(
    state: IExperiment[] = initialState,
    action: ExperimentsActionsTypes
): IExperiment[] {
    if (action instanceof AddExperimentToList) {
        action.payload.forEach((el: IExperiment) => { el._id = state.length; state.push(el); });
        return [...state];
    }
    if (action.type === ExperimentsActions.RESET) {
        return [];
    }
    return state;
}
