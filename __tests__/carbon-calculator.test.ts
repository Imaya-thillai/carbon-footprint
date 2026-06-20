import { calculateMonthlyCarbon, predictYearlyCarbon, calculateTreeOffset, calculateReductionPotential, compareToAverage } from '../lib/carbon-calculator';

describe('Carbon Calculator', () => {
  const mockData = {
    electricity: 100, // 100 * 0.92 = 92
    gasUsage: 10,     // 10 * 5.3 = 53
    carMiles: 100,    // 100 * 0.411 = 41.1
    flights: 2,       // 2 * 255 = 510
    diet: 200,        // 200 * 0.5 = 100
    shopping: 100,    // 100 * 0.2 = 20
  }; // Total = 816.1

  it('calculates monthly carbon footprint accurately', () => {
    const total = calculateMonthlyCarbon(mockData);
    expect(total).toBe(816.1);
  });

  it('predicts yearly carbon correctly', () => {
    const yearly = predictYearlyCarbon(816.1);
    expect(yearly).toBe(9793.2);
  });

  it('calculates tree offsets accurately', () => {
    const trees = calculateTreeOffset(816.1);
    expect(trees).toBe(41); // Math.ceil(816.1 / 20)
  });

  it('calculates 30% reduction potential', () => {
    const reduction = calculateReductionPotential(816.1);
    expect(reduction).toBe(245); // Number((816.1 * 0.3).toFixed(0))
  });

  it('compares to national average', () => {
    // NATIONAL_AVERAGES.MONTHLY_TOTAL is typically ~1200
    // If it is 1200, then diff is 384, isHigher is false
    const comparison = compareToAverage(816.1);
    expect(comparison).toHaveProperty('diff');
    expect(comparison).toHaveProperty('isHigher');
  });
});
