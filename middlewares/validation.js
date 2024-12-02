//Validate if Url is valid
export const validateUrl = (req, res, next) => {
    const url = req.body?.url || null;
    if (!url) {
        return res.status(400).send("No url provided");
    }
    if (!url.startsWith("http") || url.includes(" ")) {
        return res.status(400).send("Url is not valid");
    }
    if (url.length > 1000) {
        return res.status(400).send("Url is too long");
    }
    req.parsedUrl = url;
    next();
};

//Validate if request is URL or URI
export const validateImage = (req, res, next) => {
    const url = req.body?.url || null;
    // const uri = req.body?.uri || null;
    if (!url ) {
        return res.status(400).send("No url");
    } else if (url) {
        return validateUrl(req, res, next);
    } else {
        return res.status(400).send("Something went wrong");
    }
    next();
};
