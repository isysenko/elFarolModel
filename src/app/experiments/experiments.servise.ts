import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IExperiment, IParamsExperiments } from 'app/interfaces';


@Injectable()
export class ExperimentsService {

    public generateExperiments(params: IParamsExperiments): Observable<IExperiment[]> {
        const experiments: IExperiment[] = [];
        for (let i: number = 0; i <= params.nmbrExperiments; i++) {
            experiments.push({ _id: i, barCapacity: params.barCapacity });
        }
        return of(experiments);
    }

}