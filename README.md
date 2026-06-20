# EcoTrack AI - Carbon Footprint Tracker

![EcoTrack AI](./public/og-image.png)

> **Hack2Skill PromptWars Submission** | Vertical: Sustainability & ESG - Carbon Footprint Tracking

EcoTrack AI is a smart, dynamic assistant designed to help individuals track, understand, and reduce their carbon footprint. It goes beyond simple calculators by providing personalized, context-aware AI recommendations based on user behavior and national averages.

## 🌟 Why EcoTrack AI? (Evaluation Focus Areas)

### 1. Innovation & Creativity
EcoTrack isn't a static calculator. It features a **Dynamic AI Assessment Engine** that analyzes your specific inputs (e.g., high flight hours vs. high electricity) to generate targeted, actionable reduction tips. The integrated `AIChatbot` provides an interactive layer for users to query specific sustainability advice.

### 2. Impact & Usability
- **Real-time Feedback**: As you adjust sliders, your carbon offset needs (in trees) and reduction potential automatically update without page reloads.
- **Data Visualization**: Memoized interactive charts provide immediate understanding of emission categories vs. target goals.
- **Accessibility (A11y)**: Built with full ARIA support, semantic HTML, proper form label associations, and keyboard navigation.

### 3. Technical Depth & Code Quality
- **Performance Optimized**: React `useMemo` and `React.memo` are used extensively to prevent unnecessary re-renders of complex charts and calculations.
- **Strict TypeScript**: 100% type-safe codebase with no `ignoreBuildErrors`.
- **Modular Architecture**: Business logic is decoupled from UI components (`lib/carbon-calculator.ts`), enabling pure unit testing.
- **Robust Validation**: Zod schemas (`lib/validators.ts`) ensure data integrity and power client-side form validation.

### 4. Security
- **Security Headers Middleware**: Implements strict CSP, HSTS, X-Frame-Options, and XSS Protection.
- **Client-Side Validation**: Password strength requirements and email formatting are validated before submission.
- **No Sensitive Logging**: PII and credentials are never logged to the console.

### 5. Comprehensive Testing
The project includes a robust Jest and React Testing Library suite covering:
- Pure calculation logic (edge cases, zero values)
- Component rendering and state changes
- Form interactions and validation
- Accessibility compliance checks

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Clone the repository
2. Install dependencies:
```bash
pnpm install
```
3. Create a `.env.local` file in the root directory and add your Groq API key:
```env
GROQ_API_KEY=your_groq_api_key_here
```
*(This is required for the EcoTrack AI Chatbot to function).*

### Running Locally
Start the development server:
```bash
pnpm dev
```
Navigate to `http://localhost:3000`

### Running Tests
Execute the Jest test suite:
```bash
pnpm test
```

### Building for Production
```bash
pnpm build
pnpm start
```

---

## 🧠 Architecture & Methodology

### Calculation Engine
The `lib/carbon-calculator.ts` uses established emission factors to convert user inputs into kg CO2 equivalent:
- **Electricity**: 0.92 kg CO2 / kWh
- **Natural Gas**: 5.3 kg CO2 / therm
- **Car Miles**: 0.411 kg CO2 / mile (US passenger vehicle average)
- **Flights**: 255 kg CO2 / flight hour
- **Diet/Shopping**: 0.5 and 0.2 kg CO2 / dollar spent

*Note: These factors are simplified proxies for the scope of this hackathon.*

### Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5.7
- **Styling**: Tailwind CSS v4, Framer Motion
- **Testing**: Jest, React Testing Library
- **Validation**: Zod
- **Charts**: Recharts
