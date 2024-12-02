import express from "express";
import cors from "cors";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { dirname } from "path";
import { fileURLToPath } from "url";

//Import middlewares for vision api
import {
    ocrImageUrl,
    describeImageUrl,
    generateAlt,
} from "./middlewares/vision.js";

//Import middlewares for Validation
import {
    validateUrl,
    validateImage,
} from "./middlewares/validation.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Environment variables
const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || `localhost:${PORT}`;

//Swagger 
const swaggerDefinition = {
    info: {
        title: "Vision API",
        version: "1.0.0",
        description: "Text extraction through Custom Vision API for Azure",
    },
    host: BASE_URL,
};

const options = {
    swaggerDefinition,
    apis: ["./app.js"],
    customCssUrl: "app.css",
};

const swaggerSpec = swaggerJSDoc(options);

//Server
const app = express();

//Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" })); //Image/request size limit


// Root route to show a welcome message
app.get('/', (req, res) => {
    res.send(`Hello, You are at Arif Text Extraction website!<br>Please add <code>/docs</code> to the URL to explore more.`);
});

//Routes
app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
        customCss: ".scheme-container { display: none !important }",
    })
);

/**
 * @swagger
 * /textExtraction:
 *   post:
 *     description: Get text from image URL
 *     tags: [Text Extraction]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: url
 *         description: Image URL.
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             url:
 *               type: string
 *               example: https://quotefancy.com/media/wallpaper/3840x2160/3137301-Jimmy-Wales-Quote-I-have-always-viewed-the-mission-of-Wikipedia-to.jpg
 *     responses:
 *       200:
 *         description: Extracted text
 *       400:
 *         description: Invalid URL/Request
 *       500:
 *         description: Internal Server Error
 */
app.post("/textExtraction", validateUrl, ocrImageUrl, async (req, res) => {
    res.send(req.ocrResult.recognizedText);
});

/**
 * @swagger
 * /describeUrl:
 *   post:
 *     description: Get description for image URL
 *     tags: [Image Description]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: url
 *         description: Image URL.
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             url:
 *               type: string
 *               example: https://cdn.pixabay.com/photo/2015/10/01/17/17/car-967387_1280.png
 *     responses:
 *       200:
 *         description: Image description
 *       400:
 *         description: Invalid URL/Request
 *       500:
 *         description: Internal Server Error
 */
app.post("/describeUrl", validateUrl, describeImageUrl, async (req, res) => {
    res.send(req.imageDescription);
});

/**
 * @swagger
 * /generateAlt:
 *   post:
 *     description: Generate alternative text for an image. Returns image description and OCR text.
 *     tags: [Alt Text Generation]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: image
 *         description: Image data.
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             url:
 *               type: string
 *               example: https://e7.pngegg.com/pngimages/491/861/png-clipart-traffic-sign-computer-file-fiat-automobiles-logo-dmv-traffic-signs-angle-text.png
 *             uri:
 *               type: string
 *               example: 
 *          
 *     responses:
 *       200:
 *         description: Generated alternative text
 *       400:
 *         description: Invalid image data
 *       500:
 *         description: Internal Server Error
 */
app.post("/generateAlt", validateImage, generateAlt, async (req, res) => {
    res.send(req.altText || "Something went wrong");
});

//Format response from thrown errors
app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).send(err.message);
});

//Start server
app.listen(PORT, () => console.log(`app listening on port ${PORT}!`));



