import { StrategiesActions, StrategiesActionsTypes } from '../actions/strategies.actions';
import { IStrategy } from 'app/interfaces';

const initialState: IStrategy[] = [];

export function strategiesReducer(state: IStrategy[] = initialState, action: StrategiesActionsTypes): IStrategy[] {
    if (action.type === StrategiesActions.INIT_STRATEGIES) {
        return action.payload;
    }
    if (action.type === StrategiesActions.UPDATE_STRATEGIES) {
        return action.payload;
    }
    return state;
}
