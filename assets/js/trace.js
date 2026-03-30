(function () {
    'use strict';

    var form = document.querySelector('.trace-form');
    if (!form) {
        return;
    }

    var messageField = form.querySelector('#trace-message');
    var submitButton = form.querySelector('.trace-form__submit');

    if (!messageField || !submitButton) {
        return;
    }

    var defaultButtonText = submitButton.textContent;
    var loadingButtonText = 'Envoi...';
    var successButtonText = 'Trace déposée';
    var errorId = 'trace-message-error';
    var statusId = 'trace-form-status';

    var statusMessage = document.getElementById(statusId);

    if (!statusMessage) {
        statusMessage = document.createElement('p');
        statusMessage.id = statusId;
        statusMessage.className = 'trace-form__status';
        statusMessage.setAttribute('role', 'status');
        statusMessage.setAttribute('aria-live', 'polite');
        form.appendChild(statusMessage);
    }

    var baseDescribedBy = messageField.getAttribute('aria-describedby') || '';

    function setButtonState(text, disabled) {
        submitButton.textContent = text;
        submitButton.disabled = disabled;
        submitButton.setAttribute('aria-disabled', disabled ? 'true' : 'false');
    }

    function clearError() {
        var errorMessage = document.getElementById(errorId);
        if (errorMessage) {
            errorMessage.remove();
        }

        messageField.removeAttribute('aria-invalid');
        if (baseDescribedBy) {
            messageField.setAttribute('aria-describedby', baseDescribedBy);
        } else {
            messageField.removeAttribute('aria-describedby');
        }
    }

    function showError(message) {
        clearError();

        var errorMessage = document.createElement('p');
        errorMessage.id = errorId;
        errorMessage.className = 'trace-form__error';
        errorMessage.textContent = message;

        messageField.insertAdjacentElement('afterend', errorMessage);
        messageField.setAttribute('aria-invalid', 'true');

        var describedByTokens = [baseDescribedBy, errorId].filter(Boolean).join(' ');
        messageField.setAttribute('aria-describedby', describedByTokens);
        messageField.focus();
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var trimmedMessage = messageField.value.trim();

        if (!trimmedMessage) {
            setButtonState(defaultButtonText, false);
            statusMessage.textContent = '';
            showError('Le champ « Message » est obligatoire. Écris quelques mots avant de déposer ta trace.');
            return;
        }

        clearError();
        setButtonState(loadingButtonText, true);

        window.setTimeout(function () {
            form.reset();
            statusMessage.textContent = 'Merci. Ta trace a bien été déposée dans le silence.';
            setButtonState(successButtonText, true);
        }, 400);
    });
})();