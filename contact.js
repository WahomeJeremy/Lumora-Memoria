(function () {
    emailjs.init("KPnUY6tpSRcjUv_zB");
})();

function sendMail(event) {
    event.preventDefault(); // Prevent page reload

    const templateParams = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    emailjs.send("service_is4iui8", "template_kbdq2ue", templateParams)
        .then((response) => {
            Swal.fire({
                title: 'Email Sent',
                text: 'Your email has been sent successfully!',
                icon: 'success',
            });
            document.getElementById('contactForm').reset();
        })
        .catch((error) => {
            Swal.fire({
                title: 'Error',
                text: 'Failed to send email. Please try again later.',
                icon: 'error',
            });
            console.error('Failed to send email:', error);
        });
}

// ✅ Fix: Add event listener to the correct form
document.getElementById('contactForm').addEventListener('sendMessage', sendMail);

// ✅ Fix: Mobile Menu Toggle
document.getElementById("menuToggle").addEventListener("click", function () {
    document.querySelector("nav ul").classList.toggle("hidden");
});
