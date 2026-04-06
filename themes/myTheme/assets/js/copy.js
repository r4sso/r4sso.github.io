document.querySelectorAll('.copy-btn').forEach((button) => {
    button.addEventListener('click', () => {
        const container = button.parentElement;
        const codeElement = container.querySelector('pre code') || container.querySelector('code');
        if (!codeElement) return;

        const textToCopy = codeElement.innerText;

        // Try the modern API first
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(textToCopy)
                .then(() => showSuccess(button))
                .catch(err => fallbackCopy(textToCopy, button));
        } else {
            // Use fallback if Clipboard API is unavailable
            fallbackCopy(textToCopy, button);
        }
    });
});

function fallbackCopy(text, button) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Ensure the textarea isn't visible but is part of the DOM
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "0";
    document.body.appendChild(textArea);
    
    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand('copy');
        if (successful) showSuccess(button);
    } catch (err) {
        console.error('Fallback copy failed', err);
    }

    document.body.removeChild(textArea);
}

function showSuccess(button) {
    const originalText = button.innerText;
    button.innerText = 'Copied!';
    setTimeout(() => {
        button.innerText = originalText;
    }, 2000);
}
