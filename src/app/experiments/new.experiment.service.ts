import { IExperiment, IPerson, IStrategy, ResultType } from '../interfaces';
import {
    alwaysTrueStrategy,
    companyStrategy,
    everyThreeStrategy,
    ifExpensiveStrategy,
    ifInexpensiveStrategy,
    ifNotExpensive2Strategy,
    ifNotExpensiveStrategy,
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
    ): ResultType {
        let people: IPerson[] = this.generatePeoples(peopleNumber, str);
        let barPrice: string = 'inexpensive';
        for (let experimentsCount: number = 0; experimentsCount <= experimentsNumber - 1; experimentsCount++) {
            let overfull: boolean = false;
            if (experimentsCount > 0 && this.experiments[experimentsCount - 1].applicantsNumber !== undefined) {
                const n: number = this.experiments[experimentsCount - 1].applicantsNumber
                    ? this.experiments[experimentsCount - 1].applicantsNumber
                    : 0;
                overfull = n > this.experiments[experimentsCount - 1].barCapacity;
            }

            const decidedToGO: number[] = this.startQuiz(people, overfull, str, barPrice);
            const customers: number[] = [...decidedToGO];
            customers.length = customers.length > barCapacity ? barCapacity : customers.length;
            people = people.map((item: IPerson) => {
                const id: number | undefined = customers.find((n: number) => n === item._id);
                if (item.lastResults.length >= 10) {
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
                barPrice,
                customers,
                applicantsNumber: decidedToGO.length,
                strategies: this.increaseStrategiesCounters(people, str),
            };
            this.experiments.push(currentExperiment);
            if (this.experiments.length > 4) {
                const sliceExp: IExperiment[] = this.experiments.slice(
                    this.experiments.length - 3,
                    this.experiments.length
                );
                const arr: number[] = sliceExp.map((exp: IExperiment) => exp.applicantsNumber - exp.barCapacity);
                // tslint:disable-next-line: no-any
                const res: any = [[false, false, false], [false, false, false]];
                for (let i: number = 0; i < 4; i++) {
                    if (arr[i] > 10) {
                        res[0][i] = true;
                    }
                    if (arr[i] < -10) {
                        res[1][i] = true;
                    }
                }
                if (!res[0].includes(false)) {
                    barPrice = 'expensive';
                } else {
                    if (!res[1].includes(false)) {
                        barPrice = 'inexpensive';
                    } else {
                        barPrice = 'medium';
                    }
                }
            }
        }
        return { experiments: this.experiments, people: people };
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
            const randNum: number = this.getRandomInt(9);
            people.push({
                _id: i,
                friendsIds: this.getRandomArray(i),
                lastDecisions: new Array(),
                lastResults: new Array(),
                coefficient: randNum,
                startCoeficient: randNum,
                strategy: x,
                badStrategies: [],
                strategyChange: [
                    { id: 0, count: [0] },
                    { id: 1, count: [0] },
                    { id: 2, count: [0] },
                    { id: 3, count: [0] },
                    { id: 4, count: [0] },
                    { id: 5, count: [0] },
                    { id: 6, count: [0] },
                    { id: 7, count: [0] },
                    { id: 8, count: [0] },
                    { id: 9, count: [0] },
                ],
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
    private startQuiz(people: IPerson[], lastExpbarOverfull: boolean, str: IStrategy[], barPrice: string): number[] {
        const list: number[] = [];
        people = people.map((item: IPerson) => {
            let result: boolean;
            item = checkStrategy(item, str, lastExpbarOverfull);
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
                case 6:
                    result = ifExpensiveStrategy(barPrice);
                    break;
                case 7:
                    result = ifInexpensiveStrategy(barPrice);
                    break;
                case 8:
                    result = ifNotExpensiveStrategy(barPrice);
                    break;
                case 9:
                    result = ifNotExpensive2Strategy(barPrice, item);
                    break;
                default:
                    result = randomStrategy();
                    break;
            }
            if (item.lastDecisions.length >= 10) {
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
        const strat: IStrategy[] = [...str];
        strat.forEach((el: IStrategy) => (el.count = 0));
        const strategy: IStrategy[] = [];
        for (let i: number = 0; i < 10; i++) {
            strategy.push({
                name: i.toString(),
                index: i,
                count: 0,
                checked: str[i].checked,
                success: 0,
                failed: 0,
                neytral: 0,
                percentToGo: 0,
            });
        }
        for (let i: number = 0; i < people.length; i++) {
            for (let j: number = 0; j < strategy.length; j++) {
                if (people[i].strategy === strategy[j].index) {
                    strategy[j].count++;
                }
            }
        }
        for (let i: number = 0; i < people.length; i++) {
            for (let j: number = 0; j < strategy.length; j++) {
                if (people[i].strategy === strategy[j].index) {
                    if (
                        people[i].lastDecisions[people[i].lastDecisions.length - 1] &&
                        !people[i].lastResults[people[i].lastResults.length - 1]
                    ) {
                        strategy[j].failed++;
                    } else {
                        if (!people[i].lastDecisions[people[i].lastDecisions.length - 1]) {
                            strategy[j].neytral++;
                        } else {
                            strategy[j].success++;
                        }
                    }
                    if (people[i].lastDecisions[people[i].lastDecisions.length - 1]) {
                        strategy[j].percentToGo++;
                    }
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

export function checkStrategy(person: IPerson, strategies: IStrategy[], lastTimeOverfull: boolean): IPerson {
    if (
        lastTimeOverfull &&
        person.lastDecisions[person.lastDecisions.length - 1] &&
        person.lastResults[person.lastResults.length - 1] &&
        person.coefficient > 0
    ) {
        person.coefficient--;
    }
    if (
        lastTimeOverfull &&
        person.lastDecisions[person.lastDecisions.length - 1] &&
        !person.lastResults[person.lastResults.length - 1] &&
        person.coefficient > 1
    ) {
        person.coefficient -= 2;
    }
    if (
        !lastTimeOverfull &&
        person.lastDecisions[person.lastDecisions.length - 1] &&
        person.lastResults[person.lastResults.length - 1] &&
        person.coefficient < 8
    ) {
        person.coefficient += 1;
    }
    const start: number =
        person.coefficient >= person.lastResults.length ? 0 : person.lastResults.length - person.coefficient - 1;
    if (!person.lastResults[start]) {
        person.coefficient = person.startCoeficient;
        let strLength: number = 0;
        strategies.forEach((item: IStrategy) => {
            if (item.checked) {
                strLength += 1;
            }
        });
        if (strLength === person.badStrategies.length + 1) {
            person.badStrategies = new Array();
        }
        let x: number = Math.floor(Math.random() * strategies.length);
        person.badStrategies.push(person.strategy);
        let count: number = 0;
        while (
            count <= 100 &&
            (!strategies[x].checked || (person.badStrategies.includes(strategies[x].index) && strategies[x].checked))
        ) {
            count += 1;
            x = Math.floor(Math.random() * (strategies.length - 1));
        }
        person.strategy = strategies[x].index;
        person.strategyChange[strategies[x].index].count.push(1);
    } else {
        person.strategyChange[person.strategy].count[person.strategyChange[person.strategy].count.length - 1] += 1;
    }
    return { ...person };
}
