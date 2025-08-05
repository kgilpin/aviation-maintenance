# Step 1: Project Setup and Directory Structure

## Objective
Establish the foundational directory structure and configuration files according to the CLAUDE.md architecture guidelines.

## Actions Required

### 1.1 Create Directory Structure
Create the following directories in `src/`:

```bash
mkdir -p src/components/layout
mkdir -p src/components/sections  
mkdir -p src/components/ui
mkdir -p src/data
mkdir -p src/hooks
mkdir -p src/pages
mkdir -p src/assets/images
```

### 1.2 Update Vite Configuration
Ensure `vite.config.ts` has proper path aliases:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

### 1.3 Update TypeScript Configuration
Ensure `tsconfig.app.json` includes path mapping:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### 1.4 Verify Dependencies
Ensure all required dependencies are installed:
- react-router-dom (for routing)
- react-helmet-async (for SEO meta tags)
- clsx (for className utilities)
- tailwindcss (for styling)

### 1.5 Initialize Basic Routing
Update `src/App.tsx` to include basic routing structure:

```typescript
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<div>Home Page Placeholder</div>} />
            <Route path="/contact-us" element={<div>Contact Us Placeholder</div>} />
          </Routes>
        </Layout>
      </Router>
    </HelmetProvider>
  );
}

export default App;
```

## Deliverables
- Complete directory structure in place
- Vite and TypeScript configurations updated
- Basic routing structure implemented
- All required dependencies available

## Next Step
Proceed to Step 2: Create Company Data File