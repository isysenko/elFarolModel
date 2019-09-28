
import { IPerson } from 'app/interfaces';
import { InitPeopleSuccess, PeopleActionsTypes, StartQuizPending } from '../actions/people.actions';
const initialState: IPerson[] = [];

export function peopleReducer(
    state: IPerson[] = initialState, action: PeopleActionsTypes
): IPerson[] {
    if (action instanceof InitPeopleSuccess) {
        return action.payload;
    }
    if (action instanceof StartQuizPending) {
        state.forEach((item: IPerson) => {
            if (item.lastDecisions.length >= 5) {
                item.lastDecisions.shift();
                item.lastDecisions.push(Math.random() >= 0.5);
            } else { item.lastDecisions.push(Math.random() >= 0.5); }
        });
        return state;
    }
    return state;
}