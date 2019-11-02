import { IExperiment, IPerson, IStrategy } from '../interfaces';
import { companyStrategy, randomStrategy, oneFromCompanyStrategy, everyThreeStrategy, notOverfullStrategy } from './strategies';


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
                const n: number = this.experiments[experimentsCount - 1].applicantsNumber ?
                    this.experiments[experimentsCount - 1].applicantsNumber :
                    0;
                overfull = n > this.experiments[experimentsCount - 1].barCapacity;
            }

            const decidedToGO: number[] = this.startQuiz(people, overfull);
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
            people.push({
                _id: i,
                friendsIds: this.getRandomArray(i),
                lastDecisions: new Array(),
                lastResults: new Array(),
                coefficient: this.getRandomInt(5),
                strategy: strategies[strategy.i].index,
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
        const max: number = id > 3 ? 3 : id;
        const nmbr: number = Math.floor(Math.random() * Math.floor(max));
        for (let i: number = 0; i <= nmbr; i++) {
            let ins: number = Math.floor(Math.random() * Math.floor(id - 1));
            ins = Math.floor(Math.random() * Math.floor(id));
            if (ins !== id) {
                arr.push(ins);
            }
        }
        return arr;
    }
    private startQuiz(people: IPerson[], lastExpbarOverfull: boolean): number[] {
        const list: number[] = [];
        people = people.map((item: IPerson) => {
            let result: boolean;
            item = checkStrategy(item, people);
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
        strategy.forEach((el: IStrategy) => el.count = 0);
        for (let i: number = 0; i < 10; i++) {
            strategy.push({ name: i.toString(), index: i, count: 0 });
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

export function checkStrategy(person: IPerson, people: IPerson[]): IPerson {
    if (!person.lastResults.splice(person.coefficient).includes(true)) {
        person.strategy = people[Math.floor(Math.random() * Math.floor(people.length))].strategy;
        console.log(person.strategy);
        // переписать, выбирается любос 0 до 10 вне зависомти стоит галочка или нет
    }
    return { ...person };
}
