# Fertilizer Management System

## Overview

This is a full-stack web application for the Bangladesh Chemical Industries Corporation (BCIC) fertilizer management system. It's built as a modern web application with a React frontend and Express.js backend, designed to manage fertilizer demand generation, production planning, and distribution workflows. The application uses "Fertilizer Management System" as the primary branding with BCIC as the supporting organization identifier.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

### January 28, 2025
- **Module 3: Procurement System Added**: Implemented comprehensive procurement module with 7 sub-modules including Annual Procurement Plan, Tender Management, Contract Award Process, L/C Management, Shipment Coordination, and Arrival Notifications
- **Navigation Enhancement**: Updated sidebar to include procurement sub-modules with collapsible menu structure
- **Procurement Dashboard**: Created centralized dashboard showing key metrics, recent tenders, upcoming arrivals, and active L/Cs
- **Route Integration**: Added all procurement routes to application routing system with protected access control

## System Architecture

The application follows a typical monorepo structure with client-server separation:

### Frontend Architecture
- **Framework**: React with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: Tailwind CSS for styling with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Authentication**: Session-based authentication with protected routes

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Authentication**: Passport.js with local strategy and session management
- **Session Storage**: PostgreSQL-backed sessions using connect-pg-simple

## Key Components

### Database Layer
- **Database**: PostgreSQL with Neon serverless configuration
- **Schema**: Centralized schema definition in `shared/schema.ts`
- **Tables**: Users, demand requests, production plans, and production data
- **Migrations**: Managed through Drizzle Kit

### Authentication System
- **Strategy**: Local username/password authentication
- **Password Security**: Scrypt-based password hashing with salt
- **Session Management**: Server-side sessions stored in PostgreSQL
- **Authorization**: Role-based access control with user roles

### API Structure
- **Pattern**: RESTful API endpoints under `/api` prefix
- **Security**: Authentication middleware on all protected routes
- **Validation**: Zod schema validation for request data
- **Error Handling**: Centralized error handling middleware

### Frontend Components
- **Layout**: Responsive sidebar navigation with header
- **Pages**: Dashboard, demand management, production planning modules
- **Forms**: React Hook Form with Zod validation
- **Charts**: Chart.js integration for data visualization
- **UI Components**: Comprehensive shadcn/ui component library

## Data Flow

1. **User Authentication**: Users log in through the auth page, creating server-side sessions
2. **Data Fetching**: TanStack Query manages API calls with automatic caching and background updates
3. **Form Submission**: Forms use React Hook Form with Zod validation before API submission
4. **Database Operations**: Drizzle ORM provides type-safe database queries and mutations
5. **Real-time Updates**: Query invalidation ensures data freshness across components

## External Dependencies

### Production Dependencies
- **Database**: Neon PostgreSQL serverless platform
- **UI Components**: Radix UI primitives via shadcn/ui
- **Charts**: Chart.js for data visualization
- **Date Handling**: date-fns for date manipulation
- **Form Validation**: Zod for schema validation
- **HTTP Client**: Native fetch API with custom wrapper

### Development Dependencies
- **Build**: Vite for development and production builds
- **TypeScript**: Full TypeScript support across the stack
- **Styling**: Tailwind CSS with PostCSS processing
- **Development Tools**: Replit-specific plugins for enhanced development experience

## Deployment Strategy

### Development Environment
- **Development Server**: Vite dev server with HMR for frontend
- **Backend Server**: tsx for TypeScript execution with file watching
- **Database**: Neon PostgreSQL with connection pooling
- **Environment**: Replit-optimized with development banners and error overlays

### Production Build
- **Frontend**: Vite builds static assets to `dist/public`
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Deployment**: Single Node.js process serving both API and static files
- **Database**: Production PostgreSQL with session storage

### Key Architectural Decisions

1. **Monorepo Structure**: Keeps frontend, backend, and shared code in one repository for easier development and deployment
2. **TypeScript Throughout**: Ensures type safety across the entire stack
3. **Shared Schema**: Database schema and validation rules shared between client and server
4. **Session-based Auth**: Chosen over JWT for better security and server-side session management
5. **Component Library**: shadcn/ui provides consistent, accessible UI components
6. **Query Management**: TanStack Query handles complex server state scenarios
7. **Database ORM**: Drizzle provides type-safe queries while remaining lightweight