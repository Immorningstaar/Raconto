document.addEventListener('DOMContentLoaded', function() {
    // Manejo de pestañas
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remover clase active de todos
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Agregar active al seleccionado
        tab.classList.add('active');
        const tabId = tab.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
      });
    });
  
    // Validación de contraseña en tiempo real
    const passwordInput = document.getElementById('regPassword');
    if (passwordInput) {
      passwordInput.addEventListener('input', validatePassword);
    }
  
    // Validación del formulario de registro
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
      registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validatePassword() && validateConfirmPassword()) {
          alert('Cuenta creada exitosamente! Redirigiendo...');
          registerForm.reset();
          document.querySelector('.tab[data-tab="login"]').click();
        }
      });
    }
  
    // Validación del formulario de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Inicio de sesión exitoso! Redirigiendo...');
        // Aquí iría la redirección real
        // window.location.href = "perfil.html";
      });
    }
  
    // Formulario de recuperación
    const recoverForm = document.getElementById('recoverForm');
    if (recoverForm) {
      recoverForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Se ha enviado un enlace de recuperación a tu correo');
        recoverForm.reset();
        document.querySelector('.tab[data-tab="login"]').click();
      });
    }
  });
  
  function validatePassword() {
    const password = document.getElementById('regPassword').value;
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      symbol: /[!@#$%^&*]/.test(password)
    };
  
    // Actualizar interfaz
    for (const [key, isValid] of Object.entries(requirements)) {
      const element = document.getElementById(`req-${key}`);
      if (element) {
        element.classList.toggle('valid', isValid);
      }
    }
  
    return Object.values(requirements).every(Boolean);
  }
  
  function validateConfirmPassword() {
    const password = document.getElementById('regPassword').value;
    const confirm = document.getElementById('regConfirm').value;
    
    if (password !== confirm) {
      alert('Las contraseñas no coinciden');
      return false;
    }
    
    return true;
  }