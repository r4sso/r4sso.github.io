document.querySelectorAll('.copy-btn').forEach((button) => {
    button.addEventListener('click', () => {
        // Find the code element within the same parent container
        const container = button.parentElement;
        const codeElement = container.querySelector('pre code') || container.querySelector('code');
        
        if (!codeElement) return;

        const textToCopy = codeElement.innerText;

        navigator.clipboard.writeText(textToCopy).then(() => {
            // Visual feedback: Change text temporarily
            const originalText = button.innerText;
            button.innerText = 'Copied!';
            
            // Reset button text after 2 seconds
            setTimeout(() => {
                button.innerText = originalText;
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    });
});
