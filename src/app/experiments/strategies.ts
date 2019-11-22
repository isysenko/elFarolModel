import { IPerson } from '../interfaces';

// рандом
export function randomStrategy(): boolean {
    return Math.random() >= 0.5;
}

// если все друзья идут
export function companyStrategy(person: IPerson, people: IPerson[]): boolean {
    let res: boolean = true;
    if (person.friendsIds.length > 0) {
        person.friendsIds.forEach((el: number) => {
            if (people[el].lastDecisions[people[el].lastDecisions.length - 1] === false) {
                res = false;
            }
        });
    }
    return res;
}

// если хоть кто-то из друзей идет
export function oneFromCompanyStrategy(person: IPerson, people: IPerson[]): boolean {
    let res = false;
    if (person.friendsIds.length > 0) {
        person.friendsIds.forEach((el: number) => {
            if (people[el].lastDecisions[people[el].lastDecisions.length - 1] === true) {
                res = true;
            }
        });
    }
    return res;
}

// если в прошлый раз он не пошел или пошел и бар не был переполнен
export function notOverfullStrategy(person: IPerson, lastExpbarOverfull: boolean): boolean {
    if (
        (person.lastDecisions[person.lastDecisions.length - 1] && !lastExpbarOverfull) ||
        !person.lastDecisions[person.lastDecisions.length - 1]
    ) {
        return true;
    }
    return false;
}

// ходит в баз через раз
export function everyThreeStrategy(person: IPerson): boolean {
    return !person.lastDecisions[person.lastDecisions.length - 1];
}

// всегда говори да
export function alwaysTrueStrategy(): boolean {
    return true;
}

// если дорогой
export function ifExpensiveStrategy(price: string): boolean {
    return price === 'expensive';
}

// если дешевый
export function ifInexpensiveStrategy(price: string): boolean {
    return price === 'inexpensive';
}

// если не доpoгой
export function ifNotExpensiveStrategy(price: string): boolean {
    return price !== 'expensive' && Math.floor(Math.random() * 10) > 3;
}
// если не доpoгой и в прошлый раз попал
export function ifNotExpensive2Strategy(price: string, person: IPerson): boolean {
    return price !== 'expensive' && person.lastResults[person.lastResults.length - 1];
}
