# CryptoMiner Admin Dashboard

A modern admin dashboard for managing the CryptoMiner platform built with React, Tailwind CSS, and DaisyUI.

## Features

- **Dashboard**: Overview with key metrics and statistics
- **Users Management**: View all users, their earnings, referrals, and activity
- **Mining Sessions**: Monitor active and completed mining sessions
- **Payments & Rewards**: Track all token distributions (ads, referrals, mining)

## Tech Stack

- React 19
- React Router DOM
- Tailwind CSS
- DaisyUI
- Axios
- Lucide React (icons)
- React Hot Toast

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Make sure the backend server is running on `http://localhost:5000`

## Backend API Endpoints

The admin dashboard uses these endpoints:

- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/users` - List all users (with pagination)
- `GET /api/admin/users/:walletId` - User details
- `GET /api/admin/mining` - Mining sessions (with filters)
- `GET /api/admin/mining/stats` - Mining statistics
- `GET /api/admin/payments/stats` - Payment/reward statistics

## Project Structure

```
CryptoMinerAdmin/
├── src/
│   ├── components/
│   │   └── Layout/
│   │       ├── Sidebar.jsx
│   │       └── MainLayout.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Users.jsx
│   │   ├── Mining.jsx
│   │   └── Payments.jsx
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── README.md
```

## Features by Page

### Dashboard
- Total users count
- Total tokens distributed
- Active mining sessions
- Completed sessions
- Recent user growth
- Platform health metrics

### Users
- Searchable user list
- Pagination
- User details (wallet, earnings, referrals)
- Mining status
- Export functionality

### Mining
- Filter by status (all/active/completed)
- Session details
- Mining statistics
- Duration and multiplier tracking

### Payments
- Total rewards breakdown
- Ad rewards tracking
- Referral bonuses
- Mining rewards (10% bonus)
- Recent transaction history

## Authentication

Currently, the dashboard expects an admin token in localStorage:
```javascript
localStorage.setItem('adminToken', 'your-admin-token');
```

You'll need to implement proper admin authentication in the backend.

## Customization

### Colors
The dashboard uses a dark sidebar with these main colors:
- Sidebar: Gray-900
- Primary: Blue-600
- Success: Green-500
- Warning: Yellow-500
- Danger: Red-500

### Layout
- Sidebar width: 256px (w-64)
- Main content: Full width with left margin
- Responsive design with Tailwind breakpoints

## Development

Run in development mode:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Notes

- Make sure CORS is enabled in the backend for the admin dashboard
- All API calls require authentication token
- Pagination is set to 20 items per page by default
- Real-time updates are not implemented (manual refresh required)
