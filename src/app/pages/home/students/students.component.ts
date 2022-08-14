import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  @Output()
  public activeLink : boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
