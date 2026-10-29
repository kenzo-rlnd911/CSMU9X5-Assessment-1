document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("newsletterForm");
    const emailInput = document.getElementById("newsletterEmail");
    const message = document.getElementById("newsletterMessage");

    if (!form || !emailInput || !message) return;

    // Remember submitted emails only while the page is open
    const submittedEmails = new Set();

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const email = emailInput.value.trim().toLowerCase();

        // Prevent duplicate submissions
        if (submittedEmails.has(email)) {
            message.textContent = "This email has already been submitted.";
            message.style.color = "#FFB3B3";
            return;
        }

        submittedEmails.add(email);

        // Display success notification
        message.textContent = "Subscription confirmed! Thank you for subscribing.";
        message.style.color = "#B8D8BE";

        // Clear the field for another email
        emailInput.value = "";
    });

});

document.querySelectorAll('.song-modal').forEach(modalContent => {

    const modal = modalContent.closest('.modal');

    modal.addEventListener('hide.bs.modal', function () {

        if (modal.contains(document.activeElement)) {
            document.activeElement.blur();
        }

    });

});