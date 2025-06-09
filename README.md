# Workflow Graph Visualization

An interactive workflow graph visualization tool built with React, TypeScript, and ReactFlow. This application allows users to visualize complex workflow structures and dynamically add new actions to create custom workflows.

## 🎯 Features

- **Interactive Graph Visualization** - Built with ReactFlow for smooth pan/zoom interactions
- **Dynamic Action Library** - Add actions from a comprehensive library to build workflows
- **Domain-Driven Architecture** - Clean separation between workflow and actions domains
- **Type-Safe Development** - Full TypeScript support with proper domain type organization
- **Modern React Patterns** - Functional components with hooks and context management
- **Responsive Design** - Clean, professional UI with a centralized design system

## 🏗️ Architecture

### Domain-Driven Structure
The application follows domain-driven design principles with clear separation of concerns:

```
src/
├── app/                    # Application layer
│   ├── App.tsx            # Root component with providers
│   └── main.tsx           # Application entry point
├── domains/               # Business domains
│   ├── actions/           # Action library domain
│   │   ├── components/    # ActionCard, ActionPanel
│   │   ├── hooks/         # useActionsData
│   │   ├── utils/         # nodeFactory
│   │   └── types.ts       # ActionData interface
│   └── workflow/          # Workflow visualization domain
│       ├── components/    # FlowGraph
│       ├── hooks/         # useGraphData
│       ├── utils/         # flowTransform
│       └── types.ts       # GraphNodeData, FlowNodeData
├── context/               # Application state management
├── pages/                 # Page-level components
└── shared/               # Shared utilities and types
```

### Key Domains

**Actions Domain**
- Manages the library of available workflow actions
- Handles action selection and node creation
- Types: Tools (with services) and Actions (workflow controls)

**Workflow Domain**  
- Manages graph visualization and interactions
- Handles node positioning, connections, and flow state
- Integrates with ReactFlow for rendering

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd graph-thing
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 📜 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint code quality checks
- `npm run lint:fix` - Run ESLint with automatic fixes
- `npm run lint:css` - Run Stylelint for CSS quality
- `npm run lint:css:fix` - Run Stylelint with automatic fixes
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting without changes

## 🎨 Design System

The application uses a centralized design system with CSS custom properties:

- **Color System** - Semantic color tokens (primary, success, danger, etc.)
- **Typography** - Consistent font scales and weights  
- **Spacing** - Standardized padding and margin values
- **Shadows** - Layered shadow system for depth
- **CSS Modules** - Scoped component styling

## 🔧 Technology Stack

- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development with strict configuration
- **ReactFlow** - Interactive node-based graph visualization
- **Vite** - Fast development server and optimized builds
- **CSS Modules** - Scoped styling with TypeScript support
- **ESLint + Prettier** - Code quality and formatting
- **Stylelint** - CSS linting and best practices

## 🏛️ Code Standards

### TypeScript
- Strict type checking enabled
- Interfaces preferred over types for extensibility
- Domain-specific type organization
- Proper import/export patterns

### React
- Functional components with hooks
- Context for state management
- Proper component composition
- Accessibility-first development

### CSS
- CSS Modules for component scoping
- Centralized design tokens
- Mobile-first responsive design
- Semantic class naming

### Code Quality
- ESLint for JavaScript/TypeScript quality
- Stylelint for CSS best practices
- Prettier for consistent formatting
- No semicolons style (modern JavaScript)

## 📊 Data Flow

1. **API Integration** - Fetches workflow data and available actions
2. **Context Management** - Centralizes state in AppContext
3. **Domain Processing** - Transforms API data for visualization
4. **Interactive Updates** - Real-time graph updates when adding actions
5. **Type Safety** - End-to-end TypeScript coverage

## 🤝 Contributing

1. Follow the established domain-driven architecture
2. Maintain type safety across all new features
3. Use the centralized design system for UI components
4. Write comprehensive component documentation
5. Ensure all code passes linting and formatting checks

## 📄 License

This project is licensed under the MIT License.
