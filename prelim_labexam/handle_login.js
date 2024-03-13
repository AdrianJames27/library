const formReg = document.getElementById('formReg');
const txtUsername = document.getElementById('txtUsername');
const txtPassword = document.getElementById('txtPassword');

formReg.addEventListener('submit', async (e) => {
    e.preventDefault();

    const user = {
        userId: 0,
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

        console.log(data);

        if (String(data) === 'null') {
            alert('incorrect username or password');
        } else {
            user.userId = data.userId;
            sessionStorage.setItem('currUser', JSON.stringify(user));
            location.href = "dashboard.html";
        }
    } catch (error) {
        console.error("Error");
    }

    formReg.reset();
});