import { Component, OnInit } from '@angular/core';
import { Classgroup } from '../../models/classgroup.model';
import { ClassgroupService } from "../../services/classgroup.service";

@Component({
    selector: 'app-classes-list',
    templateUrl: './classes-list.component.html',
    styleUrls: ['./classes-list.component.scss'],
})
export class ClassesListComponent implements OnInit {
    classgroups: Classgroup[];

    constructor(private classgroupService: ClassgroupService){

    }

    ngOnInit() {
        this.classgroupService.getClassgroups().subscribe(classes => {
            this.classgroups = classes;
        });
    }
}
