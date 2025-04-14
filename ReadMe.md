# Airalo Automated Testing Suite

This repository contains automated test suites for the Airalo project. The tests cover both the UI end-to-end (E2E) flows on the Airalo website using Cypress and the API flows for the Airalo Partner API using Mocha, Chai, and Axios.

> **Note:**  
> Due to known sandbox limitations, certain API endpoints (e.g. ordering eSIMs) may return errors even if the metadata indicates availability. In such cases, fallback or simulation logic is implemented so that the complete test flow can be demonstrated.

---

## Table of Contents
- [Airalo Automated Testing Suite](#airalo-automated-testing-suite)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Prerequisites](#prerequisites)
  - [Project Structure](#project-structure)
  - [Running the Tests](#running-the-tests)
    - [Cypress UI Tests](#cypress-ui-tests)
    - [API Tests](#api-tests)
  - [Approach & Implementation Details](#approach--implementation-details)
    - [UI Tests](#ui-tests)
    - [API Tests](#api-tests-1)
  - [Known Limitations](#known-limitations)
  - [Author](#author)

---

## Overview

This project demonstrates automated testing for two parts of the Airalo solution:

1. **UI End-to-End Testing (using Cypress):**  
   Verifies the Japan eSIM package on the Airalo website by:
   - Navigating to the site and setting up the environment (language and currency).
   - Searching for “Japan” and selecting an option from the dropdown.
   - Clicking on the eSIM package and verifying its details (Title, Coverage, Data, Validity, and Price).

2. **API Testing (using Mocha/Chai/Axios):**  
   Implements tests to exercise Airalo Partner API endpoints:
   - Authenticates using OAuth2 and obtains an access token.
   - Fetches available packages.
   - Attempts to place an order for 6 eSIMs.
   - Validates that the ordered eSIMs are provisioned (or simulates success when the order fails due to sandbox limitations).

---

## Prerequisites

- **Node.js:** LTS version recommended.
- **npm:** Comes with Node.js.
- **Cypress:** For the UI E2E tests.
- **Mocha & Chai:** For the API tests.
- **Axios:** For sending HTTP requests in API tests.

## Project Structure

```
/project-root
├── cypress/
│   └── e2e/
│       └── airalo.cy.js       # Cypress UI tests for website
|   └── support       
|       ├── commands.md 
|       └── e2e.js 
├── test/
│   └── airalo_api.test.js                       # API test suite using Mocha & Chai
├── README.md                                    # This file
├── package.json
└── cypress.config.js                            # Cypress configuration 
```

---

## Running the Tests

### Cypress UI Tests

1. **Install Dependencies:**  
   From the project root:

   ```bash
   npm install
   ```

2. **Run in Interactive Mode:**

   ```bash
   npx cypress open
   ```

   Then select the test file (e.g., `airalo.cy.js`) to run interactively.

3. **Run in Headless Mode:**

   ```bash
   npx cypress run
   ```

---

### API Tests

1. **Install Dependencies:**  
   Already installed as part of the project (`npm install`).

2. **Run the API Test Suite:**

   ```bash
   npx mocha test/airalo_api.test.js
   ```

   The API test suite covers:

   - Authentication (`POST /v2/token`)
   - Package retrieval and selection from the partner inventory.
   - Ordering of 6 eSIMs (with fallback simulation if the sandbox order fails).(`POST /v2/orders`)
   - Validation via `GET /v2/sims` (or simulation of a successful response).

---

## Approach & Implementation Details

### UI Tests

**Navigation & Setup:**  
The Cypress test visits the Airalo website, ensures language is set to English, accepts cookie and confirmation pop-ups, and changes currency to USD.It would help to unique the test setup.

**Search & Selection:**  
It types "Japan" into the search field, waits for the autocomplete dropdown to appear, and selects the Japan entry from the "Local" section.

**Package Verification:**  
The test selects the second available eSIM package and then opens a details popup where it asserts that:

- The title is "Moshi Moshi"
- Coverage is "Japan"
- Data is "1 GB"
- Validity is "7 Days"
- Price is "$4.50 USD"

### API Tests

**Authentication:**  
Utilizes the OAuth2 client credentials flow to request an access token from `/v2/token`.

**Package Retrieval & Selection:**  
Initially, an attempt is made to fetch orderable inventory (from endpoints like `/v2/orders` or `/v2/packages`). Due to sandbox limitations (and to ensure a consistent demo), the test forces a known package slug (`"merhaba-7days-1gb"` or `"change-7days-1gb"`) for ordering.

**Order Placement:**  
The test constructs an order payload to order 6 eSIMs, each with a unique `matching_id`. If the order call returns a 422 error (indicating that the package is “invalid or out of stock”), the test simulates a successful order by generating dummy eSIM IDs.

**Validation:**  
The test then attempts to verify that 6 eSIMs have been provisioned via `GET /v2/sims`. If the order was simulated, the test simulates a matching GET response so that validation assertions can still be demonstrated.

---

## Known Limitations

**Sandbox Environment:**  
The Airalo Partner Sandbox often returns a 422 error ("invalid or out of stock") when trying to order certain packages, even when inventory metadata (e.g. `quantity: 6`) suggests availability.

**Fallback Logic:** In such cases, the API test simulates a successful order to demonstrate the flow.

**Real-World Use:**  
In a production environment, valid, partner-bound packages would be orderable, and the `GET /sims` endpoint would return real eSIM data.

---

## Author
Yuchun Chen
