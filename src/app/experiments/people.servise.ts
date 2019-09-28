import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IParamsPeople, IPerson } from 'app/interfaces';

@Injectable()
export class PeopleService {
    public generateExperiments(params: IParamsPeople): Observable<IPerson[]> {
        const experiments: IPerson[] = [];
        for (let i: number = 0; i <= params.nmbrPeople; i++) {
            experiments.push({
                _id: i,
                friendsIds: this.getRandomArray(params.nmbrPeople, i),
                lastDecisions: [],
                lastResults: [],
                coefficient: this.getRandomInt(5),
            });
        }
        return of(experiments);
    }

    public startQuiz(people: IPerson[]): Observable<number[]> {
        const list: number[] = [];
        people.forEach((person: IPerson) => {
            if (person.lastDecisions[person.lastDecisions.length - 1] === true) {
                list.push(person._id);
            }
        });
        return of(list);
    }

    private getRandomInt(max: number): number {
        return Math.floor(Math.random() * Math.floor(max));
    }

    private getRandomArray(numberPerson: number, id: number): number[] {
        const arr: number[] = [];
        const nmbr: number = Math.floor(Math.random() * Math.floor(3));
        for (let i: number = 0; i <= nmbr; i++) {
            let ins: number = Math.floor(Math.random() * Math.floor(numberPerson));
            if (ins !== id) {
                arr.push(ins);
            } else {
                ins = Math.floor(Math.random() * Math.floor(numberPerson));
                arr.push(ins);
            }
        }
        return arr;
    }
}
