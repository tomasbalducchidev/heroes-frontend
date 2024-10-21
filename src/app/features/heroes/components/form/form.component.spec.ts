import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormComponent } from './form.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormComponent, NoopAnimationsModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: { close: jasmine.createSpy('close') }
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { action: 'create', hero: { name: '', description: '' } }
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate form fields with data when action is "update"', function () {
    component.data = { action: 'update', hero: { name: 'Superman', description: 'Strong' } };
    component.ngOnInit();
    expect(component.heroForm.value).toEqual({ heroName: 'Superman', heroDescription: 'Strong' });
  });

  it('should close the dialog with form data on submit', function () {
    component.heroForm.setValue({ heroName: 'Batman', heroDescription: 'Detective' });
    component.submitForm();
    expect((component.dialogRef as any).close).toHaveBeenCalledWith({ heroName: 'Batman', heroDescription: 'Detective' });
  });

  it('should not close the dialog on submit with invalid data', function () {
    component.heroForm.setValue({ heroName: '', heroDescription: '' });
    component.submitForm();
    expect((component.dialogRef as any).close).not.toHaveBeenCalled();
  });
});
