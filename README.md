# Simple Product Listing

A Laravel 11 + React (TypeScript) application that provides a user-friendly interface using Tailwind CSS for managing products and external API integration.

### Tech Stack
![Laravel](https://img.shields.io/badge/laravel-red.svg?style=for-the-badge&logo=laravel&logoColor=white) ![React](https://img.shields.io/badge/react-%230e86c2.svg?style=for-the-badge&logo=react&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23c2a70e.svg?style=for-the-badge&logo=typescript&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2305ab92.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Vite](https://img.shields.io/badge/vite-%23532594.svg?style=for-the-badge&logo=vite&logoColor=white)

## Key Features

- External API Integration
- Real-time Search
- Pagination
- Single Page Application (SPA)

## Prerequisites

- Composer
- Node/NPM
- PHP

## Installation

### Clone the Repository
```
git clone https://github.com/by-katorin/simple-product-listing.git
```

### Make Initial Setup

#### Backend
```
cd simple-product-listing/backend
cp .env.example .env

composer install
php artisan key:generate
```

#### Frontend
```
cd simple-product-listing/frontend
npm i
```

## Usage

### Start the Development server

#### Backend
```
php artisan serve
```
For the database, we can simply use SQLite. Create a blank _**database.sqlite**_ file inside backend/database/ folder.

In another Terminal tab/window, run migrations and seeders
```
php artisan migrate:fresh --seed
```

#### Frontend
```
npm run dev
```

### Access the Application

Visit http://localhost:5173 (or copy the Local server in `npm run dev` ) in your web browser.

![alt text](images/image01.png)
![alt text](images/image02.png)

#### Login Credentials

> <br>User: test@example.com <br> Password: password<br><br>

## Contributing

Contributions are welcome! Please follow these guidelines:

- Fork the Repository: Fork the project on GitHub.
- Create a Branch: Create a new branch for your feature or bug fix.
- Make Changes: Implement your changes and write tests.
- Submit a Pull Request: Submit a pull request to the main branch.

## Additional Notes

- For more information on the tech stacks used, please refer to their official documentation.
- Customize the project to fit your specific needs by adding more features or modifying the existing ones.
