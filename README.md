Assessment Task: Real-Time Collaborative Document Editing Application

Objective

Develop a real-time collaborative document editing application that allows multiple users to edit a document simultaneously. The application provides a responsive user interface, handles concurrent edits gracefully, and ensures data consistency across all users. This project demonstrates proficiency in Node.js, React.js, SQL, NoSQL, cloud services, and WebSocket integration.

Implementation Summary

1. User Interface (Frontend)

Document Editor

Rich Text Editor: Integrated react-quill for a responsive and user-friendly text editing experience with features like bold, italic, underline, and bullet lists.

Real-Time Editing: Enabled collaborative document editing with WebSocket integration using Socket.IO, ensuring all changes are propagated in real-time with minimal latency.

User Presence Indicator

Real-Time User List: Displays users currently editing the document with their names and presence status.

Dynamic Updates: Updates the user list in real-time when users join or leave the document.

Version History

Comprehensive History: Tracks and displays version history for the document.

Revert Functionality: Allows users to revert to earlier versions of the document when needed.

2. Backend Services

Authentication API

User Registration: Secure sign-up functionality with unique username and email validations.

Login System: Secure user login with password hashing (bcrypt) and token-based authentication (JWT).

Session Management: Manages user sessions and tokens securely.

Document Management API

CRUD Operations: Implemented endpoints for creating, reading, updating, and deleting documents.

Version Control: Maintains document revision history with timestamps for rollback functionality.

Real-Time Collaboration Service

WebSocket Connections: Handles real-time updates using Socket.IO to synchronize changes across multiple users.

Connection Management: Manages dropouts and reconnections seamlessly, ensuring data integrity.

3. Database Architecture

SQL Database (MySQL)

User Management: Stores user information, including usernames, emails, and hashed passwords.

Document Metadata: Maintains relationships between users and documents (e.g., ownership, access permissions).

NoSQL Database (MongoDB)

Document Content: Stores document data and revision history for efficient retrieval and updates.

Version History: Tracks changes to allow users to view or revert to previous document states.

4. Cloud Integration

Deployment

Platform: Hosted on a cloud service with automated build and deployment pipelines.

Static Files: Frontend built with React and served as static files from the backend.

Scalability

WebSocket Scaling: Configured backend to handle multiple WebSocket connections efficiently, ensuring smooth collaboration.

Load Balancing: Ready for scaling as user base increases.

Deliverables

Codebase

Complete source code repository with modular and well-documented code.

Backend implemented using Node.js and Express with structured routes and controllers.

Frontend built with React.js for a responsive and intuitive user experience.

Features Delivered

Real-time collaborative document editing with live updates.

Secure authentication system with login and sign-up pages.

User presence indicators and version history.

CRUD operations for document management.

Documentation

Setup Instructions: Comprehensive guide to set up the development and production environments.

Database Schema: Detailed structure and queries for SQL (MySQL) and NoSQL (MongoDB) databases.

Deployment Steps: Instructions for hosting the application on a cloud platform.

Testing Guide: Procedures to test user flows, real-time updates, and error handling.

Highlights

Real-Time Collaboration: Enabled seamless multi-user collaboration with minimal latency.

Secure Authentication: Implemented secure user registration and login workflows.

Scalability-Ready: Built with a scalable architecture for handling concurrent users efficiently.

User-Friendly Interface: Designed a responsive and intuitive frontend.

Comprehensive Documentation: Provided detailed guides to aid in deployment and further development.

