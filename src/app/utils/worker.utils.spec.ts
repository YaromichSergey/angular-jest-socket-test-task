import { generatePseudoData } from './worker.utils';

describe('WorkerUtils', () => {

  it('should be created', async () => {
    expect(generatePseudoData(1, [])[0].id).toBe("1");
    expect(generatePseudoData(10, []).length).toBe(10);
    expect(generatePseudoData(10, ['456']).findIndex(it => it.id === '456')).toBe(9);
  });

  it('test integer', async () => {
    expect(generatePseudoData(1, [])[0].int.toString().includes('.')).toBe(false);
    expect(typeof generatePseudoData(1, [])[0].int).toBe('number');
  });

  it('test float', async () => {
    expect(generatePseudoData(1, [])[0].float.toString().includes('.')).toBe(true);
    expect(generatePseudoData(1, [])[0].float.toString().length).toBe(20);
  });

  it('test color', async () => {
    expect(generatePseudoData(1, [])[0].color.startsWith('#')).toBe(true);
    expect(generatePseudoData(1, [])[0].color.length).toBe(7);
  });

  it('test child', async () => {
    const result = generatePseudoData(1, []);
    expect(result[0].child[0].id).toBe(String(result[0].id * 10));
    expect(result[0].child[0].color.length).toBe(7);
  });

});
