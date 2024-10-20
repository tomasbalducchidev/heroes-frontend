import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Subscription } from 'rxjs';
import { UpperCaseDirective } from '../../../../directives/upper-case.directive';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, MatButtonModule, MatInputModule, UpperCaseDirective],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class FormComponent implements OnInit {

  heroForm: FormGroup = new FormGroup({});
  private subscriptions: Subscription = new Subscription();

  data = inject(MAT_DIALOG_DATA);

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<FormComponent>) {
    this.heroForm = this.formBuilder.group({
      heroName: ['', Validators.required],
      heroDescription: ['', Validators.required]
    });
  }
  ngOnInit(): void {

    if (this.data.action === 'update') {
      this.heroForm.patchValue({
        heroName: this.data.hero.name,
        heroDescription: this.data.hero.description
      })
    }


    this.subscriptions.add(
      this.heroForm.valueChanges.subscribe((formValue) => {
        console.log('Nombre:', formValue.heroName);
        console.log('Descripción:', formValue.heroDescription);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  cancel = () => {
    this.dialogRef.close();
  }

  submitForm = () => {
    this.dialogRef.close(this.heroForm.value);
  }

}
