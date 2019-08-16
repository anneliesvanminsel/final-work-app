import { Injectable } from '@angular/core';
import { Crossword } from '../models/crossword/crossword.model';

@Injectable()
export class CrosswordsService {
    constructor(private _localData, private _remoteData) {
    }

    public getIssues(): Promise<number> {
        return new Promise((resolve, reject) => {
            let crosswordsPerIssue = 5;

            this._remoteData
                .getIssues(crosswordsPerIssue)
                .then(issues => resolve(issues))
                .catch(() => {
                    this._localData
                        .getIssues(crosswordsPerIssue)
                        .then(issues => resolve(issues));
                })
                .catch((error) => reject(error));
        });
    }
}
