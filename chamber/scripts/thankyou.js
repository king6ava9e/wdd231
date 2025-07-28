document.addEventListener("DOMContentLoaded", function() {
  // ========== Timestamp Setting ==========
  const timestampInput = document.getElementById("timestamp");
  if (timestampInput) {
    const now = new Date();
    timestampInput.value = now.toLocaleString(); // e.g., "7/27/2025, 9:04:23 AM"
  }

  // ========== Query String Processing ==========
  const params = new URLSearchParams(window.location.search);
  const resultsDiv = document.querySelector(".results");

  if (resultsDiv) {
    // Extract form data (keeping all original parameter names)
    const firstName = params.get("fname");
    const lastName = params.get("lname");
    const email = params.get("email");
    const phone = params.get("phone");
    const business = params.get("businessname");
    const timestamp = params.get("timestamp");

    // Create HTML to display (identical to your original template)
    resultsDiv.innerHTML = `
      <h2>Your Submitted Information</h2>
      <ul>
        <li><strong>First Name:</strong> ${firstName || 'Not provided'}</li>
        <li><strong>Last Name:</strong> ${lastName || 'Not provided'}</li>
        <li><strong>Email:</strong> ${email || 'Not provided'}</li>
        <li><strong>Phone Number:</strong> ${phone || 'Not provided'}</li>
        <li><strong>Business Name:</strong> ${business || 'Not provided'}</li>
        <li><strong>Submitted At:</strong> ${timestamp || 'Not available'}</li>
      </ul>
    `;
  }
});