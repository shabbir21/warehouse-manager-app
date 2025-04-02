# Warehouse Manager App

This application automates the picking and packing workflows for a warehouse team that handles gift box orders.

## Features

-   **Main Page:** The application's home page presents two options: "Picking" and "Packing," allowing the user to select the desired workflow.
-   **Picking Workflow:**
    -   Clicking "Picking" navigates to the picking page, which displays a table of products and their quantities to be picked.
-   **Packing Workflow:**
    -   Clicking "Packing" navigates to the packing page, which displays a list of orders.
    -   Clicking on an order in the list opens an overlay with detailed information about that order.
    -   The overlay includes a "Mark Completed" button to update the order's status. This is for the user to keep a track of orders they have packed. For the sake of this assignment I am not persisting the status.

## Technologies Used

-   Next.js
-   Node.js
-   React
-   Tailwind CSS
-   Jest
-   React Testing Library

## Setup

1.  **Clone the repository:**

    ```bash
    git clone <use-the-provided-url>
    cd warehouse-manager-app
    ```

2.  **Install dependencies (Node.js v20 or later recommended):**

    ```bash
    npm install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    ```

    The application will be available at `http://localhost:3000`.

## Data

-   `src/data/orders.json`: Contains mock order data.
-   `src/data/products.json`: Contains data mapping gift boxes to individual products.

## API Routes

-   `/api/picking-list`: Returns the consolidated picking list.
-   `/api/orders`: Returns a list of orders.
-   `/api/orders/[id]`: Dynamic router to return details of a specific order.

## Testing

-   Unit tests are located in the `src/__tests__/` directory.
-   To run the tests and generate coverage reports:

    ```bash
    npm run test
    ```

## Assumptions

-   Each line item in an order represents a quantity of 1 for the gift box.
-   Order selection and assignment to packers are handled by an external system. This application focuses on providing the packing information.
-   The application does not track the picking process or the status of individual items being picked.
-   Data integrity is assumed. The `productId` values in `orders.json` are assumed to exist as keys in `products.json`.
-   The application is designed for a simplified workflow and does not handle complex inventory management or shipping logistics.

## Limitations and Future Improvements

-   This application uses mock data. A real-world application would integrate with a database.
-   The application does not include authentication or authorization.
-   Error handling could be further enhanced for production use.
-   Additional features could be added, such as:

    -   Filtering and sorting of orders.
    -   Pagination for large datasets.
    -   More detailed tracking of picking and packing progress.
    -   User roles and permissions.
    -   Integration with a shipping provider API.
