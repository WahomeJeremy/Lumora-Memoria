document.addEventListener("DOMContentLoaded", () => {
    const uploadForm = document.getElementById("uploadForm");

    uploadForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const story = document.getElementById("story").value;
        const imageInput = document.getElementById("imageInput").files[0];

        if (!imageInput) {
            alert("Please select an image.");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("story", story);
        formData.append("image", imageInput);

        const response = await fetch("http://localhost:5000/upload", {
            method: "POST",
            body: formData
        });

        const result = await response.json();
        if (response.ok) {
            alert("Submission sent to Admin`s email! 📩");
            uploadForm.reset();
        } else {
            alert("Upload failed: " + result.error);
        }
    });
});