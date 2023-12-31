# 🗺️ NestJS-NextJS Google Maps

This project is a demonstration of how to create a Google Maps interaction for searching routes using Next.js and NestJS. It combines the power of both Next.js for the frontend and NestJS for the backend to provide a seamless map experience.

![NestJS-NextJS Google Maps Demo](demo.gif)

## Getting Started

To use this project, follow the instructions below. These instructions assume you have Node.js and npm (Node Package Manager) installed on your system.

### Prerequisites

Make sure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/nestjs-nextjs-google-maps.git
```

2. Change to the project directory:

```bash
cd nestjs-nextjs-google-maps
```

3. Install the dependencies for both the frontend and backend:

```bash
# Install frontend dependencies
cd nextjs
npm install

# Install backend dependencies
cd nestjs
npm install
```

### Running the Application

1. Start the docker container:
```bash
# From the project root directory
docker compose up
```
2. Start the backend server (NestJS):

```bash
# From the project root directory
docker compose exec nestjs bash
npm start:dev
```

3. Start the frontend development server (Next.js):

```bash
# From the project root directory
docker compose exec nextjs bash
npm run dev
```

4. Open your web browser and go to [http://localhost:3001](http://localhost:3001) to access the application.

## Usage

You can use this project to search for routes on Google Maps with ease. The frontend provides an intuitive interface for searching routes, and the backend handles communication with the Google Maps API.

## Credits

This project was created following the YouTube livestream by FullCycle. You can watch the livestream [here](https://www.youtube.com/watch?v=wzA3bfqxbbY).

## Issues and Contributions

If you encounter any issues with this project or would like to contribute to its development, please feel free to open an issue or create a pull request on GitHub.

Happy mapping! 🌍🚗🗺️

---

[FullCycle YouTube Channel](https://www.youtube.com/c/FullCycle) | [GitHub Repository](https://github.com/your-username/nestjs-nextjs-google-maps) | [Report a Bug](https://github.com/your-username/nestjs-nextjs-google-maps/issues)
