import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Classgroup } from '../../models/classgroup.model';
import { ClassgroupService } from "../../services/classgroup.service";

@Component({
    selector: 'app-classes-detail',
    templateUrl: './classes-detail.component.html',
    styleUrls: ['./classes-detail.component.scss']
})
export class ClassesDetailComponent implements OnInit {
    private _classid: string;
    private _link: string ="/teacher/classes/addstudent/";
    private _class: Classgroup;

    constructor(private classgroupService: ClassgroupService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this._classid = params.get("classid")
        });

        this._link += this._classid;

        this.setClass();
    }

    async setClass() {
        await this.classgroupService.getClassgroupFromDb(this._classid);
        this._class = this.classgroupService.class;
    }

}
