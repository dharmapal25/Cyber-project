document.getElementById("password").addEventListener("input", function () {
    let password = this.value;
    let strengthText = document.getElementById("strength");
    let missingCriteria = document.getElementById("missingCriteria");

    let { strength, missing } = checkStrength(password);

    if (strength === "Weak") {
        strengthText.innerHTML = "Weak 😟";
        strengthText.className = "weak";
    } else if (strength === "Medium") {
        strengthText.innerHTML = "Medium 🙂";
        strengthText.className = "medium";
    } else if (strength === "Strong") {
        strengthText.innerHTML = "Strong 💪";
        strengthText.className = "strong";
    } else {
        strengthText.innerHTML = "";
    }

    // Show missing criteria
    missingCriteria.innerHTML = missing.length > 0 ? `Missing: ${missing.join(", ")}` : "";
});

// Show input value on pressing "Enter"
document.getElementById("password").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("showPassword").innerText = `Entered Password: ${this.value}`;
    }
});

// Generate strong passwords when clicking button
document.getElementById("generateBtn").addEventListener("click", function () {
    let passwordsList = document.getElementById("generatedPasswords");
    passwordsList.innerHTML = ""; // Clear previous passwords

    for (let i = 0; i < 5; i++) {
        let strongPassword = generateStrongPassword();
        let li = document.createElement("li");
        li.textContent = strongPassword;
        passwordsList.appendChild(li);
    }
});

// Function to check password strength
function checkStrength(password) {
    let strength = 0;
    let missing = [];

    if (password.length >= 8) strength++; else missing.push("At least 8 characters");
    if (/[A-Z]/.test(password)) strength++; else missing.push("One uppercase letter");
    if (/[a-z]/.test(password)) strength++; else missing.push("One lowercase letter");
    if (/\d/.test(password)) strength++; else missing.push("One number");
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++; else missing.push("One special character");

    if (strength <= 2) return { strength: "Weak", missing };
    if (strength === 3 || strength === 4) return { strength: "Medium", missing };
    if (strength === 5) return { strength: "Strong", missing };

    return { strength: "Weak", missing };
}

// Function to generate a strong password
function generateStrongPassword() {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let password = "";

    for (let i = 0; i < 12; i++) { // 12-character strong password
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return password;
}