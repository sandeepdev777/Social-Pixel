🌐 Live Demo

Explore the live demonstration of the project: [Social Pixel](https://social-pixel.vercel.app/)

** Use the following credentials to login the app**

email-sandeepdemo7128@gmail.com

password- 7128

📝 Description


Social Pixel is a dynamic social media platform enabling users to share images and text. Developed with the MERN stack, it leverages Material-UI for a sleek, responsive front-end and implements JWT for robust, secure authentication.

✨ Technologies Used

Social-Pixel is built using the following technologies:

[![My Skills](https://skillicons.dev/icons?i=react,express,nodejs,mongodb,materialui)](https://skillicons.dev)

🧰 Get Started

To get this project up and running in your development environment, follow these step-by-step instructions.

Prerequisites:

In order to install and run this project locally, you would need to have the following installed on your local machine.

[Node.js](https://nodejs.org/en/) 

[NPM](https://docs.npmjs.com/getting-started) 

[Git](https://git-scm.com/downloads)

⚙️ Installation and Run Locally


Step 0:

Download or clone this repo by using the link below:

``` git clone https://github.com/sandeepdev777/Social-Pixel.git```

Step 1:

Note ‼️ the application uses JWT(Json Web Tokens) for Authentication. Create an ```.env``` file in your server folder and add ```PORT=3000``` the add ```JWTSECRET="any string "```

Note ‼️ the application uses Mongo Db as database, therefore, you need to create [Mongo DB atlas account](https://www.mongodb.com/cloud/atlas/register). Then paste the connection string as ```MONGO_URL="connection string"``` to your ```.env``` file

step 2:

Execute the following command in the server directory of the downloaded repo in order to install dependencies:

```npm install```

Step 3:

Execute the following command in server folder in order to run the development server locally:

```npm run build```

Now got to the client  folder and run the following command.

```npm start```

step4: Now got to server folder and runt the following command.

```node index.js```

Step 4:

Open http://localhost:3000 in your browser to see the result.


🔒 Environment Variables

Environment variables can be used for configuration. They must be set before running the app.

Environment variables are variables that are set in the operating system or shell, typically used to configure programs.

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
