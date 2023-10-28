# Polling website using MERN

This is a simple polling website built with the MERN stack (MongoDB, Express.js, React and Node) . This is a web-based polling system that allows users to create and participate in polls. Users can create polls with multiple options, and other users can vote on these polls. Each user can only vote once per poll. The application displays the results of each poll.

## Frontend (React):

- A user-friendly and responsive user interface.
- User authentication for creating and voting on polls.
- A list of existing polls displayed on the homepage.
- A form to allow users to create new polls with multiple options.
- Shown poll details, including options, current votes, and total votes.
- Allow users to vote on a poll.

## Backend (Node.js with Express):

- Developed API endpoints to support CRUD operations for polls.
- Implemented user authentication and authorization.
- Users can only vote once per poll.
- Vote results for each poll has been calculate and store.

## Database (MongoDB):

- Designed a schema to store user data, poll data, and vote data.
- User information (e.g., username, email, password hash).
- Poll information (e.g., question, options, creator, and vote data).
- Data integrity and consistency.

## Features

- Users are allowed to search for polls by keywords.
- Provided the ability to sort and filter polls based on criteria like date, popularity, etc.
- Displayed user profiles with their created polls and voting history.
