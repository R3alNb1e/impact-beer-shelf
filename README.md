# Impact Beer Shelf

Welcome to Impact Beer Shelf! This is a web application built with Next.js that allows users to browse a collection of beers, view details, mark favorites, and discover random brews. The project is styled with Tailwind CSS and uses TypeScript for type safety.

**Live Project deployed on Vercel:** [https://impact-beer-shelf-mvp.vercel.app/](https://impact-beer-shelf-mvp.vercel.app/)

## Features

* **Browse Beer Collection:** View a paginated list of beers.
* **Filter Beers:** Filter the collection by various criteria like name, ABV, IBU, and brewing date.
* **Random Beer Discovery:** Get a random beer suggestion.
* **Favorites:** Mark beers as favorites and view them on a dedicated favorites page. User preferences are stored in `localStorage`.
* **Responsive Design:** Adapts to different screen sizes.

## Tech Stack

* **Framework:** [Next.js](https://nextjs.org/) (v15.3.2)
* **Language:** [TypeScript](https://www.typescriptlang.org/) (v5)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v4)
* **UI/Icons:** [Lucide React](https://lucide.dev/) for icons.
* **Animations:** [Framer Motion](https://www.framer.com/motion/) for UI animations.
* **Linting:** [ESLint](https://eslint.org/) (configured with Next.js defaults).
* **Package Manager:** npm (implied by `package.json` scripts)

## API Used

This project fetches beer data from the **PunkAPI V3 (Unofficial)**:
* **Base URL:** `https://punkapi.online/v3`

The API is used to:
* Fetch lists of beers.
* Fetch individual beer details by ID.
* Fetch a random beer.
* Filter beers based on various parameters.

*Note: This is an unofficial instance of the PunkAPI. Its stability and data accuracy might differ from the official PunkAPI v2.*

## Getting Started Locally

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js (v18.x or v20.x or later recommended)
* npm (comes with Node.js)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/R3alNb1e/impact-beer-shelf.git](https://github.com/R3alNb1e/impact-beer-shelf.git)
    cd impact-beer-shelf
    ```

2.  **Install NPM packages:**
    ```bash
    npm install
    ```

### Running the Development Server

To start the development server (usually on `http://localhost:3000`):

```bash
npm run dev
