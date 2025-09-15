## 🚀 How to Start the App

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Quick Start

1. **Clone and install dependencies:**

   ```bash
   git clone https://github.com/R-najj/movie-app
   cd movie-app
   pnpm install
   ```

2. **Set up your TMDB API key:**
   Create a `.env.local` file in the root directory:

   ```bash
   TMDB_V4_TOKEN=your_tmdb_api_token_here
   TMDB_API_KEY=our_tmdb_api_key_here
   ```

   Get your free API key from [TMDB](https://www.themoviedb.org/settings/api)

3. **Start the development server:**

   ```bash
   pnpm dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) and enjoy! 🎉

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm test` - Run tests
- `pnpm test:coverage` - Run tests with coverage
- `pnpm verify` - Run typecheck, tests, and build

## ✨ Features We Implemented

### 🎯 Core Functionality

- **Movie Discovery**: Browse top-rated movies with infinite scroll pagination
- **Movie Details**: Comprehensive movie information including ratings, cast, production details, and more
- **Search**: Real-time movie search with debounced input and persistent state
- **Favorites**: Add/remove movies from your personal favorites list with persistence

### 🎨 User Experience

- **Dark/Light Theme**: Toggle between themes with persistent preferences
- **Loading States**: Skeleton loaders and smooth transitions
- **Error Handling**: Graceful error states with retry options
- **Image Optimization**: Next.js Image component with TMDB CDN integration
- **Accessibility**: ARIA labels, keyboard navigation, and semantic HTML

### 🔧 Technical Features

- **Server-Side Rendering**: Home page loads with pre-fetched data for better SEO
- **Client-Side Rendering**: Movie details page for dynamic interactions
- **State Management**: Zustand with localStorage persistence for theme, search, and favorites
- **Data Fetching**: TanStack React Query with intelligent caching and SSR hydration
- **API Security**: TMDB API keys secured server-side with Next.js API routes
- **Type Safety**: Full TypeScript coverage with strict typing (zero `any` types)
- **Testing**: Comprehensive test suite with Vitest (36 tests passing)

### 🎬 Movie Information Display

- Movie posters and backdrop images
- Ratings and vote counts
- Release dates and runtime
- Genre tags and production companies
- Budget and revenue information
- Overview and taglines
- Status indicators (Released, etc.)

## 🔧 Key Technical Implementation

### 🎯 **Next.js Architecture**

- **Home Page**: Server-Side Rendering (SSR) with React Query hydration for optimal SEO and performance
- **Movie Details**: Client-Side Rendering (CSR) via secure API routes
- **API Security**: TMDB API keys never exposed to client, all external calls through `/api/tmdb/*` routes

### 🗄️ **State Management Strategy**

- **Zustand Stores**: Single source of truth for all persistent state
  - `useThemeStore`: Theme preferences (`theme-storage` key)
  - `usePrefsStore`: Search queries and favorites (`prefs-storage` key)
- **React Query**: Server state management with intelligent caching and background updates
- **SSR Compatibility**: Proper hydration handling to prevent mismatches

### 🔒 **Data Flow & Security**

```
Browser → Next.js API Routes → TMDB API
   ↑              ↓
Client State  Server State
(Zustand)   (React Query)
```

### ⚡ **Performance Optimizations**

- **Image Optimization**: Next.js Image component with TMDB CDN
- **Debounced Search**: 300ms delay to reduce API calls
- **Infinite Scroll**: Intersection Observer API for smooth pagination
- **Caching Strategy**: React Query with 5-minute stale time and background refetch

## 🏗️ Clean Architecture Implementation
<img width="1134" height="540" alt="82728951-03ec6a00-9cf4-11ea-8557-011a3dea7804" src="https://github.com/user-attachments/assets/93a5bd4f-39bc-4384-b50e-124b59b3665e" />

### Why Clean Architecture?

I implemented Clean Architecture to create a maintainable, testable, and scalable codebase. This approach separates concerns, makes dependencies explicit, and allows for easy testing and future modifications.

### Our Architecture Layers

#### 🎯 **Domain Layer** (`/src/domain/`)

The heart of the application - pure business logic with no external dependencies:

- **Entities** (`/entities/`): Core business objects like `Movie`, `MovieDetails`, `Genre`
- **Use Cases** (`/usecases/`): Business logic operations like `GetTopRatedMoviesUseCase`, `ToggleFavoriteUseCase`
- **Repositories** (`/repositories/`): Abstract interfaces defining data contracts

#### 🔌 **Data Layer** (`/src/data/`)

Handles external data sources and implements domain contracts:

- **Data Sources** (`/datasources/`): TMDB API integration, localStorage implementations
- **Mappers** (`/mappers/`): Transform external data to domain entities

#### 🏠 **Infrastructure Layer** (`/src/infrastructure/`)

Cross-cutting concerns and dependency management:

- **Dependency Injection** (`/di/`): Container pattern for managing dependencies
- **Configuration** (`/config/`): Environment and app configuration
- **Server Setup** (`/server/`): Server-side initialization

#### 🎨 **Presentation Layer** (`/src/presentation/`)

UI components and user interactions:

- **Pages** (`/pages/`): Route-level components (HomePage, MovieDetailsPage)
- **Hooks** (`/hooks/`): Custom React hooks for state management
- **Components**: Reusable UI components

### 🔄 **Dependency Flow**

```
Presentation → Domain ← Data
     ↓           ↑
Infrastructure → Domain
```

**Key Principles:**

- **Dependency Inversion**: High-level modules don't depend on low-level modules
- **Single Responsibility**: Each class has one reason to change
- **Interface Segregation**: Small, focused interfaces
- **Dependency Injection**: Dependencies are injected, not created

### 🚀 **Benefits We Achieved**

- **Maintainability**: Easy to modify features without breaking others
- **Testability**: Each layer can be tested in isolation
- **Scalability**: New features follow established patterns
- **Team Collaboration**: Clear boundaries and responsibilities
- **Future-Proof**: Easy to swap implementations (e.g., different data sources)

### 📁 **Project Structure**

```
src/
├── app/                    # Next.js App Router
│   ├── api/tmdb/          # Secure API routes (server-side TMDB calls)
│   ├── movie/[id]/        # Movie details page
│   └── page.tsx           # Home page (SSR)
├── components/            # Reusable UI components
├── domain/               # Business logic (framework-agnostic)
│   ├── entities/         # Movie, Genre, etc.
│   ├── repositories/     # Abstract interfaces
│   └── usecases/         # Business operations
├── data/                 # External data sources
├── infrastructure/       # Cross-cutting concerns & DI
├── presentation/         # UI layer
│   ├── pages/           # Page-level components
│   └── hooks/           # Custom React hooks
├── lib/                 # Utilities (formatting, queries, serialization)
├── stores/              # Zustand stores (theme, preferences)
└── types/               # TypeScript definitions
```
