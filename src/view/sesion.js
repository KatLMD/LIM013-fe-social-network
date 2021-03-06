import { loginUser, loginGoogle } from '../firebase/auth.js';

export default () => {
  const viewSesion = `
    <div id="inicio-sesion">
        <div class="cabeceraMobile"><img src="images/mochilerosqueda.png"></div>
        <div class="cabeceraDesktop"><img src="images/horizontal.png"></div>
        <div class="galletita">
        <div class="logotipo"><img src="images/logo-RedSocial.png"></div>
        <h2 class="styleH2">¡Bienvenido mochilero!</h2>
        <div class="form">
        <input type="text" placeholder="Correo electrónico" id="usuarioSignIn">
        <input type="password" placeholder="Contraseña" id="contraseñaSignIn">
        <button type="submit" id="buttonSignIn">Iniciar sesión</button>
        <div id="errorMessage"></div>
        </div>
        <p class="textoSignIn">Iniciar sesión con Google o Facebook</p>
        <div class="signInRS">
            <img src="images/googleRS.png" id="signGoogle">
        </div>
        <div class="registrate"><p>¿No tienes una cuenta?</p><a href="#/registro">Regístrate</a></div>
        </div>
    </div>`;

  const divElem = document.createElement('div');
  divElem.innerHTML = viewSesion;

  const buttonSignIn = divElem.querySelector('#buttonSignIn');
  const buttonGoogle = divElem.querySelector('#signGoogle');

  buttonSignIn.addEventListener('click', () => {
    const usuarioSignIn = divElem.querySelector('#usuarioSignIn').value;
    const passwordSignIn = divElem.querySelector('#contraseñaSignIn').value;
    loginUser(usuarioSignIn, passwordSignIn)
      .then((userCredential) => {
        console.log(userCredential);
        window.location.assign('#/timeline');
      })
      .catch((error) => {
        const errorContainer = divElem.querySelector('#errorMessage');
        const templateError = `<div class="modal-error"><p>Hubo un problema: ${error.message}</p></div>`;
        errorContainer.innerHTML = templateError;
      });
  });

  buttonGoogle.addEventListener('click', () => {
    loginGoogle();
  });

  return divElem;
};
