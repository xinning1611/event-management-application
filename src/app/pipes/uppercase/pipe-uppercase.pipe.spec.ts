import { PipeUppercasePipe } from './pipe-uppercase.pipe';

describe('PipeUppercasePipe', () => {
  it('create an instance', () => {
    const pipe = new PipeUppercasePipe();
    expect(pipe).toBeTruthy();
  });
});
