import { IPerson } from '../interfaces';

// рандом
export function randomStrategy(): boolean {
    return Math.random() >= 0.5;
}

// если все друзья идут
export function companyStrategy(person: IPerson, people: IPerson[]): boolean {
    let res = true;
    if (person.friendsIds.length > 0) {
        person.friendsIds.forEach((el: number) => {
            if (people[el].lastDecisions[people[el].lastDecisions.length - 1] === false) {
                console.log("1 !!!!!");
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
                console.log("2 !!!!!");
                res = true;
            }
        });
    }
    return res;
}

// если в прошлый раз он не пошел или пошел и бар не был переполнен
export function notOverfullStrategy(person: IPerson, lastExpbarOverfull: boolean): boolean {
    console.log("3 !!!!!");
    if ((person.lastDecisions[person.lastDecisions.length - 1]
        && !lastExpbarOverfull) ||
        !person.lastDecisions[person.lastDecisions.length - 1]) {
        return true;
    }
    return false;
}

// ходит в баз через раз
export function everyThreeStrategy(person: IPerson): boolean {
    console.log("4 !!!!!");
    return !person.lastDecisions[person.lastDecisions.length - 1];
}

//