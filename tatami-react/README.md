# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
## Integrate React Google Sign In To Your Applications

### Steps to be followed:  

<h2>Step 1: Login and create a project on the google cloud console</h2>

<p>Go to the google cloud console and log in with your Gmail. Create a new project by clicking on the project list button, which is placed on the top left side of the window.</p>

<p style="text-align:center"><img alt="Google cloud console create account" class="" data-src="https://f4n3x6c5.stackpathcdn.com/article/google-authentication-for-react-application/Images/1Create New Project google cloud console.png" style="height: 536px; width: 600px; visibility: visible;" src="https://f4n3x6c5.stackpathcdn.com/article/google-authentication-for-react-application/Images/1Create New Project google cloud console.png" data-xblocker="passed"></p>

<p>In the project input field, leave a project name whatever your wish. For testing purposes, I entered google-login-01. Choose an organization on the location browse field. If not, let it default.</p>

<p style="text-align:center"><img alt="cloud console project name" class="" data-src="https://f4n3x6c5.stackpathcdn.com/article/google-authentication-for-react-application/Images/2configure project.png" style="height: 514px; width: 600px; visibility: visible;" src="https://f4n3x6c5.stackpathcdn.com/article/google-authentication-for-react-application/Images/2configure project.png" data-xblocker="passed"></p>

<h2>Step 2: Create an OAuth consent screen and configure it</h2>

<p>Once you created a project you will be redirected to the cloud console Dashboard where you can see the “API &amp; Services” in the left sidebar.</p>

<p>Click on the APIs &amp; Services” &gt; choose any on the right popup then you will be taken to the new view.</p>

<p style="text-align:center"><img alt="google cloud api and services" class="" data-src="https://f4n3x6c5.stackpathcdn.com/article/google-authentication-for-react-application/Images/3api and servics.png" style="height: 433px; width: 600px; visibility: visible;" src="https://f4n3x6c5.stackpathcdn.com/article/google-authentication-for-react-application/Images/3api and servics.png" data-xblocker="passed"></p>

<p>Click on the OAuth consent screen and choose the User type “External” check box. &gt;&gt; Create.</p>

<p style="text-align:center"><img alt="google cloud consent screen" class="" data-src="https://f4n3x6c5.stackpathcdn.com/article/google-authentication-for-react-application/Images/4authscreen.png" style="height: 386px; width: 600px; visibility: visible;" src="https://f4n3x6c5.stackpathcdn.com/article/google-authentication-for-react-application/Images/4authscreen.png" data-xblocker="passed"></p>

<p>Under the App information, enter the App name, user support email, and developer contact information. Now the OAuth consent screen configuration has been completed so click on SAVE AND CONTINUE.</p>

<p style="text-align:center"><img alt="google cloud consent screen" class="" data-src="https://f4n3x6c5.stackpathcdn.com/article/google-authentication-for-react-application/Images/5consent screen.png" style="height: 818px; width: 600px; visibility: visible;" src="https://f4n3x6c5.stackpathcdn.com/article/google-authentication-for-react-application/Images/5consent screen.png" data-xblocker="passed"></p>

<p>Configure the Scope, which helps get what kind of information you want to fetch from the user login. If we want specific, choose whatever you want by clicking on ADD AND REMOVE SCOPES. Otherwise let it default. By default, it will give the user Email, Given-name, Family-name, Name, and profile URL.</p>

<p style="text-align:center"><img alt="cloud console scopes" class="" data-src="https://f4n3x6c5.stackpathcdn.com/article/google-authentication-for-react-application/Images/6scope.png" style="height: 320px; width: 600px; visibility: visible;" src="https://f4n3x6c5.stackpathcdn.com/article/google-authentication-for-react-application/Images/6scope.png" data-xblocker="passed"></p>

<p>Followed by the “ADD AND REMOVE SCOPE” let it be default or testing if required, you can fill it based on your requirements.</p>

<p>Click SAVE AND CONTINUE</p>

<p style="text-align:center"><img alt="google cloud consent screen" class="" data-src="https://f4n3x6c5.stackpathcdn.com/article/google-authentication-for-react-application/Images/7scope save and continue.png" style="height: 552px; width: 600px; visibility: visible;" src="https://f4n3x6c5.stackpathcdn.com/article/google-authentication-for-react-application/Images/7scope save and continue.png" data-xblocker="passed"></p>

<p>Let’s move on test users. We can add several test users who can only able to access this app. For testing purposes, let me leave it as default.</p>

<p style="text-align:center"><img alt="0Auth consent screen" class="" data-src="https://f4n3x6c5.stackpathcdn.com/article/google-authentication-for-react-application/Images/8test users.png" style="height: 385px; width: 600px; visibility: visible;" src="https://f4n3x6c5.stackpathcdn.com/article/google-authentication-for-react-application/Images/8test users.png" data-xblocker="passed"></p>

<p>End of the OAuth consent screen, we can check all configurations in the summary screen. Make sure that the user type is “external” and click on BACK TO DASHBOARD.</p>

<p style="text-align:center"><img alt="0Auth consent screen" class="" data-src="https://f4n3x6c5.stackpathcdn.com/article/google-authentication-for-react-application/Images/9summery.png" style="height: 891px; width: 600px; visibility: visible;" src="https://f4n3x6c5.stackpathcdn.com/article/google-authentication-for-react-application/Images/9summery.png" data-xblocker="passed"></p>

<h2>Step 3: Create credentials for the web client Id</h2>

<p>Let’s explore the important part of creating an OAuth client ID. Click on the Credentials on the left pane and choose OAuth client ID to access the user’s data.</p>

<p style="text-align:center"><img alt="google auth client id" class="" data-src="https://f4n3x6c5.stackpathcdn.com/article/google-authentication-for-react-application/Images/10create credentials.png" style="height: 325px; width: 600px; visibility: visible;" src="https://f4n3x6c5.stackpathcdn.com/article/google-authentication-for-react-application/Images/10create credentials.png" data-xblocker="passed"></p>

<p>A client ID helps us to identify a single application to Google OAuth servers. If you want to run it on multiple platforms? Then, Need to create one&nbsp;for each platform. Our demo, Its react app. So, click on Application as a Web application.</p>

<p style="text-align:center"><img alt="Google sign in for web application" class="" data-src="https://f4n3x6c5.stackpathcdn.com/article/google-authentication-for-react-application/Images/11App Type.png" style="height: 345px; width: 600px; visibility: visible;" src="https://f4n3x6c5.stackpathcdn.com/article/google-authentication-for-react-application/Images/11App Type.png" data-xblocker="passed"></p>

<p>Let's move further to client ID configurations. Enter the app name in the Name field which is a mandatory field.</p>

<p>Authorized JavaScript origins</p>

<p>As you know, we are going to test in localhost therefore add the URI1 is http://localhost and followed by the URI2 combination of port number. If you want to deploy the app somewhere please make it URI2 is your actual domain. &nbsp;</p>

<p>Authorized redirect URIs</p>

<p>Here is the redirect URI configuration, add your local host in URI1 and a combination of the port number in URI2. &nbsp;</p>

<p>Note: For testing purposes, I have given that both JavaScript and redirect URIs are the same. You can modify based on requirements. &nbsp;</p>

<p>Once done with the URIs config, click on CREATE to move further.</p>

<p style="text-align:center"><img alt="google auth client id creation" class="" data-src="https://f4n3x6c5.stackpathcdn.com/article/google-authentication-for-react-application/Images/12create auth client ID.png" style="height: 778px; width: 600px; visibility: visible;" src="https://f4n3x6c5.stackpathcdn.com/article/google-authentication-for-react-application/Images/12create auth client ID.png" data-xblocker="passed"></p>

<p>Finally, we created an OAuth client. Note: Your client ID, which&nbsp;we are going to add in the react app next.</p>

<p style="text-align:center"><img alt="Google Sign in Client Id" class="" data-src="https://f4n3x6c5.stackpathcdn.com/article/google-authentication-for-react-application/Images/13Grap OAuth client Id.png" style="height: 459px; width: 600px; visibility: visible;" src="https://f4n3x6c5.stackpathcdn.com/article/google-authentication-for-react-application/Images/13Grap OAuth client Id.png" data-xblocker="passed"></p>
<h2>Step 4: Add client Id into .env file.</h2>


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
