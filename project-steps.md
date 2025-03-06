# Manufacturing Module Development Guide

## Project Overview

This guide outlines the step-by-step process for building a comprehensive manufacturing module that helps users track the cost of manufacturing their products. The system will handle everything from raw materials management to production tracking, with a focus on accurate cost calculation using FIFO (First-In, First-Out) methodology.

## Tech Stack

- **Frontend & Backend**: Next.js
- **Database**: MongoDB with Mongoose
- **UI Components**: shadcn/ui (latest version)
- **Styling**: Tailwind CSS

## Project Structure

```
manufacturing-module/
├── app/
│   ├── api/                           # API routes
│   ├── (auth)/                        # Authentication routes
│   ├── dashboard/                     # Dashboard page
│   ├── units/                         # Units management
│   ├── sizes/                         # Sizes management
│   ├── colors/                        # Colors management
│   ├── raw-materials/                 # Raw materials management
│   ├── products/                      # Products management
│   ├── customers/                     # Customers management
│   ├── suppliers/                     # Suppliers management
│   ├── bill-of-materials/             # Bill of materials management
│   ├── purchases/                     # Purchases management
│   ├── manufacturing-orders/          # Manufacturing orders management
│   ├── production/                    # Production management
│   ├── settings/                      # Settings page
│   └── layout.tsx                     # Root layout
├── components/
│   ├── ui/                            # shadcn/ui components
│   ├── layout/                        # Layout components
│   │   ├── sidebar.tsx
│   │   ├── header.tsx
│   │   └── main-content.tsx
│   ├── dashboard/                     # Dashboard components
│   ├── units/                         # Units components
│   ├── sizes/                         # Sizes components
│   ├── colors/                        # Colors components
│   ├── raw-materials/                 # Raw materials components
│   ├── products/                      # Products components
│   ├── customers/                     # Customers components
│   ├── suppliers/                     # Suppliers components
│   ├── bill-of-materials/             # Bill of materials components
│   ├── purchases/                     # Purchases components
│   ├── manufacturing-orders/          # Manufacturing orders components
│   ├── production/                    # Production components
│   └── settings/                      # Settings components
├── lib/
│   ├── utils.ts                       # Utility functions
│   ├── db.ts                          # Database connection
│   └── constants.ts                   # Constants
├── models/                            # Mongoose models
│   ├── unit.ts
│   ├── size.ts
│   ├── color.ts
│   ├── raw-material.ts
│   ├── product.ts
│   ├── customer.ts
│   ├── supplier.ts
│   ├── bill-of-material.ts
│   ├── purchase.ts
│   ├── manufacturing-order.ts
│   ├── production.ts
│   └── settings.ts
├── hooks/                             # Custom hooks
│   ├── use-toast.ts
│   └── use-form.ts
├── types/                             # TypeScript types
│   └── index.ts
├── public/                            # Public assets
├── .env                               # Environment variables
├── next.config.js                     # Next.js configuration
├── tailwind.config.js                 # Tailwind configuration
├── tsconfig.json                      # TypeScript configuration
└── package.json                       # Project dependencies
```

## Step-by-Step Implementation Guide

### Step 1: Project Setup

1. **Initialize Next.js project**
   ```bash
   npx create-next-app@latest manufacturing-module --typescript --tailwind --eslint
   cd manufacturing-module
   ```

2. **Install dependencies**
   ```bash
   npm install mongoose next-auth bcrypt zod react-hook-form @hookform/resolvers date-fns recharts
   ```

3. **Set up shadcn/ui**
   ```bash
   npx shadcn-ui@latest init
   ```
   - Choose `Default` for the style
   - Choose `slate` for the color scheme
   - Set up the components directory as `components/ui`
   - Enable CSS variables
   - Install the following components:
     ```bash
     npx shadcn-ui@latest add button card form input select table tabs toast dialog dropdown-menu sheet avatar badge calendar checkbox popover progress radio-group separator skeleton slider switch textarea
     ```

4. **Set up MongoDB connection**
   - Create `.env` file with MongoDB connection string
   - Create `lib/db.ts` for database connection

### Step 2: Database Models

1. **Create Unit Model (`models/unit.ts`)**
   - Fields: name, symbol, createdAt, updatedAt

2. **Create Size Model (`models/size.ts`)**
   - Fields: name, code, createdAt, updatedAt

3. **Create Color Model (`models/color.ts`)**
   - Fields: name, code, createdAt, updatedAt

4. **Create Raw Material Model (`models/raw-material.ts`)**
   - Fields: name, description, unitId (ref: Unit), inventory (array of {quantity, cost, date, remaining}), createdAt, updatedAt

5. **Create Product Model (`models/product.ts`)**
   - Fields: name, description, sizeId (ref: Size), colorId (ref: Color), inventory (array of {quantity, cost, date, remaining}), sellingPrice, hasBOM (boolean), createdAt, updatedAt

6. **Create Customer Model (`models/customer.ts`)**
   - Fields: name, email, phone, address, createdAt, updatedAt

7. **Create Supplier Model (`models/supplier.ts`)**
   - Fields: name, email, phone, address, createdAt, updatedAt

8. **Create Bill of Materials Model (`models/bill-of-material.ts`)**
   - Fields: productId (ref: Product), materials (array of {materialId, quantity}), createdAt, updatedAt

9. **Create Purchase Model (`models/purchase.ts`)**
   - Fields: supplierId (ref: Supplier), date, items (array of {materialId, quantity, cost}), paymentMethod, status, totalAmount, createdAt, updatedAt

10. **Create Manufacturing Order Model (`models/manufacturing-order.ts`)**
    - Fields: customerId (ref: Customer), date, status (pending, processing, processed), items (array of {productId, quantity, cost, amount}), totalAmount, createdAt, updatedAt

11. **Create Production Model (`models/production.ts`)**
    - Fields: manufacturingOrderId (ref: ManufacturingOrder), date, status (cutting, sticking, lasting, finished), expenses (array of {name, amount}), totalExpense, createdAt, updatedAt

12. **Create Settings Model (`models/settings.ts`)**
    - Fields: currencySymbol, companyName, companyLogo, createdAt, updatedAt

### Step 3: API Routes

1. **Create API routes for Units**
   - `app/api/units/route.ts` (GET, POST)
   - `app/api/units/[id]/route.ts` (GET, PUT, DELETE)

2. **Create API routes for Sizes**
   - `app/api/sizes/route.ts` (GET, POST)
   - `app/api/sizes/[id]/route.ts` (GET, PUT, DELETE)

3. **Create API routes for Colors**
   - `app/api/colors/route.ts` (GET, POST)
   - `app/api/colors/[id]/route.ts` (GET, PUT, DELETE)

4. **Create API routes for Raw Materials**
   - `app/api/raw-materials/route.ts` (GET, POST)
   - `app/api/raw-materials/[id]/route.ts` (GET, PUT, DELETE)

5. **Create API routes for Products**
   - `app/api/products/route.ts` (GET, POST)
   - `app/api/products/[id]/route.ts` (GET, PUT, DELETE)

6. **Create API routes for Customers**
   - `app/api/customers/route.ts` (GET, POST)
   - `app/api/customers/[id]/route.ts` (GET, PUT, DELETE)

7. **Create API routes for Suppliers**
   - `app/api/suppliers/route.ts` (GET, POST)
   - `app/api/suppliers/[id]/route.ts` (GET, PUT, DELETE)

8. **Create API routes for Bill of Materials**
   - `app/api/bill-of-materials/route.ts` (GET, POST)
   - `app/api/bill-of-materials/[id]/route.ts` (GET, PUT, DELETE)
   - `app/api/bill-of-materials/product/[productId]/route.ts` (GET)

9. **Create API routes for Purchases**
   - `app/api/purchases/route.ts` (GET, POST)
   - `app/api/purchases/[id]/route.ts` (GET, PUT, DELETE)

10. **Create API routes for Manufacturing Orders**
    - `app/api/manufacturing-orders/route.ts` (GET, POST)
    - `app/api/manufacturing-orders/[id]/route.ts` (GET, PUT, DELETE)
    - `app/api/manufacturing-orders/pending/route.ts` (GET)

11. **Create API routes for Production**
    - `app/api/production/route.ts` (GET, POST)
    - `app/api/production/[id]/route.ts` (GET, PUT, DELETE)
    - `app/api/production/manufacturing-order/[orderId]/route.ts` (GET)

12. **Create API routes for Settings**
    - `app/api/settings/route.ts` (GET, PUT)

13. **Create API route for Dashboard data**
    - `app/api/dashboard/route.ts` (GET)

### Step 4: Utility Functions

1. **Create FIFO calculation utility (`lib/utils/fifo.ts`)**
   ```typescript
   // Functions to handle FIFO calculations for inventory
   export function calculateFIFOCost(inventory, quantityNeeded) {
     // Implementation of FIFO cost calculation
   }

   export function updateInventoryFIFO(inventory, quantityUsed) {
     // Implementation of inventory update using FIFO
   }
   ```

2. **Create date formatting utility (`lib/utils/date.ts`)**
   ```typescript
   // Functions to format dates
   export function formatDate(date) {
     // Implementation of date formatting
   }
   ```

3. **Create currency formatting utility (`lib/utils/currency.ts`)**
   ```typescript
   // Functions to format currency
   export function formatCurrency(amount, symbol = '$') {
     // Implementation of currency formatting
   }
   ```

4. **Create validation utility (`lib/utils/validation.ts`)**
   ```typescript
   // Functions for form validation
   export function validateEmail(email) {
     // Implementation of email validation
   }

   export function validatePhone(phone) {
     // Implementation of phone validation
   }
   ```

5. **Create manufacturing utility (`lib/utils/manufacturing.ts`)**
   ```typescript
   // Functions for manufacturing calculations
   export function calculateProductionCost(bomCost, expenses) {
     // Implementation of production cost calculation
   }

   export function checkMaterialAvailability(bom, inventory) {
     // Implementation to check if enough materials are available
   }
   ```

### Step 5: Layout Components

1. **Create Sidebar Component (`components/layout/sidebar.tsx`)**
   - Include navigation links to all main sections
   - Highlight active link
   - Collapsible categories

2. **Create Header Component (`components/layout/header.tsx`)**
   - Include page title
   - User profile dropdown
   - Notifications

3. **Create Main Content Component (`components/layout/main-content.tsx`)**
   - Wrapper for page content
   - Consistent padding and layout

4. **Create Root Layout (`app/layout.tsx`)**
   - Include Sidebar, Header, and Main Content
   - Set up theme provider
   - Set up toast provider

### Step 6: Dashboard Page

1. **Create Dashboard Page (`app/dashboard/page.tsx`)**
   - Fetch dashboard data from API
   - Display summary cards for total production, items produced, and expenses
   - Display recent transactions

2. **Create Dashboard Components**
   - `components/dashboard/summary-card.tsx`
   - `components/dashboard/production-chart.tsx`
   - `components/dashboard/recent-transactions.tsx`

### Step 7: Units Management

1. **Create Units Page (`app/units/page.tsx`)**
   - Display list of units
   - Add button to create new unit

2. **Create Unit Components**
   - `components/units/unit-form.tsx`
   - `components/units/unit-list.tsx`
   - `components/units/unit-item.tsx`
   - `components/units/delete-unit-dialog.tsx`

### Step 8: Sizes Management

1. **Create Sizes Page (`app/sizes/page.tsx`)**
   - Display list of sizes
   - Add button to create new size

2. **Create Size Components**
   - `components/sizes/size-form.tsx`
   - `components/sizes/size-list.tsx`
   - `components/sizes/size-item.tsx`
   - `components/sizes/delete-size-dialog.tsx`

### Step 9: Colors Management

1. **Create Colors Page (`app/colors/page.tsx`)**
   - Display list of colors
   - Add button to create new color
   - Color picker integration

2. **Create Color Components**
   - `components/colors/color-form.tsx`
   - `components/colors/color-list.tsx`
   - `components/colors/color-item.tsx`
   - `components/colors/delete-color-dialog.tsx`

### Step 10: Raw Materials Management

1. **Create Raw Materials Page (`app/raw-materials/page.tsx`)**
   - Display list of raw materials
   - Add button to create new raw material
   - Filter and search functionality

2. **Create Raw Material Components**
   - `components/raw-materials/raw-material-form.tsx`
   - `components/raw-materials/raw-material-list.tsx`
   - `components/raw-materials/raw-material-item.tsx`
   - `components/raw-materials/delete-raw-material-dialog.tsx`
   - `components/raw-materials/raw-material-inventory.tsx`

### Step 11: Products Management

1. **Create Products Page (`app/products/page.tsx`)**
   - Display list of products
   - Add button to create new product
   - Filter and search functionality

2. **Create Product Components**
   - `components/products/product-form.tsx`
   - `components/products/product-list.tsx`
   - `components/products/product-item.tsx`
   - `components/products/delete-product-dialog.tsx`
   - `components/products/product-inventory.tsx`

### Step 12: Customers Management

1. **Create Customers Page (`app/customers/page.tsx`)**
   - Display list of customers
   - Add button to create new customer
   - Filter and search functionality

2. **Create Customer Components**
   - `components/customers/customer-form.tsx`
   - `components/customers/customer-list.tsx`
   - `components/customers/customer-item.tsx`
   - `components/customers/delete-customer-dialog.tsx`

### Step 13: Suppliers Management

1. **Create Suppliers Page (`app/suppliers/page.tsx`)**
   - Display list of suppliers
   - Add button to create new supplier
   - Filter and search functionality

2. **Create Supplier Components**
   - `components/suppliers/supplier-form.tsx`
   - `components/suppliers/supplier-list.tsx`
   - `components/suppliers/supplier-item.tsx`
   - `components/suppliers/delete-supplier-dialog.tsx`

### Step 14: Bill of Materials Management

1. **Create Bill of Materials Page (`app/bill-of-materials/page.tsx`)**
   - Display list of bill of materials
   - Add button to create new bill of materials
   - Filter by product

2. **Create Bill of Materials Components**
   - `components/bill-of-materials/bom-form.tsx`
   - `components/bill-of-materials/bom-list.tsx`
   - `components/bill-of-materials/bom-item.tsx`
   - `components/bill-of-materials/delete-bom-dialog.tsx`
   - `components/bill-of-materials/material-selector.tsx`

### Step 15: Purchases Management

1. **Create Purchases Page (`app/purchases/page.tsx`)**
   - Display list of purchases
   - Add button to create new purchase
   - Filter by supplier and date

2. **Create Purchase Components**
   - `components/purchases/purchase-form.tsx`
   - `components/purchases/purchase-list.tsx`
   - `components/purchases/purchase-item.tsx`
   - `components/purchases/delete-purchase-dialog.tsx`
   - `components/purchases/purchase-item-form.tsx`

### Step 16: Manufacturing Orders Management

1. **Create Manufacturing Orders Page (`app/manufacturing-orders/page.tsx`)**
   - Display list of manufacturing orders
   - Add button to create new manufacturing order
   - Filter by status, customer, and date

2. **Create Manufacturing Order Components**
   - `components/manufacturing-orders/manufacturing-order-form.tsx`
   - `components/manufacturing-orders/manufacturing-order-list.tsx`
   - `components/manufacturing-orders/manufacturing-order-item.tsx`
   - `components/manufacturing-orders/delete-manufacturing-order-dialog.tsx`
   - `components/manufacturing-orders/manufacturing-order-item-form.tsx`
   - `components/manufacturing-orders/manufacturing-order-status-badge.tsx`

### Step 17: Production Management

1. **Create Production Page (`app/production/page.tsx`)**
   - Display list of productions
   - Add button to create new production
   - Filter by status and date
   - Show pending manufacturing orders

2. **Create Production Components**
   - `components/production/production-form.tsx`
   - `components/production/production-list.tsx`
   - `components/production/production-item.tsx`
   - `components/production/delete-production-dialog.tsx`
   - `components/production/production-status-selector.tsx`
   - `components/production/production-expense-form.tsx`
   - `components/production/material-availability-checker.tsx`

### Step 18: Settings Page

1. **Create Settings Page (`app/settings/page.tsx`)**
   - Form to update currency symbol
   - Form to update company information

2. **Create Settings Components**
   - `components/settings/currency-form.tsx`
   - `components/settings/company-form.tsx`

### Step 19: Authentication

1. **Set up NextAuth.js**
   - Create `app/api/auth/[...nextauth]/route.ts`
   - Configure authentication providers

2. **Create Login Page (`app/(auth)/login/page.tsx`)**
   - Login form
   - Error handling

3. **Create Register Page (`app/(auth)/register/page.tsx`)**
   - Registration form
   - Error handling

### Step 20: Testing and Deployment

1. **Write tests for critical functionality**
   - Test FIFO calculations
   - Test material availability checker
   - Test production status updates

2. **Deploy to hosting platform**
   - Set up environment variables
   - Configure MongoDB connection
   - Deploy application

## Detailed Component Specifications

### Dashboard Components

1. **Summary Card (`components/dashboard/summary-card.tsx`)**
   - Props: title, value, icon, change
   - Display a card with a title, value, icon, and percentage change

2. **Production Chart (`components/dashboard/production-chart.tsx`)**
   - Props: data
   - Display a line chart showing production over time
   - Allow filtering by time period (week, month, year)

3. **Recent Transactions (`components/dashboard/recent-transactions.tsx`)**
   - Props: transactions
   - Display a table of recent transactions
   - Include transaction type, date, amount, and status

### Units Management Components

1. **Unit Form (`components/units/unit-form.tsx`)**
   - Fields: name, symbol
   - Validation: name and symbol are required
   - Submit handler to create or update unit

2. **Unit List (`components/units/unit-list.tsx`)**
   - Props: units
   - Display a table of units
   - Include name, symbol, and actions (edit, delete)

### Raw Materials Management Components

1. **Raw Material Form (`components/raw-materials/raw-material-form.tsx`)**
   - Fields: name, description, unit
   - Validation: name and unit are required
   - Submit handler to create or update raw material

2. **Raw Material Inventory (`components/raw-materials/raw-material-inventory.tsx`)**
   - Props: rawMaterialId
   - Display a table of inventory entries
   - Include quantity, cost, date, and remaining
   - Allow adding new inventory entries

### Bill of Materials Components

1. **BOM Form (`components/bill-of-materials/bom-form.tsx`)**
   - Fields: product, materials (array of {material, quantity})
   - Validation: product and at least one material are required
   - Submit handler to create or update BOM
   - Dynamic form for adding/removing materials

2. **Material Selector (`components/bill-of-materials/material-selector.tsx`)**
   - Props: onChange, value
   - Display a searchable dropdown of materials
   - Include material name and unit

### Manufacturing Order Components

1. **Manufacturing Order Form (`components/manufacturing-orders/manufacturing-order-form.tsx`)**
   - Fields: customer, date, items (array of {product, quantity})
   - Validation: date and at least one item are required
   - Submit handler to create or update manufacturing order
   - Dynamic form for adding/removing items
   - Automatic calculation of costs and amounts based on BOM

2. **Manufacturing Order Status Badge (`components/manufacturing-orders/manufacturing-order-status-badge.tsx`)**
   - Props: status
   - Display a badge with appropriate color for each status
   - Pending: yellow, Processing: blue, Processed: green

### Production Components

1. **Production Form (`components/production/production-form.tsx`)**
   - Fields: manufacturingOrder, date, status, expenses
   - Validation: manufacturingOrder, date, and status are required
   - Submit handler to create or update production
   - Material availability check before submission
   - Dynamic form for adding/removing expenses

2. **Production Status Selector (`components/production/production-status-selector.tsx`)**
   - Props: onChange, value
   - Display a segmented control for selecting status
   - Options: Cutting, Sticking, Lasting, Finished
   - Visual indication of current status

3. **Material Availability Checker (`components/production/material-availability-checker.tsx`)**
   - Props: manufacturingOrderId
   - Check if enough materials are available for production
   - Display warning if materials are insufficient
   - Show detailed breakdown of required vs. available materials

## Utility Functions Specifications

### FIFO Calculation (`lib/utils/fifo.ts`)

1. **calculateFIFOCost**
   - Input: inventory array, quantity needed
   - Output: {cost, updatedInventory}
   - Calculate the cost of using a specific quantity of inventory using FIFO method

2. **updateInventoryFIFO**
   - Input: inventory array, quantity used
   - Output: updated inventory array
   - Update the inventory after using a specific quantity using FIFO method

### Manufacturing Utilities (`lib/utils/manufacturing.ts`)

1. **calculateProductionCost**
   - Input: BOM cost, expenses array
   - Output: total production cost
   - Calculate the total cost of production including BOM cost and additional expenses

2. **checkMaterialAvailability**
   - Input: BOM, raw materials inventory
   - Output: {available: boolean, missingMaterials: array}
   - Check if enough materials are available for production
   - Return list of missing materials if not available

### Currency Formatting (`lib/utils/currency.ts`)

1. **formatCurrency**
   - Input: amount, currency symbol
   - Output: formatted currency string
   - Format a number as currency with the specified symbol

## API Routes Specifications

### Units API

1. **GET /api/units**
   - Return list of all units
   - Optional query parameters for filtering and pagination

2. **POST /api/units**
   - Create a new unit
   - Request body: {name, symbol}
   - Return the created unit

3. **GET /api/units/[id]**
   - Return a specific unit by ID

4. **PUT /api/units/[id]**
   - Update a specific unit
   - Request body: {name, symbol}
   - Return the updated unit

5. **DELETE /api/units/[id]**
   - Delete a specific unit
   - Return success message

### Manufacturing Orders API

1. **GET /api/manufacturing-orders**
   - Return list of all manufacturing orders
   - Optional query parameters for filtering by status, customer, and date

2. **POST /api/manufacturing-orders**
   - Create a new manufacturing order
   - Request body: {customerId, date, items}
   - Calculate costs and amounts based on BOM
   - Return the created manufacturing order

3. **GET /api/manufacturing-orders/pending**
   - Return list of pending manufacturing orders
   - Used for production creation

4. **PUT /api/manufacturing-orders/[id]**
   - Update a specific manufacturing order
   - Request body: {customerId, date, items, status}
   - Return the updated manufacturing order
   - Prevent updates if status is processing or processed

### Production API

1. **GET /api/production**
   - Return list of all productions
   - Optional query parameters for filtering by status and date

2. **POST /api/production**
   - Create a new production
   - Request body: {manufacturingOrderId, date, status, expenses}
   - Check material availability
   - Update manufacturing order status
   - Update raw materials inventory using FIFO
   - Return the created production

3. **PUT /api/production/[id]**
   - Update a specific production
   - Request body: {status, expenses}
   - Update manufacturing order status if needed
   - Return the updated production

This comprehensive guide provides a detailed roadmap for implementing the manufacturing module. Each step is broken down into manageable tasks with clear specifications for components, utility functions, and API routes. 
