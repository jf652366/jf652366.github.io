---
name: "picgo-image-handler"
description: "Handles all image-related operations for this project using picgo-uploader. Invoke whenever images are mentioned, needed, or requested in this project's context."
---

# PicGo Image Handler

## Purpose

This skill handles all image-related operations for the jf652366.github.io project. It ensures that all images in this project are automatically uploaded using picgo-uploader.

## When to Invoke

ALWAYS invoke this skill when:
- The user mentions images, upload, upload images
- The task involves adding images to documentation
- The user asks to handle image operations
- You need to insert images in markdown files
- The user provides image paths for upload

## How to Use

### 1. Image Upload Workflow

When a user provides an image path (absolute path):
1. Use `mcp_picgo-uploader` server's `upload_image_via_picgo` tool
2. Pass the image absolute paths as an array to the `image_paths` parameter
3. Provide the returned CDN URL to the user

### 2. Markdown Image Insertion

After uploading images, insert them into markdown files using the standard markdown syntax:
```markdown
![Image Description](https://cdn.jsdelivr.net/gh/jf652366/pic-bed@main/...)
```

### 3. Multiple Images

You can upload multiple images at once by passing an array of paths.

## Project Context

This skill is specifically configured for:
- Project: jf652366.github.io (VitePress knowledge base)
- PicGo configuration: GitHub repo pic-bed with jsDelivr CDN
- Primary use: documentation images

## Examples

### Upload an image from desktop
```
Input: /Users/jinfeng/Desktop/image.png
Output: https://cdn.jsdelivr.net/gh/jf652366/pic-bed@main/...
```

### Upload and insert to markdown
1. Upload image via picgo-uploader
2. Insert the returned URL into the target markdown file

## Notes

- Always use absolute paths for images
- Ensure PicGo application is running and server is enabled on port 36677
- Images are automatically uploaded to the configured GitHub pic-bed repository
