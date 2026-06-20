import {
  calculateMonthlyCarbon,
  predictYearlyCarbon,
  getAIAssessment,
  calculateTreeOffset,
  calculateReductionPotential,
  compareToAverage
} from '../../lib/carbon-calculator';

describe('Carbon Calculator Logic', () => {
  const defaultInput = {
    electricity: 100,
    gasUsage: 50,
    carMiles: 200,
    flights: 2,
    diet: 150,
    shopping: 100
  };

  describe('calculateMonthlyCarbon', () => {
    it('calculates the correct total for given inputs', () => {
      const total = calculateMonthlyCarbon(defaultInput);
      // 100*0.92 + 50*5.3 + 200*0.411 + 2*255 + 150*0.5 + 100*0.2
      // 92 + 265 + 82.2 + 510 + 75 + 20 = 1044.2
      expect(total).toBe(1044.2);
    });

    it('handles zero inputs correctly', () => {
      const zeroInput = {
        electricity: 0,
        gasUsage: 0,
        carMiles: 0,
        flights: 0,
        diet: 0,
        shopping: 0
      };
      expect(calculateMonthlyCarbon(zeroInput)).toBe(0);
    });
  });

  describe('predictYearlyCarbon', () => {
    it('multiplies monthly total by 12', () => {
      expect(predictYearlyCarbon(100)).toBe(1200);
      expect(predictYearlyCarbon(1044.2)).toBe(12530.4);
    });
  });

  describe('getAIAssessment', () => {
    it('returns Very High assessment with recommendations for high footprint', () => {
      const result = getAIAssessment(1600, { ...defaultInput, electricity: 400 });
      expect(result.level).toBe('Very High');
      expect(result.recommendations.some(r => r.includes('LED bulbs'))).toBe(true);
    });

    it('returns Low assessment for low footprint', () => {
      const result = getAIAssessment(400, { ...defaultInput, flights: 0, electricity: 100, carMiles: 100 });
      expect(result.level).toBe('Low');
    });

    it('provides specific recommendations based on input triggers', () => {
      const result = getAIAssessment(1000, { ...defaultInput, flights: 5, carMiles: 1000, diet: 500 });
      expect(result.recommendations.some(r => r.includes('Air travel'))).toBe(true);
      expect(result.recommendations.some(r => r.includes('driving emissions'))).toBe(true);
      expect(result.recommendations.some(r => r.includes('meat consumption'))).toBe(true);
    });
  });

  describe('calculateTreeOffset', () => {
    it('calculates the correct number of trees', () => {
      expect(calculateTreeOffset(40)).toBe(2);
      expect(calculateTreeOffset(41)).toBe(3); // Math.ceil
    });
  });

  describe('calculateReductionPotential', () => {
    it('calculates 30% reduction correctly', () => {
      expect(calculateReductionPotential(100)).toBe(30);
      expect(calculateReductionPotential(1044)).toBe(313); // rounds correctly
    });
  });

  describe('compareToAverage', () => {
    it('correctly compares a higher score to the average', () => {
      const result = compareToAverage(1500); // Average is 1200
      expect(result.isHigher).toBe(true);
      expect(result.diff).toBe(300);
    });

    it('correctly compares a lower score to the average', () => {
      const result = compareToAverage(900);
      expect(result.isHigher).toBe(false);
      expect(result.diff).toBe(300);
    });
  });
});
