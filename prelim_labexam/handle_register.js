const formReg = document.getElementById('formReg');
const txtUsername = document.getElementById('txtUsername');
const txtPassword = document.getElementById('txtPassword');

formReg.addEventListener('submit', async (e) => {
    e.preventDefault();

    const user = {
        username: txtUsername.value,
        password: txtPassword.value
    };

    try {
        const response = await fetch("validateUser.php", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            throw new Error("Response Error");
        }

        const data = await response.json();

        if (String(data) !== 'null') {
            alert("Username already exist!");
        } else {
            await registerUser(user);
            alert("User has been added!");
            location.href = "index.html";
        }
    } catch (error) {
        console.error("Error");
    }

    formReg.reset();
});

async function registerUser(user) {
    try {
        const response = await fetch("registerUser.php", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            throw new Error("Response Error");
        }
    } catch (error) {
        console.error("Error");
    }
}