import { Component, OnInit, Input } from '@angular/core';
import { Classgroup } from '../../../models/classgroup.model';
import {ClassgroupService} from '../../../services/classgroup.service';
import {StudentTeacherService} from '../../../services/student-teacher.service';
import {Student} from '../../../models/student.model';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-class-item',
    templateUrl: './class-item.component.html',
    styleUrls: ['./class-item.component.scss']
})
export class ClassItemComponent implements OnInit {
    @Input() classgroup: Classgroup;
    students$: Observable<any>; //$ staat voor observable

    constructor(private classgroupService: ClassgroupService, private studenteachterService: StudentTeacherService) { }

    ngOnInit() {
        this.students$ = this.studenteachterService.getStudentsByClass(this.classgroup.id);
        this.students$.subscribe(value => console.log(value));
    }

    async setNumberOfStudents() {
        //this.students = [];
        //this.students = await this.studenteachterService.getStudentsByClass(this.classgroup.id).subscribe;
        //console.log(this.classgroup.name, this.students);
        //this.numberOfStudents = this.students.length;
    }
}
