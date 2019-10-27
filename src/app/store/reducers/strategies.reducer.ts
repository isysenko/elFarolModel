import { StrategiesActions, StrategiesActionsTypes } from '../actions/strategies.actions';
import { IStrategy } from 'app/interfaces';

const initialState: IStrategy[] = [];

export function strategiesReducer(state: IStrategy[] = initialState, action: StrategiesActionsTypes): IStrategy[] {
    if (action.type === StrategiesActions.INIT_STRATEGIES) {
        return Array.from(action.payload);
    }
    return state;
}
