import { TitleCasePipe } from './title-case.pipe';

describe('TitlePipe', () => {
  it('create an instance', () => {
    const pipe = new TitleCasePipe();
    expect(pipe).toBeTruthy();
  });

  it('should correctly convert the first letter of the title to uppercase', () => {
    const input = 'title';
    const pipe = new TitleCasePipe();
    const output = pipe.transform(input);
    expect(output).toEqual('Title');
  });
});
