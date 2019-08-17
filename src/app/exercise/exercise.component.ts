import {Component, Input, OnInit} from '@angular/core';
import {Exercise} from '../models/exercise.model';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})
export class ExerciseComponent implements OnInit {
  @Input() exercise: Exercise;
  @Input() index: number;

  constructor() { }

  ngOnInit() { }

}
