import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {CourseService} from '../../services/course.service';
import {Course} from '../../models/course.model';
import {Classgroup} from '../../models/classgroup.model';
import {ClassgroupService} from '../../services/classgroup.service';
import {NgForm} from "@angular/forms";

@Component({
    selector: 'app-addcourse',
    templateUrl: './addcourse.component.html',
    styleUrls: ['./addcourse.component.scss']
})
export class AddcourseComponent implements OnInit {
    @ViewChild('nameInput') nameInputRef: ElementRef;
    @ViewChild('yearInput') yearInputRef: ElementRef;
    @ViewChild('classesInput') classesInputRef: ElementRef;

    course: Course ={
        id: '',
        name: '',
        year: '',
        allowedClasses: [''],
    };

    classgroups: Classgroup[];

    constructor(
        private router: Router,
        private courseService: CourseService,
        private classgroupService: ClassgroupService
    ) { }

    ngOnInit() {
        this.classgroupService.getClassgroups().subscribe(classes => {
            this.classgroups = classes;
        });
    }

    onAddCourse(form: NgForm) {
        if (!form.valid) {
            return;
        }

        this.course.name = form.value.name;
        this.course.year = form.value.year;
        this.course.allowedClasses = form.value.classgroups;
        this.courseService.addCourse(this.course);
        form.reset();
        this.router.navigate(['/teacher/courses']);
    }
}
