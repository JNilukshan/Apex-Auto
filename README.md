# Apex Auto

Apex Auto is a full-stack web application with a Node.js backend and a React frontend. This project is set up to deploy automatically to an Ubuntu EC2 instance using GitHub Actions and Nginx.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
  - [Prerequisites](#prerequisites)
  - [Manual Deployment](#manual-deployment)
  - [Automatic Deployment via GitHub Actions](#automatic-deployment-via-github-actions)
- [License](#license)

---

## Features

- Node.js / Express backend
- React frontend
- MongoDB database integration
- PM2 process manager for backend
- Nginx reverse proxy for serving frontend and backend
- Unique deployment link for each project

---

## Project Structure

Apex-Auto/
├── backend/ # Node.js backend
├── frontend/ # React frontend
├── .github/
│ └── workflows/
│ └── deploy.yml # GitHub Actions deployment workflow
└── README.md

yaml
Copy code

---

## Deployment

### Prerequisites

- Ubuntu EC2 instance
- Node.js and npm installed
- Nginx installed
- Git installed
- PM2 installed globally
- SSH access configured

---

### Manual Deployment Steps

1. SSH into your server:

ssh ubuntu@your-ec2-ip
Update packages:

Copy code
sudo apt update -y && sudo apt install -y nodejs npm nginx git
Clone the repository:


Copy code
git clone https://github.com/JNilukshan/Apex-Auto.git
cd Apex-Auto/backend
Install backend dependencies:


Copy code
npm install
Start backend with PM2:

Copy code
sudo npm install -g pm2
pm2 start server.js --name apex-backend
pm2 save
pm2 startup | sudo bash
Build the frontend:


Copy code
cd ../frontend
npm install
npm run build
Configure Nginx:


Copy code
sudo rm -f /etc/nginx/sites-enabled/default
sudo nano /etc/nginx/sites-available/apex-auto
Paste the following Nginx config:

nginx
Copy code
server {
    listen 80;
    server_name _;

    root /home/ubuntu/Apex-Auto/frontend/dist;
    index index.html index.htm;

    location / {
        try_files $uri /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:5000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
Enable and restart Nginx:


Copy code
sudo ln -sf /etc/nginx/sites-available/apex-auto /etc/nginx/sites-enabled/apex-auto
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx
Your app should now be running at your EC2 public IP.

Automatic Deployment via GitHub Actions
The workflow deploy.yml in .github/workflows/ handles automatic deployment on every push to the master branch.

It connects to your EC2 instance via SSH and runs all deployment steps automatically.

Required GitHub secrets (not included in the repo):

EC2_HOST – your EC2 public IP

EC2_KEY – your private SSH key

MONGODB_URI – MongoDB connection string

JWT_SECRET – JWT secret key

License
MIT License © 2025

yaml
Copy code

---

If you want, I can also **add a “Quick Local Setup” section** so someone can run the backend and frontend locally **before deploying** — makes it much easier to test.  

Do you want me to add that?