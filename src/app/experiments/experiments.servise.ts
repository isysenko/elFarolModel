import { Injectable } from '@angular/core';
import { IExperiment, IParamsExperiments } from 'app/interfaces';
import { Observable, of } from 'rxjs';

@Injectable()
export class ExperimentsService {
    public generateExperiment(params: IParamsExperiments): Observable<IExperiment> {
        const exp: IExperiment = { _id: 1, barCapacity: params.barCapacity };
        return of(exp);
    }
}
