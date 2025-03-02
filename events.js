
    document.querySelectorAll(".fade-target").forEach((element, index) => {
        setTimeout(() => {
            element.classList.add("fade-in");
        }, index * 200); 
        

            phoneInput.addEventListener("keypress", async (e) => {
                if (e.key === "Enter") {
                    const phone = phoneInput.value;
                    if (!phone) return showNotification("Phone number is required!", false);
                    document.body.removeChild(phoneInput);

                    try {
                        const response = await fetch("http://localhost:5000/purchase-ticket", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ phone, amount: 1000, event: eventTitle })
                        });
                        const data = await response.json();
                        showNotification(data.message, data.success);
                    } catch (error) {
                        showNotification("Payment failed! Try again.", false);
                    }
                }
            });
        });