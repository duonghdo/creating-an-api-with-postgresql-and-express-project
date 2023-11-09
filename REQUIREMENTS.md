# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 

    GET /products
- Show

    GET /products/:id
- Create [token required]

    POST /products
- Destroy [token required]

    DELETE /products:id

#### Users
- Index [token required]

    GET /users
- Show [token required]

    GET /users/:id
- Create

    POST /users
- Destroy [token required]

    DELETE /users/:id
- Authenticate

    POST /users/authenticate

#### Orders
- Index [token required]

    GET /orders
- Show [token required]

    GET /orders/:id
- Create

    POST /orders
- Destroy [token required]

    DELETE /orders/:id
- Add products to order

    POST /orders/:id

## Data Shapes
#### Product
- id: number
- name: string
- price: number

#### User
- id: number
- firstName: string
- lastName: string
- password: string

#### Orders
- id: number
- user_id: number
- complete: boolean

#### Order Items
- id: number
- quantity: number
- order_id: number
- product_id: number

