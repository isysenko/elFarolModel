import { IExperiment, IPerson, IStrategy } from '../interfaces';
import {
    alwaysTrueStrategy,
    companyStrategy,
    everyThreeStrategy,
    notOverfullStrategy,
    oneFromCompanyStrategy,
    randomStrategy,
} from './strategies';

export class NewExperimentsService {
    public experiments: IExperiment[];
    public constructor() {
        this.experiments = [];
    }
    public startExperiments(
        str: IStrategy[],
        barCapacity: number,
        experimentsNumber: number,
        peopleNumber: number
    ): IExperiment[] {
        let people: IPerson[] = this.generatePeoples(peopleNumber, str);
        for (let experimentsCount: number = 0; experimentsCount <= experimentsNumber - 1; experimentsCount++) {
            let overfull: boolean = false;
            if (experimentsCount > 0 && this.experiments[experimentsCount - 1].applicantsNumber !== undefined) {
                const n: number = this.experiments[experimentsCount - 1].applicantsNumber
                    ? this.experiments[experimentsCount - 1].applicantsNumber
                    : 0;
                overfull = n > this.experiments[experimentsCount - 1].barCapacity;
            }

            const decidedToGO: number[] = this.startQuiz(people, overfull, str);
            const customers: number[] = [...decidedToGO];
            customers.length = customers.length > barCapacity ? barCapacity : customers.length;
            people = people.map((item: IPerson) => {
                const id: number | undefined = customers.find((n: number) => n === item._id);
                if (item.lastResults.length >= 5) {
                    item.lastResults.shift();
                    item.lastResults.push(id === 0 ? true : !!id);
                } else {
                    item.lastResults.push(id === 0 ? true : !!id);
                }
                return item;
            });
            const currentExperiment: IExperiment = {
                _id: experimentsCount,
                barCapacity,
                customers,
                applicantsNumber: decidedToGO.length,
                strategies: this.increaseStrategiesCounters(people, str),
            };
            this.experiments.push(currentExperiment);
        }

        return this.experiments;
    }
    private generatePeoples(nmbrPeople: number, strategies: IStrategy[]): IPerson[] {
        const people: IPerson[] = [];
        // tslint:disable-next-line: typedef
        const strategy = {
            countForStrategy: Math.round(nmbrPeople / strategies.length),
            counter: 1,
            i: 0,
        };
        for (let i: number = 0; i < nmbrPeople; i++) {
            if (strategy.counter > strategy.countForStrategy && strategy.i !== strategies.length - 1) {
                strategy.counter = 1;
                strategy.i++;
            }
            let x: number = Math.floor(Math.random() * (strategies.length - 1));
            while (!strategies[x].checked) {
                x = Math.floor(Math.random() * (strategies.length - 1));
            }
            people.push({
                _id: i,
                friendsIds: this.getRandomArray(i),
                lastDecisions: new Array(),
                lastResults: new Array(),
                coefficient: this.getRandomInt(3),
                strategy: x,
                badStrategies: [],
            });
            strategy.counter++;
        }
        return people;
    }
    private getRandomInt(max: number): number {
        return Math.floor(Math.random() * Math.floor(max));
    }
    private getRandomArray(id: number): number[] {
        const arr: number[] = [];
        const max: number = id > 3 ? 2 : id - 1;
        const nmbr: number = this.getRandomInt(max);
        for (let i: number = 0; i <= nmbr; i++) {
            const ins: number = this.getRandomInt(id);
            if (!arr.includes(ins)) {
                arr.push(ins);
            }
        }
        return arr;
    }
    private startQuiz(people: IPerson[], lastExpbarOverfull: boolean, str: IStrategy[]): number[] {
        const list: number[] = [];
        people = people.map((item: IPerson) => {
            let result: boolean;
            item = checkStrategy(item, str);
            switch (item.strategy) {
                case 0:
                    result = randomStrategy();
                    break;
                case 1:
                    result = companyStrategy(item, people);
                    break;
                case 2:
                    result = oneFromCompanyStrategy(item, people);
                    break;
                case 3:
                    result = notOverfullStrategy(item, lastExpbarOverfull);
                    break;
                case 4:
                    result = everyThreeStrategy(item);
                    break;
                case 5:
                    result = alwaysTrueStrategy();
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
        people.forEach((person: IPerson) => {
            if (person.lastDecisions[person.lastDecisions.length - 1] === true) {
                list.push(person._id);
            }
        });
        return this.shuffle(list);
    }

    private increaseStrategiesCounters(people: IPerson[], str: IStrategy[]): IStrategy[] {
        const strategy: IStrategy[] = [...str];
        strategy.forEach((el: IStrategy) => (el.count = 0));
        for (let i: number = 0; i < 10; i++) {
            strategy.push({ name: i.toString(), index: i, count: 0, checked: str[i].checked });
        }
        for (let i: number = 0; i < people.length; i++) {
            for (let j: number = 0; j < strategy.length; j++) {
                if (people[i].strategy === strategy[j].index) {
                    strategy[j].count++;
                }
            }
        }
        return strategy;
    }

    private shuffle(a: number[]): number[] {
        for (let i: number = a.length - 1; i > 0; i--) {
            const j: number = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }
}

export function checkStrategy(person: IPerson, strategies: IStrategy[]): IPerson {
    const start: number =
        person.coefficient >= person.lastResults.length ? 0 : person.lastResults.length - person.coefficient - 1;
    if (!person.lastResults.slice(start, person.lastResults.length).includes(true)) {
        let strLength: number = 0;
        strategies.forEach((item: IStrategy) => {
            if (item.checked) {
                strLength += 1;
            }
        });
        if (strLength === person.badStrategies.length + 1) {
            person.badStrategies = new Array();
        }
        let x: number = Math.floor(Math.random() * (strategies.length - 1));
        person.badStrategies.push(person.strategy);

        while (
            !strategies[x].checked ||
            (person.badStrategies.includes(strategies[x].index) && strategies[x].checked)
        ) {
            x = Math.floor(Math.random() * (strategies.length - 1));
        }
        person.strategy = strategies[x].index;
    }
    return { ...person };
}
