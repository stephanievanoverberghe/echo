(function () {
    'use strict';

    const form = document.querySelector('.trace-form');
    if (!form) return;

    const messageField = form.querySelector('#trace-message');
    const submitButton = form.querySelector('.trace-form__submit');

    if (!messageField || !submitButton) return;

    const defaultButtonText = submitButton.textContent;
    const loadingButtonText = 'Envoi...';
    const successButtonText = 'Trace déposée';
    const errorId = 'trace-message-error';
    const statusId = 'trace-form-status';
    const resetSuccessDelay = 1600;

    let statusMessage = document.getElementById(statusId);
    let successTimeoutId = null;

    if (!statusMessage) {
        statusMessage = document.createElement('p');
        statusMessage.id = statusId;
        statusMessage.className = 'trace-form__status';
        statusMessage.setAttribute('role', 'status');
        statusMessage.setAttribute('aria-live', 'polite');
        form.appendChild(statusMessage);
    }

    const baseDescribedBy = messageField.getAttribute('aria-describedby') || '';

    function setButtonState(text, disabled) {
        submitButton.textContent = text;
        submitButton.disabled = disabled;
        submitButton.setAttribute('aria-disabled', disabled ? 'true' : 'false');
    }

    function clearError() {
        const errorMessage = document.getElementById(errorId);
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

    function resetAfterSuccess() {
        setButtonState(defaultButtonText, false);
    }

    function showError(message) {
        clearError();

        const errorMessage = document.createElement('p');
        errorMessage.id = errorId;
        errorMessage.className = 'trace-form__error';
        errorMessage.textContent = message;

        messageField.insertAdjacentElement('afterend', errorMessage);
        messageField.setAttribute('aria-invalid', 'true');

        const describedByTokens = [baseDescribedBy, errorId].filter(Boolean).join(' ');
        messageField.setAttribute('aria-describedby', describedByTokens);

        messageField.focus();
    }

    messageField.addEventListener('input', function () {
        if (messageField.value.trim()) {
            clearError();
        }
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const trimmedMessage = messageField.value.trim();

        if (!trimmedMessage) {
            statusMessage.textContent = '';
            showError('Le champ « Message » est obligatoire. Écris quelques mots avant de déposer ta trace.');
            return;
        }

        if (successTimeoutId) {
            window.clearTimeout(successTimeoutId);
            successTimeoutId = null;
        }

        clearError();
        setButtonState(loadingButtonText, true);

        window.setTimeout(function () {
            form.reset();
            statusMessage.textContent = 'Merci. Ta trace a bien été déposée dans le silence.';
            setButtonState(successButtonText, true);

            successTimeoutId = window.setTimeout(function () {
                resetAfterSuccess();
                successTimeoutId = null;
            }, resetSuccessDelay);
        }, 400);
    });
})();