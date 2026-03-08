document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("overlay");
    const roleBox = document.getElementById("roleBox");
    const loginBox = document.getElementById("loginBox");
    const roleTitle = document.getElementById("roleTitle");
    const loginBtn = document.getElementById("loginBtn");

    const togglePassword = document.getElementById("togglePassword");
    const passwordInput = document.getElementById("password");
    const signInBtn = document.getElementById("signInBtn");

    const backBtn = document.getElementById("backBtn");
    const eyeBtn = document.getElementById("eyeBtn");

    const passwordLabels = document.querySelectorAll(".auth-label");
    const passwordLabel = passwordLabels[1];

    let selectedRole = null;

    function applyRoleMode() {
        if (selectedRole === "Staff") {
            roleTitle.innerHTML = `Login as: <b>${selectedRole}</b>`;
            passwordLabel.textContent = "Staff PIN";
            passwordInput.placeholder = "Enter 4-digit PIN";
            passwordInput.maxLength = 4;
            passwordInput.setAttribute("inputmode", "numeric");
            passwordInput.setAttribute("pattern", "[0-9]{4}");
            passwordInput.value = "";
        } else if (selectedRole === "Owner") {
            roleTitle.innerHTML = `Login as: <b>${selectedRole}</b>`;
            passwordLabel.textContent = "Password";
            passwordInput.placeholder = "Enter Password";
            passwordInput.removeAttribute("maxlength");
            passwordInput.removeAttribute("inputmode");
            passwordInput.removeAttribute("pattern");
            passwordInput.value = "";
        }
    }

    loginBtn.addEventListener("click", () => {
        overlay.style.display = "flex";
        roleBox.style.display = "block";
        loginBox.style.display = "none";
    });

    document.querySelectorAll("[data-role]").forEach(button => {
        button.addEventListener("click", () => {
            selectedRole = button.dataset.role;
            roleBox.style.display = "none";
            loginBox.style.display = "grid";
            applyRoleMode();
        });
    });

    backBtn.addEventListener("click", () => {
        loginBox.style.display = "none";
        roleBox.style.display = "block";
        passwordInput.value = "";
        togglePassword.checked = false;
        passwordInput.type = "password";
    });

    passwordInput.addEventListener("input", () => {
        if (selectedRole === "Staff") {
            passwordInput.value = passwordInput.value.replace(/\D/g, "").slice(0, 4);
        }
    });

    togglePassword.addEventListener("change", () => {
        passwordInput.type = togglePassword.checked ? "text" : "password";
    });

    eyeBtn.addEventListener("click", () => {
        const nowText = passwordInput.type === "password";
        passwordInput.type = nowText ? "text" : "password";
        togglePassword.checked = nowText;
    });

    signInBtn.addEventListener("click", () => {
        const enteredValue = passwordInput.value.trim();

        if (selectedRole === "Staff") {
            if (!/^\d{4}$/.test(enteredValue)) {
                alert("Staff PIN must be exactly 4 digits.");
                return;
            }

            window.location.href = "../Staff/staff.html";
        } else if (selectedRole === "Owner") {
            if (enteredValue === "") {
                alert("Please enter password.");
                return;
            }

            window.location.href = "../owner/owner.html";
        } else {
            alert("Please select a role first.");
        }
    });

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            overlay.style.display = "none";
        }
    });
});