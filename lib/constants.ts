/**
 * Emission factors used for carbon footprint calculations.
 * Values represent kg CO2 equivalent per unit.
 */
export const EMISSION_FACTORS = {
  ELECTRICITY: 0.386, // kg CO2 per kWh (US EPA average)
  NATURAL_GAS: 5.3,  // kg CO2 per therm
  CAR_MILES: 0.411,  // kg CO2 per mile (average US passenger vehicle)
  FLIGHT_HOURS: 255, // kg CO2 per flight hour
  DIET_SPEND: 0.5,   // kg CO2 per dollar spent on food
  SHOPPING_SPEND: 0.2 // kg CO2 per dollar spent on goods
} as const;

export const NATIONAL_AVERAGES = {
  MONTHLY_TOTAL: 1200, // kg CO2 average monthly footprint
  ELECTRICITY_KWH: 877, // average US residential monthly use
};
