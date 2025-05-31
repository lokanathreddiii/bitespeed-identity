# Bitespeed Identity Reconciliation

This is a backend Node.js application for Bitespeed's Identity Reconciliation task.

## 🚀 Overview

The service receives user identity details (email and/or phone number) and:  
- Checks if a contact already exists.  
- If not, creates a new contact.  
- If yes, returns the `primaryContactId` along with all associated emails and phone numbers.

## 🔧 Tech Stack

- Node.js  
- Express.js  
- In-memory data storage

## 📦 Installation

1. Clone the repository:  
   ```bash
   git clone https://github.com/lokanathreddiii/bitespeed-identity.git
