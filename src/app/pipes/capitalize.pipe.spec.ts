import { CapitalizePipe } from './capitalize.pipe';

describe('CapitalizePipe', () => {

  let pipe: CapitalizePipe;

  beforeEach(() => {
    pipe = new CapitalizePipe();
  });
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should capitalize the first letter of the string and lowercase the rest', () => {
    const result = pipe.transform('hello WORLD');
    expect(result).toBe('Hello world');
  });

  it('should return empty string if value is empty', () => {
    const result = pipe.transform('');
    expect(result).toBe('');
  });
});
