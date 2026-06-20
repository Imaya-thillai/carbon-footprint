import { EMISSION_FACTORS, NATIONAL_AVERAGES } from './constants';

export interface CarbonInputData {
  electricity: number;
  gasUsage: number;
  carMiles: number;
  flights: number;
  diet: number;
  shopping: number;
}

/**
 * Calculates the total monthly carbon footprint in kg CO2 equivalent.
 * @param data - The carbon input data object
 * @param data.electricity - Monthly electricity consumption in kWh (factor: 0.92 kg CO2/kWh)
 * @param data.gasUsage - Monthly natural gas in therms (factor: 5.3 kg CO2/therm)
 * @param data.carMiles - Monthly car miles driven (factor: 0.411 kg CO2/mile)
 * @param data.flights - Monthly flight hours (factor: 255 kg CO2/hour)
 * @param data.diet - Monthly food spending in USD (factor: 0.5 kg CO2/dollar)
 * @param data.shopping - Monthly shopping spending in USD (factor: 0.2 kg CO2/dollar)
 * @returns Total kg CO2 equivalent per month
 */
export const calculateMonthlyCarbon = (data: CarbonInputData): number => {
  const electricity = (data.electricity || 0) * EMISSION_FACTORS.ELECTRICITY;
  const gas = (data.gasUsage || 0) * EMISSION_FACTORS.NATURAL_GAS;
  const car = (data.carMiles || 0) * EMISSION_FACTORS.CAR_MILES;
  const flights = (data.flights || 0) * EMISSION_FACTORS.FLIGHT_HOURS;
  const diet = (data.diet || 0) * EMISSION_FACTORS.DIET_SPEND;
  const shopping = (data.shopping || 0) * EMISSION_FACTORS.SHOPPING_SPEND;

  return Number((electricity + gas + car + flights + diet + shopping).toFixed(2));
};

/**
 * Predicts the yearly carbon footprint based on monthly data.
 * @param monthlyTotal The calculated monthly total in kg CO2
 * @returns Predicted yearly total in kg CO2
 */
export const predictYearlyCarbon = (monthlyTotal: number): number => {
  return Number((monthlyTotal * 12).toFixed(2));
};

export interface ReductionTip {
  level: string;
  message: string;
  recommendations: string[];
}

/**
 * Generates an AI-like assessment and reduction tips based on the calculated score.
 * @param score The monthly carbon footprint in kg CO2
 * @param data The raw input data to provide targeted advice
 * @returns An object containing the assessment level, message, and specific recommendations
 */
export const getAIAssessment = (score: number, data: CarbonInputData): ReductionTip => {
  const recommendations: string[] = [];

  // Analyze specific categories to give targeted advice
  if (data.electricity > 300) {
    recommendations.push('Consider switching to LED bulbs or adjusting your thermostat to reduce electricity usage.');
  }
  if (data.carMiles > 500) {
    recommendations.push('Your driving emissions are high. Consider carpooling, taking public transit, or combining trips.');
  }
  if (data.flights > 2) {
    recommendations.push('Air travel is a significant contributor. Consider virtual meetings or closer vacation destinations.');
  }
  if (data.diet > 300) {
    recommendations.push('Reducing meat consumption, even by 1-2 days a week, can significantly lower your dietary footprint.');
  }

  // Fallback if no specific triggers hit
  if (recommendations.length === 0) {
    recommendations.push('Look into local community solar projects or offsetting your remaining emissions.');
  }

  if (score > 1500) {
    return {
      level: 'Very High',
      message: 'Your footprint is significantly above average. Consider major lifestyle changes.',
      recommendations,
    };
  }
  if (score > 1000) {
    return {
      level: 'High',
      message: 'Your footprint is above average. Look for reduction opportunities.',
      recommendations,
    };
  }
  if (score > 500) {
    return {
      level: 'Moderate',
      message: 'You are below the national average. Continue your sustainable practices.',
      recommendations,
    };
  }
  
  return {
    level: 'Low',
    message: 'Great job! Your footprint is low. Share your habits with others!',
    recommendations,
  };
};

/**
 * Calculates the number of trees needed to offset the given emissions.
 * (Assuming 1 mature tree absorbs ~20kg CO2 per year)
 * @param monthlyScore The monthly carbon footprint in kg CO2
 * @returns Number of trees needed to offset the monthly emissions
 */
export const calculateTreeOffset = (monthlyScore: number): number => {
  return Math.ceil(monthlyScore / 20); // Using 20 as a simplified monthly offset proxy for this feature
};

/**
 * Calculates potential savings if user reduces their footprint by 30%.
 * @param monthlyScore The monthly carbon footprint in kg CO2
 * @returns Potential monthly reduction in kg CO2
 */
export const calculateReductionPotential = (monthlyScore: number): number => {
  return Number((monthlyScore * 0.3).toFixed(0));
};

/**
 * Compares score to national average
 * @param score The monthly footprint
 * @returns Object with difference and whether it's higher or lower
 */
export const compareToAverage = (score: number) => {
  const diff = Math.abs(score - NATIONAL_AVERAGES.MONTHLY_TOTAL);
  const isHigher = score > NATIONAL_AVERAGES.MONTHLY_TOTAL;
  return { diff: Number(diff.toFixed(0)), isHigher };
};
