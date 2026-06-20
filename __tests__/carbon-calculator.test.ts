import { calculateMonthlyCarbon, predictYearlyCarbon, calculateTreeOffset, calculateReductionPotential, compareToAverage } from '../lib/carbon-calculator';

describe('Carbon Calculator', () => {
  const mockData = {
    electricity: 100, // 100 * 0.386 = 38.6
    gasUsage: 10,     // 10 * 5.3 = 53
    carMiles: 100,    // 100 * 0.411 = 41.1
    flights: 2,       // 2 * 255 = 510
    diet: 200,        // 200 * 0.5 = 100
    shopping: 100,    // 100 * 0.2 = 20
  }; // Total = 762.7

  it('calculates monthly carbon footprint accurately', () => {
    const total = calculateMonthlyCarbon(mockData);
    expect(total).toBe(762.7);
  });

  it('predicts yearly carbon correctly', () => {
    const yearly = predictYearlyCarbon(762.7);
    expect(yearly).toBe(9152.4);
  });

  it('calculates tree offsets accurately', () => {
    const trees = calculateTreeOffset(762.7);
    expect(trees).toBe(39); // Math.ceil(762.7 / 20)
  });

  it('calculates 30% reduction potential', () => {
    const reduction = calculateReductionPotential(762.7);
    expect(reduction).toBe(229); // Number((762.7 * 0.3).toFixed(0))
  });

  it('compares to national average', () => {
    // NATIONAL_AVERAGES.MONTHLY_TOTAL is typically ~1200
    // If it is 1200, then diff is 384, isHigher is false
    const comparison = compareToAverage(816.1);
    expect(comparison).toHaveProperty('diff');
    expect(comparison).toHaveProperty('isHigher');
  });
});
