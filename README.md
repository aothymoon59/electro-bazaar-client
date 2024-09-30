# ElectroMart (Electric gadgets Management Dashboard)

## Objective:

Electric gadgets Management Dashboard, providing the tools to efficiently manage the Electric gadgets inventory, track sales, and analyze sales history.The project will incorporate features such as authentication, CRUD operations, state management, real-time UI updates, and Electric gadgets filtering.

Live URL: https://electrobazaar.vercel.app/

## Table of Contents

- [Features](#features)
- [Technologies and Packages](#technologies-and-packages)
- [File Structure](#file-structure)
- [Usage](#usage)
- [API Integration](#api-integration)
- [Credits](#credits)

## Features

### CRUD Operations:

- **Add New Electric Gadgets:** Easily add new electric gadgets to the inventory.
- **Delete Electric Gadgets:** Remove existing electric gadgets from the inventory.
- **Update Electric Gadgets Details:** Modify and update details of electric gadgets as needed.
- **View Electric Gadgets Inventory:** Access and view the list of electric gadgets in the inventory.

### Filtering System:

- **Price Range:** Filter gadgets based on a specific price range.
- **Release Date:** Filter gadgets by their release date or model year.
- **Brand:** Real-time search functionality for filtering gadgets by brand.
- **Model Number:** Search gadgets by unique model numbers.
- **Category:** Categorize and filter gadgets by types (e.g., smartphones, laptops, cameras).
- **Operating System:** Filter gadgets based on the operating system they use.
- **Connectivity:** Filter gadgets by connectivity options (e.g., Bluetooth, Wi-Fi, USB-C).
- **Power Source:** Filter gadgets by their power source (e.g., battery-powered, plug-in).
- **Features:** Introduce filters for specific features like camera resolution, storage capacity, screen size, etc.
- **Additional Parameters:** Customize filters based on weight, dimensions, compatibility, etc.

### Sales Management:

- **Sell Products:** Users can sell products with quantity, buyer name, and sale date input.
- **Inventory Update:** Products are automatically removed from inventory when the quantity reaches zero.

### Sales History:

- View sales history categorized by weekly, daily, monthly, and yearly intervals.

### User Interface Features:

- **Real-time UI Updates:** UI updates gracefully in real-time for product updates, sales, etc.
- **Efficient CRUD Operations:** Utilizes RTK Query for efficient CRUD operations.
- **Re-fetching Functionality:** Ensures data accuracy and consistency through re-fetching.
- **State Management:** Utilizes Redux for maintaining consistent application state.

### Additional Features:

- **Bulk Delete:** Efficiently manage inventory with a bulk delete feature.
- **Duplicate & Edit:** Easily create variants by duplicating existing products and making modifications.
- **GitHub README Integration:** Features and functionalities documented for easy reference and usage.

## Technologies and Packages

- ReactJs, React-redux, Css, Tailwind Css, Ant Design, Sweet alert 2, momentjs, react-hot-toast, react hook form

## File Structure

```plaintext
ElectroMart/
│
├── public/
│   ├── ... # Public assets and files
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── form/
│   │   ├── layout/
│   │   └── ui/
│   ├── config/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   └── errorPage/
│   ├── redux/
│   │   ├── api/
│   │   ├── features/
│   │   ├── hooks.ts
│   │   └── store.ts
│   ├── routes/
│   ├── styles/
│   ├── types/
│   └── utils/
│   ├── App.tsx # Main application component
│   ├── index.css # Styles for the app
│   └── main.tsx # Entry point
│
├── index.html # Main HTML file
├── package-lock.json # Dependency lock file
├── package.json # Project configuration and dependencies
├── README.md # Project documentation
└── ... # Other directories and files
```

## Usage:

- Clone or download this repository.
- Navigate to the project directory.
- Run `npm install` to install necessary dependencies.
- Run `npm run dev` to start the development server.
- Access the application via your web browser.

## API Integration:

For backend API integration,NodeJS. Refer to the backend documentation for setting up the API server.

- Server side GitHub: https://github.com/Porgramming-Hero-web-course/l2b2-full-stack-a5-server-side-aothymoon59
- Live api link: https://l2b2a5-electronic-gadget-backend.vercel.app/
- Postman documentation: https://documenter.getpostman.com/view/29000250/2sA2r55RRd
