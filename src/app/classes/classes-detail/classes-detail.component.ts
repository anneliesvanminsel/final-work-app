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
  private id: string;
  private class: Classgroup;

  constructor(private classgroupService: ClassgroupService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get("id")
    });

    this.setClass();
  }

  async setClass() {
    await this.classgroupService.getClassgroupFromDb(this.id);
    this.class = this.classgroupService.class;
  }

}
