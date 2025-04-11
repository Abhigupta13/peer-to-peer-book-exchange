# Peer-to-Peer Book Exchange Portal

A mini full-stack web application that connects Book Owners and Book Seekers to exchange or rent books.

- [Live Deployment Link]- https://peer-to-peer-book-exchange-one.vercel.app/
## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Node.js + Express.js
- **Database**: MongoDB
- **Routing**: React Router
- **API Requests**: Axios
- **Styling**: Tailwind CSS

## Features

### Core Functionality

- **User Roles**: 
  - Book Owner: Can list books.
  - Book Seeker: Can browse books.
- **Registration & Login**: 
  - Basic auth using email and password (mocked).
  - Role-based redirection to dashboards.
- **Book Listings**:
  - Owners can list books with Title, Author, Genre, Location, Contact.
  - All users can view book listings.

### UI Pages

- **Register Page**: Create account as Owner or Seeker.
- **Login Page**: Authenticate and redirect based on role.
- **Dashboard**:
  - Owner: Add/view/manage listings.
  - Seeker: Browse all listings.

## Bonus Features

- Edit listings.
- Mark as Rented/Exchanged.
- Search/filter by genre or city.
- Responsive form UI with contextual side info.
- Role-based routing.
- Basic validations for registration and login.
- MongoDB integrated for persistent user and listing storage.


## Setup Instructions

1. **Clone the repo**

```bash
git clone https://github.com/Abhigupta13/peer-to-peer-book-exchange.git
cd peer-to-peer-book-exchange
```

2. **Install dependencies for frontend and backend**

```bash
# For frontend
cd client
npm install

# For backend
cd ../server
npm install
```

3. **Environment Variables**

Create a `.env` file in `/server` with:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

4. **Run the app**

```bash
# In /server
npm run dev

# In /client
npm run dev
```

App will be running on `http://localhost:5173`.

## AI Tools Used

- ChatGPT: For generating code snippets, fixing bugs, and structuring README and components faster.

