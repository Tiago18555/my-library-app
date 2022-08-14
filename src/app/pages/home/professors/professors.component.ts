import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-professors',
  templateUrl: './professors.component.html',
  styleUrls: ['./professors.component.scss']
})
export class ProfessorsComponent implements OnInit {

  @Output()
  public activeLink : boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
