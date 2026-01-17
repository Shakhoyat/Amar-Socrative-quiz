# OOP Quiz Application

An interactive quiz application built with React and Vite, designed to test knowledge of Object-Oriented Programming concepts. Features a Socrative-style interface with multiple learning modes.

## Features

- **Practice Mode**: Study questions at your own pace with instant feedback
- **Quiz Mode**: Test your knowledge with a timed quiz format
- **Review Mode**: Review all questions and their explanations
- **Filtering Options**: Filter questions by category and difficulty
- **Progress Tracking**: Track your score and performance
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **React 18.2.0** - UI library
- **Vite 5.0** - Build tool and development server
- **Lucide React** - Icon library
- **CSS-in-JS** - Inline styling with React

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd oop-quiz
```

2. Install dependencies:
```bash
npm install
```

### Development

Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
oop-quiz/
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Application entry point
│   ├── index.css        # Global styles
│   └── questions.js     # Quiz questions data
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
└── vite.config.js       # Vite configuration
```

## Usage

1. **Start Screen**: Choose between Practice, Quiz, or Review mode
2. **Practice Mode**: Answer questions with immediate feedback and explanations
3. **Quiz Mode**: Select the number of questions and test yourself
4. **Review Mode**: Browse all questions with their explanations visible
5. **Filtering**: Use category and difficulty filters to focus on specific topics

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.
