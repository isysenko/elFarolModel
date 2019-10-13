import { IPerson } from 'app/interfaces';
import { InitPeopleSuccess, PeopleActionsTypes, StartQuizPending } from '../actions/people.actions';
import { AddExperimentToList } from '../actions/experiment.actions';
const initialState: IPerson[] = [];

export function peopleReducer(state: IPerson[] = initialState, action: PeopleActionsTypes): IPerson[] {
    if (action instanceof InitPeopleSuccess) {
        return action.payload;
    }
    if (action instanceof StartQuizPending) {
        state.forEach((item: IPerson) => {
            let result: boolean;
            switch (item.strategy) {
                case 0:
                    result = randomStrategy();
                    break;
                default:
                    result = randomStrategy();
                    break;
            }
            if (item.lastDecisions.length >= 5) {
                item.lastDecisions.shift();
                item.lastDecisions.push(result);
            } else {
                item.lastDecisions.push(result);
            }
        });
        return state;
    }
    if (action instanceof AddExperimentToList) {
        return state.map((item: IPerson) => {
            if (action.payload.customers) {
                const id: number | undefined = action.payload.customers.find((n: number) => n === item._id);
                if (item.lastResults.length >= 5) {
                    item.lastResults.shift();
                    item.lastResults.push(id === 0 ? true : !!id);
                } else {
                    item.lastResults.push(id === 0 ? true : !!id);
                }
            }
            return item;
        });
    }
    return state;
}

export function randomStrategy(): boolean {
    return Math.random() >= 0.5;
}
