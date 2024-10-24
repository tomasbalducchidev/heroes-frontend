import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormComponent } from './form.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

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

  it('should display correct title and button based on action (create)', () => {
    component.data.action = 'create';
    fixture.detectChanges();

    const title = fixture.debugElement.query(By.css('h2')).nativeElement;
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;

    expect(title.textContent).toContain('Crear Héroe');
    expect(submitButton.textContent).toContain('Crear');
  });

  it('should enable/disable the submit button based on form validity', () => {
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;

    expect(submitButton.disabled).toBeTrue();

    component.heroForm.controls['heroName'].setValue('Superman');
    component.heroForm.controls['heroDescription'].setValue('El hombre de acero');
    fixture.detectChanges();

    expect(submitButton.disabled).toBeFalse();
  });

  it('should close the dialog with "cancel"', () => {
    const dialogRefMock = { close: jasmine.createSpy('close') };

    component.dialogRef = dialogRefMock as any;

    component.cancel();

    expect(dialogRefMock.close).toHaveBeenCalledWith('cancel');
  });

});
