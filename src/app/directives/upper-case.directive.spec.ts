import { UpperCaseDirective } from './upper-case.directive';

describe('UpperCaseDirective', () => {
  it('should create an instance', () => {
    const elementRefMock = { nativeElement: document.createElement('input') };
    const directive = new UpperCaseDirective(elementRefMock);
    expect(directive).toBeTruthy();
  });

  it('should convert lowercase input to uppercase when input event is triggered', () => {
    const elementRefMock = { nativeElement: document.createElement('input') };
    const directive = new UpperCaseDirective(elementRefMock);
    elementRefMock.nativeElement.value = 'hello';
    const event = new Event('input');
    directive.onInput(event);
    expect(elementRefMock.nativeElement.value).toBe('HELLO');
  });
});
