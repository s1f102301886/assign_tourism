const drawerInput = document.getElementById('drawer_input');
    const body = document.body;

    drawerInput.addEventListener('change', function () {
        if (drawerInput.checked) {
            body.classList.add('lock-scroll');
        } else {
            body.classList.remove('lock-scroll');
        }
    });