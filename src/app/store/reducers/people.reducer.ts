import { IPerson } from 'app/interfaces';
import { InitPeopleSuccess, PeopleActionsTypes, StartQuizPending } from '../actions/people.actions';
import { AddExperimentToList } from '../actions/experiment.actions';
const initialState: IPerson[] = [];

export function peopleReducer(state: IPerson[] = initialState, action: PeopleActionsTypes): IPerson[] {
    if (action instanceof InitPeopleSuccess) {
        return action.payload;
    }
    if (action instanceof StartQuizPending) {
        state = state.map((item: IPerson) => {
            let result: boolean;
            item.strategy = checkStrategy(item, state);
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
            return item;
        });
        return [... state];
    }
    if (action instanceof AddExperimentToList) {
        state =  state.map((item: IPerson) => {
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
        return [... state];
    }
    return state;
}

export function randomStrategy(): boolean {
    return Math.random() >= 0.5;
}

export function checkStrategy(person: IPerson, people: IPerson[]): number {
    let strategyNumber: number = person.strategy;
    if (!person.lastResults.splice(3).includes(true)) {
        strategyNumber = people[Math.floor(Math.random() * Math.floor(people.length))].strategy;
    }
    return strategyNumber;
}
