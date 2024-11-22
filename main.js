(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/".concat("wff-cohort-26"),headers:{authorization:"3030b019-4537-4e11-8fa7-8b770ae8139c","Content-Type":"application/json"}};function t(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}function n(n,r,o){var c=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),a=c.querySelector(".card__title"),i=c.querySelector(".card__image"),u=c.querySelector(".card__delete-button"),l=c.querySelector(".card__like-button"),s=c.querySelector(".card__like-amount"),d=n.name,f=n.link,p=n._id,m=n.owner._id,y=n.likes,v=y.length;return a.textContent=d,i.src=f,i.alt=d,m===r?u.addEventListener("click",(function(){!function(n,r){(function(n){return fetch("".concat(e.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:e.headers}).then(t)})(n).then((function(){r.remove(),console.log("Карточка успешно удалена")})).catch((function(e){console.log(e)}))}(p,c)})):u.remove(),l.addEventListener("click",(function(n){return function(n,r,o){n.target.classList.contains("card__like-button_is-active")?function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"DELETE",headers:e.headers}).then(t)}(r).then((function(e){n.target.classList.remove("card__like-button_is-active"),o.textContent=e.likes.length,console.log("Лайк успешно удалён")})).catch((function(e){console.log(e)})):function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"PUT",headers:e.headers}).then(t)}(r).then((function(e){n.target.classList.add("card__like-button_is-active"),o.textContent=e.likes.length,console.log("Лайк успешно поставлен")})).catch((function(e){console.log(e)}))}(n,p,s)})),i.addEventListener("click",(function(){return o(d,f)})),y.some((function(e){return e._id===r}))&&l.classList.add("card__like-button_is-active"),s.textContent=v||0,c}var r="popup_is-opened";function o(e){e.classList.add(r),e.addEventListener("keydown",a)}function c(e){e.classList.remove(r),e.removeEventListener("keydown",a)}function a(e){"Escape"===e.key&&c(document.querySelector("."+r))}function i(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(n.inactiveButtonClass),t.disabled=!1):(t.classList.add(n.inactiveButtonClass),t.disabled=!0)}function u(e,t,n){var r=e.querySelector(".".concat(t.name,"-input-error"));t.classList.remove(n.inputErrorClass),t.setCustomValidity(""),r.classList.remove(n.errorClass),r.textContent=""}function l(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){u(e,n,t)})),i(n,r,t)}function s(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(e,t)||function(e,t){if(e){if("string"==typeof e)return d(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?d(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var f={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},p=document.querySelector(".content"),m=p.querySelector(".places__list"),y=p.querySelector(".profile__title"),v=p.querySelector(".profile__description"),_=p.querySelector(".profile__image"),h=document.querySelector(".profile__edit-button"),S=document.querySelector(".profile__add-button"),g=document.querySelector(".popup_type_edit"),b=document.forms["edit-profile"],q=g.querySelector("input[name='name']"),C=g.querySelector("input[name='description']"),E=document.querySelector(".popup_type_update-avatar"),k=document.forms["update-avatar"],L=E.querySelector("input[name='avatar-link']"),x=document.querySelector(".popup_type_new-card"),A=document.forms["new-place"],w=x.querySelector("input[name='place-name']"),U=x.querySelector("input[name='link']"),T=document.querySelector(".popup_type_image"),j=T.querySelector(".popup__image"),O=T.querySelector(".popup__caption");function B(e,t){var n=e.querySelector(".popup__button");switch(t){case"start":n.textContent+="...";break;case"end":n.textContent=n.textContent.replace("...","")}}function P(e){e.querySelector(".popup__close").addEventListener("click",(function(){return c(e)})),e.addEventListener("mousedown",(function(t){t.target.classList.contains("popup")&&c(e)}))}function D(e,t){j.src=t,O.textContent=e,j.alt=e,o(T)}!function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);i(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){i(n,r,t),function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?u(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.name,"-input-error"));t.classList.add(n.inputErrorClass),o.textContent=r,o.classList.add(n.errorClass)}(e,t,n,t.validationMessage)}(e,o,t)}))}))}(t,e)}))}(f),Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{method:"GET",headers:e.headers}).then(t),fetch("".concat(e.baseUrl,"/cards"),{method:"GET",headers:e.headers}).then(t)]).then((function(e){var t=s(e,2),r=t[0],o=t[1],c=r._id;document.querySelector(".profile__title").textContent=r.name,document.querySelector(".profile__description").textContent=r.about,document.querySelector(".profile__image").style.backgroundImage="url(".concat(r.avatar,")"),o.forEach((function(e){var t=n(e,c,D);m.append(t)})),console.log("Данные профиля и карточек успешно загружены с сервера")})).catch((function(e){var t=s(e,2),n=t[0],r=t[1];console.log(n),console.log(r)})),h.addEventListener("click",(function(){q.value=y.textContent,C.value=v.textContent,l(g,f),o(g)})),S.addEventListener("click",(function(){A.reset(),l(x,f),o(x)})),_.addEventListener("click",(function(){k.reset(),l(E,f),o(E)})),b.addEventListener("submit",(function(n){var r,o;n.preventDefault(),y.textContent=q.value,v.textContent=C.value,B(n.target,"start"),(r=q.value,o=C.value,fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:r,about:o})}).then(t)).then((function(){c(g),console.log("Данные профиля успешно сохранены")})).catch((function(e){console.log(e)})).finally((function(){B(n.target,"end")})),n.target.reset()})),A.addEventListener("submit",(function(r){var o,a;r.preventDefault(),B(r.target,"start"),(o=w.value,a=U.value,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:o,link:a})}).then(t)).then((function(e){var t=n(e,e.owner._id,D);m.prepend(t),c(x),console.log("Карточка успешно добавлена")})).catch((function(e){console.log(e)})).finally((function(){B(r.target,"end")})),r.target.reset()})),k.addEventListener("submit",(function(n){var r;n.preventDefault(),B(n.target,"start"),(r=L.value,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:r})}).then(t)).then((function(e){_.style.backgroundImage="url(".concat(e.avatar,")"),c(E),console.log("Аватар успешно добавлен")})).catch((function(e){console.log(e)})).finally((function(){B(n.target,"end")})),n.target.reset()})),P(g),P(x),P(T),P(E)})();