const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

/**
 * Ensures directory exists, creates if it doesn't
 */
const ensureDirectoryExists = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
};

/**
 * Optimizes image by resizing and compressing
 * @param {string} inputPath - Path to original image
 * @param {string} outputPath - Path for optimized image
 * @param {number} maxWidth - Maximum width for resizing
 * @param {number} quality - JPEG quality (1-100)
 */
const optimizeImage = async (inputPath, outputPath, maxWidth, quality) => {
    try {
        await sharp(inputPath)
            .resize(maxWidth, null, { 
                withoutEnlargement: true,
                fit: 'inside'
            })
            .jpeg({ quality })
            .toFile(outputPath);
        
        return outputPath;
    } catch (error) {
        console.error('Image optimization error:', error);
        throw error;
    }
};

/**
 * Process image upload - creates optimized and thumbnail versions
 * @param {string} originalPath - Path to original uploaded file
 * @param {string} filename - Original filename
 * @returns {Object} Paths to optimized images
 */
const processImageUpload = async (originalPath, filename) => {
    // Ensure directories exist
    ensureDirectoryExists('uploads/optimized');
    ensureDirectoryExists('uploads/thumb');
    
    const baseName = path.parse(filename).name;
    const extension = '.jpg';
    
    const optimizedPath = `uploads/optimized/${baseName}${extension}`;
    const thumbnailPath = `uploads/thumb/${baseName}${extension}`;
    
    // Create optimized version (1200px, 70% quality)
    await optimizeImage(originalPath, optimizedPath, 1200, 70);
    
    // Create thumbnail version (400px, 50% quality)
    await optimizeImage(originalPath, thumbnailPath, 400, 50);
    
    return {
        optimizedPath,
        thumbnailPath
    };
};

module.exports = {
    processImageUpload,
    optimizeImage,
    ensureDirectoryExists
};
