# Photogram Backend

Backend service for the Photogram application, leveraging Telegram's cloud capabilities for file storage. This project uses Node.js, Express, MongoDB, and the Telegram MTProto API.

## 🚀 Features

- **Telegram Authentication**: Secure login using Telegram OTP.
- **Unlimited Cloud Storage**: Utilizes Telegram as a storage backend for files.
- **File Management**: Upload, list, and view files.
- **RESTful API**: Standard Express.js API structure.

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Telegram Client**: `telegram` (GramJS/Telegram Client)
- **Authentication**: JSON Web Tokens (JWT)

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/aadiix23/PhotoGram.git
   cd PhotoGram
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and add the following variables:

   ```env
   # Server Configuration
   PORT=3000

   # Database
   MONGO_URI=mongodb://localhost:27017/photogram

   # Telegram API (Get these from my.telegram.org)
   TG_API_ID=your_api_id
   TG_API_HASH=your_api_hash

   # Security
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Start the Server**
   ```bash
   npm start
   ```

## 📡 API Endpoints

### Authentication (`/auth`)
- `POST /auth/send-otp`: Send OTP to a Telegram phone number.
  - Body: `{ "phone": "+1234567890" }`
- `POST /auth/verify-otp`: Verify OTP and get JWT token.
  - Body: `{ "phone": "+1234567890", "otp": "12345" }`

### Files (`/files`)
- `POST /files/upload`: Upload a file (Authenticaion required).
- `GET /files/`: List user's files.
- `GET /files/view/:id`: View/Download a specific file.

### User (`/user`)
- User profile and management routes.

## ⚠️ Notes

- Ensure you have a valid **Telegram API ID** and **Hash** from [my.telegram.org](https://my.telegram.org).
- The application uses local filesystem `uploads/` for temporary storage before processing.

## 📄 License

This project is licensed under the ISC License.
