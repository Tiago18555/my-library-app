import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MyLibraryApiService } from 'src/app/services/my-library-api.service';

interface Configuration {
  startedAt: string,
  tolerance: string,
  assessment: string,
  borrowingLimit: string
}

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {

  constructor(
    private service : MyLibraryApiService,
    public router : Router
  ) { }

  public disableSubmit : boolean = true;
  public currentConfig : Configuration = {startedAt: '', tolerance: '', assessment: '', borrowingLimit: ''}
  private readonly MINIMUM_TOLERANCE_VALUE : number = 1
  private readonly MAXIMUM_TOLERANCE_VALUE : number = 90
  private readonly MINIMUM_ASSESSMENT_VALUE : number = 0.01
  private readonly MAXIMUM_ASSESSMENT_VALUE : number = 100
  private readonly MINIMUM_B_LIMIT_VALUE : number = 1
  private readonly MAXIMUM_B_LIMIT_VALUE : number = 50

  public formFields$ : Observable<any> = of([])

  public enableBLimitEdit : boolean = false
  public enableAssessmentEdit : boolean = false
  public enableToleranceEdit : boolean = false

  ngOnInit(): void {
    this.editConfig()
  }

  editConfig = () : void => {
    this.formFields$ = this.service.getLatestConfiguration()
    this.formFields$.subscribe({
      next : res => {
        this.currentConfig = res.data[0]
        console.log(res)
      },
      error: err => console.log(err)
    })
  }

  controlSubmit = (input: Configuration): void => {
    console.log(input)
    this.disableSubmit = !this.fieldsAreValid(input)
  }

  public fieldsAreValid = (input: Configuration) : boolean => {
    return (
      Number(input.assessment) >= this.MINIMUM_ASSESSMENT_VALUE &&
      Number(input.assessment) <= this.MAXIMUM_ASSESSMENT_VALUE &&
      Number(input.borrowingLimit) >= this.MINIMUM_B_LIMIT_VALUE &&
      Number(input.borrowingLimit) <= this.MAXIMUM_B_LIMIT_VALUE &&
      Number(input.tolerance) >= this.MINIMUM_TOLERANCE_VALUE &&
      Number(input.tolerance) <= this.MAXIMUM_TOLERANCE_VALUE
    )
  }

  onSubmit = (params: NgForm) => {

    this.service.changeConfiguration(
      params.form.value
    ).subscribe({
      next: res => {
        console.log(res)
        alert('Configuração atualizada')
      },
      error: err => console.log(err)
    })

    this.editConfig()
  }

  onCancel = () => this.router.navigate(['home/welcome'])

  toggleEditBLimitButtonDisabled = () : boolean => this.enableBLimitEdit = !this.enableBLimitEdit

  toggleEditAssessmentButtonDisabled = (): boolean => this.enableAssessmentEdit = !this.enableAssessmentEdit

  toggleEditToleranceButtonDisabled = (): boolean => this.enableToleranceEdit = !this.enableToleranceEdit

}
