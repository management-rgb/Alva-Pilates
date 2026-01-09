# Alva Pilates - Movement & Wellness Studio

A modern, responsive website for Alva Pilates studio in Valencia, Santa Clarita. Built with Next.js 16, React 19, and Tailwind CSS.

## Features

- 🎨 Modern, responsive design with smooth animations
- 📱 Mobile-first approach with optimized layouts
- 🧘 Class listings and detailed class information
- 👥 Instructor profiles with bios and specialties
- 💰 Pricing and membership information
- 📅 Mindbody integration for class booking
- ❓ FAQ section with categorized questions
- 📧 Contact form integration
- ♿ Accessibility-focused design

## Tech Stack

- **Framework**: Next.js 16.0.10 (App Router)
- **React**: 19.2.1
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **TypeScript**: 5.x
- **Fonts**: Cormorant Garamond, Quicksand (Google Fonts)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd alva-pilates
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
alva-pilates/
├── app/
│   ├── about/          # About page
│   ├── book/           # Class booking page
│   ├── classes/         # Classes listing and detail pages
│   ├── components/      # Reusable React components
│   ├── contact/         # Contact page
│   ├── data/            # JSON data files
│   ├── faq/             # FAQ page
│   ├── instructors/     # Instructors listing and detail pages
│   ├── pricing/          # Pricing page
│   ├── register/         # Registration page
│   └── types/            # TypeScript type definitions
├── lib/                  # Utility functions
├── public/               # Static assets
└── global.d.ts           # Global TypeScript declarations
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Key Features Implementation

### Image Optimization
External images from Unsplash are optimized through Next.js Image component with proper remote patterns configured in `next.config.ts`.

### Error Handling
Custom error suppression component handles third-party script errors (Mindbody widgets, Mixpanel, etc.) gracefully.

### 404 Pages
Custom not-found pages for dynamic routes (instructors and classes) provide better user experience.

### Data Management
Static JSON data files for classes, instructors, pricing, and FAQs. Easy to update without code changes.

## Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository on Vercel
3. Vercel will automatically detect Next.js and configure the build

For other deployment options, see the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## Environment Variables

No environment variables are currently required. All configuration is handled through:
- `next.config.ts` - Next.js configuration
- `app/data/*.json` - Static data files
- Component props and configuration

## Contributing

This is a private project for Alva Pilates. For questions or issues, please contact the development team.

## License

Proprietary - All rights reserved © Alva Pilates
