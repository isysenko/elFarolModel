import { IStrategy } from './../interfaces';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IParamsPeople, IPerson } from 'app/interfaces';

@Injectable()
export class PeopleService {
    public generatePeoples(params: IParamsPeople): Observable<IPerson[]> {
        const people: IPerson[] = [];
        const strategy = {
            countForStrategy: Math.round(params.nmbrPeople / params.strategies.length),
            counter: 1,
            i: 0,
        };
        for (let i: number = 0; i < params.nmbrPeople; i++) {
            if (
                strategy.counter > strategy.countForStrategy &&
                strategy.i !== params.strategies.length - 1
            ) {
                strategy.counter = 1;
                strategy.i++;
            }
            people.push({
                _id: i,
                friendsIds: this.getRandomArray(i),
                lastDecisions: [],
                lastResults: [],
                coefficient: this.getRandomInt(5),
                strategy: params.strategies[strategy.i].index,
            });
            strategy.counter++;
        }
        return of(people);
    }

    public startQuiz(people: IPerson[]): Observable<number[]> {
        const list: number[] = [];
        people.forEach((person: IPerson) => {
            if (person.lastDecisions[person.lastDecisions.length - 1] === true) {
                list.push(person._id);
            }
        });
        return of(this.shuffle(list));
    }

    public increaseStrategiesCounters(people: IPerson[], strategy: IStrategy[]): Observable<IStrategy[]> {
        people.forEach((person: IPerson) => {
            strategy.forEach((str: IStrategy) => {
                if (str.index === person.strategy) {
                    str.count++;
                }
            });
        });
        return of(strategy);
    }

    private shuffle(a: number[]): number[] {
        for (let i: number = a.length - 1; i > 0; i--) {
            const j: number = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
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
            arr.push(ins);
        }
        return arr;
    }
}
