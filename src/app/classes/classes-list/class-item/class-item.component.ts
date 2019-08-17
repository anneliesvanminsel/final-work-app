import { Component, OnInit, Input } from '@angular/core';
import { Classgroup } from '../../../models/classgroup.model';
import {ClassgroupService} from '../../../services/classgroup.service';
import {StudentTeacherService} from '../../../services/student-teacher.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-class-item',
    templateUrl: './class-item.component.html',
    styleUrls: ['./class-item.component.scss']
})
export class ClassItemComponent implements OnInit {
    @Input() classgroup: Classgroup;
    students$: Observable<any>;

    constructor(private classgroupService: ClassgroupService, private studenteachterService: StudentTeacherService) { }

    ngOnInit() {
        this.students$ = this.studenteachterService.getStudentsByClass(this.classgroup.id);
    }
}
