# Vision API Application

# Table of Contents

1. [Overview](#1-overview)
2. [Steps in Setting and Cloning the Repo](#2-setting-up-the-repository)
3. [Steps to Set Up Azure Vision API](#3-steps-to-set-up-azure-vision-api)
4. [Running the Application](#4-running-the-application)
5. [Accessing the API online](#accessing-the-api-documentation-online)
6. [API Endpoint Details and Its Uses](#5-api-endpoints)
7. [Steps to Debug Issues](#6-debugging-guide)
8. [Business Benefits of This Application](#7-business-benefits)
9. [Resources](#8-resources)

## **1. Overview**
This application provides robust capabilities for text extraction, image description, and alternative text generation using Azure Vision API. It is designed to be used through tools like **Postman** or **Swagger Documentation**.

## **1.1 Features**
- **Text Extraction**: Extract text from an image URL.
- **Image Description**: Generate descriptive summaries for images.
- **Alt Text Generation**: Produce alt text for accessibility and extract OCR results from images.

## **2. Setting Up the Repository**

1. **Initialize a GitHub Repository**:
   - Visit GitHub and create a new repository.
   - Clone it locally:
     ```bash
     git clone https://github.com/username/vision-api-app.git
     cd vision-api-app
     ```
   - Add the provided code into the cloned directory.

2. **Install Node.js and npm**:
   - Ensure you have latest Node.js installed. [Download it from Node.js Official Website](https://nodejs.org/).
   - Verify the installation:
     ```bash
     node -v
     npm -v
     ```

3. **Install Dependencies**:
   - Run the following commands in the project directory:
     ```bash
     npm install
     ```

---

## **3. Steps to Set Up Azure Vision API**
1. **Sign Up for Azure**:
   - Go to [Azure Portal](https://portal.azure.com/) and create an account.
   - Free-tier credits are available for new users.

2. **Create a Vision API Resource**:
   - Navigate to **Azure Cognitive Services** in the Azure Portal.
   - Click **Create Resource > Computer Vision**.
   - Select your **Subscription**, create a new **Resource Group**, and provide a **Name** for the service.
   - Choose the **Pricing Tier** (Free or Standard) and **Region**.

3. **Retrieve API Keys and Endpoint**:
   - After creating the resource, go to the **Keys and Endpoint** tab.
   - Copy the **Key1** or **Key2** and the **Endpoint URL**.

4. **Update the Application**:
   - Replace placeholders in your `vision.js` middleware with your Azure Vision API key and endpoint:
     ```javascript
     const visionApiKey = 'YOUR_API_KEY';
     const visionApiEndpoint = 'YOUR_API_ENDPOINT';
     ```

   For more details, refer to the [Azure Computer Vision Documentation](https://learn.microsoft.com/en-us/azure/cognitive-services/computer-vision/).

---

## **4. Running the Application**

### ** Steps to Run Locally**
1. **Set Up Environment Variables**:
   - Create a `.env` file in the root directory:
     ```bash
     PORT=3000
     BASE_URL="137.184.154.129:3000" # Optional, Default is localhost:3000
     AZURE_VISION_KEY=your_azure_vision_key
     AZURE_VISION_ENDPOINT=your_azure_vision_endpoint
     ```

2. **Start the Application**:
   ```bash
   node app.js
The server will start at http://localhost:3000.

3. **Access Swagger Documentation:**
   - Navigate to `http://localhost:3000/docs` to explore available endpoints and test them.

4. **Using Postman:**
   - Download and install [Postman](https://www.postman.com/).
   - Test the following endpoints:
     - **Text Extraction** (`/textExtraction`): Extract text from an image URL.
     - **Image Description** (`/describeUrl`): Get a description of the image.
     - **Alt Text Generation** (`/generateAlt`): Generate alt text from an image.

### **Accessing the API Documentation online**

To access the API documentation for the Vision API application, follow these steps:

1. **Open a Web Browser:**
   - Launch any web browser of your choice (e.g., Chrome, Firefox, Safari).

2. **Navigate to the API Documentation URL:**
   - Enter the following URL in the address bar:
     ```
     http://137.184.154.129:3000/docs/
     ```
   - Press `Enter`.

3. **Explore the API Endpoints:**
   - Once the page loads, you will see a list of available API endpoints.
   - Click on any endpoint to expand it and view details such as:
     - **Description:** A brief overview of what the endpoint does.
     - **Request Type:** The HTTP method (GET, POST, etc.) used for the request.
     - **Parameters:** Required and optional parameters you can send with the request.
     - **Example Requests:** Sample payloads to help you understand how to format your requests.

4. **Test API Endpoints:**
   - You can use the provided interface to test the endpoints directly from the documentation page.
   - Fill in the necessary parameters and click on the **Try it out** button to send a request and see the response.

5. **Review Responses:**
   - Check the response from the API below the request section to see the returned data, including status codes and any error messages.

By following these steps, you can easily access and test the API documentation online.

## 5. API Endpoints

| Endpoint          | Method | Description                                           |
|-------------------|--------|-------------------------------------------------------|
| /textExtraction    | POST   | Extract text from an image URL.                      |
| /describeUrl       | POST   | Generate a description for an image URL.             |
| /generateAlt       | POST   | Create alt text and OCR results from an image.       |

### 5.1. Example Payloads

1. **Text Extraction (/textExtraction)**:
   ```json
   {
     "url": "https://quotefancy.com/media/wallpaper/3840x2160/3137301-Jimmy-Wales-Quote-I-have-always-viewed-the-mission-of-Wikipedia-to.jpg"
   }

2. **Image Description (/describeUrl)**:
   ```json
   {
     "url": "https://cdn.pixabay.com/photo/2015/10/01/17/17/car-967387_1280.png"
   }

3. **Alt Text Generation (/generateAlt)**:
   ```json
   {
     "url": "https://e7.pngegg.com/pngimages/491/861/png-clipart-traffic-sign-computer-file-fiat-automobiles-logo-dmv-traffic-signs-angle-text.png"
   }



## **6. Debugging Guide**

### **6.1. Common Errors**

#### **1. Invalid API Key or Endpoint**
- **Error**: `401 Unauthorized`
- **Fix**: Verify the `AZURE_VISION_KEY` and `AZURE_VISION_ENDPOINT` in the `.env` file to ensure they match the credentials provided in your Azure Vision API resource.

#### **2. Invalid Image URL**
- **Error**: `400 Bad Request`
- **Fix**: Ensure the image URL provided in the request is publicly accessible and properly formatted.

#### **3. Server Errors**
- **Error**: `500 Internal Server Error`
- **Fix**: Check application logs for detailed error messages to identify the root cause of the issue.

#### **4. CORS Issues**
- **Error**: `Blocked by CORS Policy`
- **Fix**: Ensure the `cors` middleware is correctly configured in your application:
  ```javascript
  const cors = require('cors');
  app.use(cors());

### **6.2. Debugging Steps**

#### **1. Enable Debug Mode**
Use the `DEBUG` environment variable to enable debug logging for the application:
```bash
DEBUG=app:* node app.js;
```
#### **2. Add Request Logging**
Add the following middleware to `app.js` to log all incoming requests:
```javascript
app.use((req, res, next) => {
    console.log(`Request: ${req.method} ${req.url}`);
    next();
});
```
#### **3. Inspect Azure Responses**
Log the responses received from the Azure Vision API to troubleshoot issues:
```javascript
console.log('Azure Response:', response.data);
```

## 7. Business Benefits

### 7.1. Key Benefits
- **Improved Accessibility**:  
  Automatically generates alt text, making digital content inclusive and compliant with accessibility standards.

- **Automation and Efficiency**:  
  Automates text extraction and description generation, reducing manual effort.

- **Versatile Use Cases**:  
  Ideal for e-commerce, education, media, and accessibility-focused industries.

- **Scalable and Reliable**:  
  Powered by Azure Vision API, ensuring performance and scalability for enterprise needs.

### 7.2. Selling Points
- **For Enterprises**:  
  Drive engagement by improving digital content usability.

- **For Developers**:  
  Accelerate development with prebuilt APIs and detailed Swagger documentation.

- **For Accessibility Advocates**:  
  Enhance inclusivity with automated alt text solutions.


## 8. Resources
- [Azure Computer Vision Documentation](https://learn.microsoft.com/en-us/azure/cognitive-services/computer-vision/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Postman Documentation](https://learning.postman.com/docs/getting-started/introduction/)



