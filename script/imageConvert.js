document.addEventListener("DOMContentLoaded", function () {
    const imageInput = document.getElementById("imageInput");
    const convertButton = document.getElementById("convertButton");
    const outputImage = document.getElementById("outputImage");
    const downloadButton = document.getElementById("downloadButton");
    const imageStatus = document.getElementById("imageStatus");

    imageInput.addEventListener("change", function () {
        if (imageInput.files.length === 0) {
            imageStatus.textContent = "No file chosen";
        } else {
            const selectedFile = imageInput.files[0];
            if (!selectedFile.type.startsWith("image/")) {
                imageStatus.textContent = "Invalid file";
            } else {
                imageStatus.textContent = `Selected file: ${selectedFile.name}`;
            }
        }
    });

    convertButton.addEventListener("click", function () {
        if (imageInput.files.length === 0) {
            imageStatus.textContent = "Please select an image file.";
            return;
        }

        const selectedFile = imageInput.files[0];
        if (!selectedFile.type.startsWith("image/")) {
            imageStatus.textContent = "Please select a valid image file.";
            return;
        }

        imageStatus.textContent = `Uploading ${selectedFile.name}...`;

        const reader = new FileReader();
        reader.onload = function () {
            const img = new Image();
            img.src = reader.result;
            img.onload = function () {
                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
                const webpData = canvas.toDataURL("image/webp");
                outputImage.style.display = "block";
                outputImage.src = webpData;
                downloadButton.style.display = "block";
                downloadButton.href = webpData;
                imageStatus.textContent = `Uploaded: ${selectedFile.name}`;
                const conversionMessage = confirm("File uploaded successfully. Do you want to convert it to WebP?");
                if (conversionMessage) {
                    imageStatus.textContent = "Image converted to WebP.";
                } else {
                    imageStatus.textContent = "Image not converted to WebP.";
                }
            };
        };
        reader.readAsDataURL(selectedFile);
    });
});
