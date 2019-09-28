import { ExperimentsActionsTypes, InitExperimentsSuccess, StartQuizSuccess } from '../actions/experiment.actions';
import { IExperiment } from 'app/interfaces';
const initialState: IExperiment[] = [];

export function experimnetsReducer(
  state: IExperiment[] = initialState,
  action: ExperimentsActionsTypes
): IExperiment[] {
  if (action instanceof InitExperimentsSuccess) {
    return action.payload;
  }
  return state;
}