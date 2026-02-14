# Backend Setup Instructions

## Prerequisites
- Node.js installed
- SQL Server installed on your machine

## Step 1: Configure SQL Server Connection

Edit the `backend/.env` file and update the following values:

```
SERVER=localhost        # Your SQL Server name (e.g., localhost or localhost\SQLEXPRESS)
DATABASE=AlsafaClinic  # Database name (will be created if it doesn't exist)
USER=sa                # SQL Server username
PASSWORD=your_password  # SQL Server password
PORT=1433              # SQL Server port (default is 1433)
```

## Step 2: Install Backend Dependencies

Open a terminal and run:

```
bash
cd backend
npm install
```

## Step 3: Start the Backend Server

```
bash
npm start
```

The server will:
1. Connect to SQL Server
2. Create the database if it doesn't exist
3. Create tables if they don't exist
4. Seed default data if the tables are empty
5. Start listening on port 3001

## Step 4: Update Frontend API URL (if needed)

If your backend runs on a different port or you're accessing it remotely, update the API_BASE_URL in `contexts/AdminContext.tsx`:

```
javascript
const API_BASE_URL = 'http://localhost:3001/api';  // Change this to your server URL
```

## Step 5: Run the Frontend

In a separate terminal, run:

```
bash
npm run dev
```

## How It Works

1. **Frontend** (React) fetches content from the backend API
2. **Backend** (Node.js + Express) connects to SQL Server
3. **SQL Server** stores all the website content centrally

Now when the admin makes changes:
- Changes are saved to SQL Server
- All users will see the updated content when they refresh the page!

## Troubleshooting

### SQL Server Connection Issues
- Make sure SQL Server is running
- Check your server name, username, and password in `.env`
- Ensure TCP/IP is enabled in SQL Server Configuration Manager

### Port Already in Use
If port 3001 is already in use, change the port in `.env`:
```
PORT=3002
```

### Database Creation Fails
If the database creation fails, create it manually in SQL Server Management Studio:
```
sql
CREATE DATABASE AlsafaClinic;
