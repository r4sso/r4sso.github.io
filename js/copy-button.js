function createCopyButton(highlightDiv) {
    const pre = highlightDiv.querySelector("pre");
  
    const button = document.createElement("button");
    button.className =
      "copy-code-button absolute top-0 right-0 p-2 text-slate-500 hover:text-gray-500";
    button.type = "button";
    button.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-5 w-5"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>';
    button.addEventListener("click", () => copyCodeToClipboard(button, pre));
  
    pre.style.position = "relative";
    pre.appendChild(button);
  }
  
  function copyCodeToClipboard(button, pre) {
    const code = pre.querySelector("code");
    const codeText = code.innerText;
  
    // Remove leading line numbers from code text
    const codeWithoutNumbers = codeText.replace(/^\d+\s/gm, "");
  
    const textarea = document.createElement("textarea");
    textarea.style.position = "fixed";
    textarea.style.top = "-9999px";
    textarea.setAttribute("readonly", "");
    textarea.value = codeWithoutNumbers;
    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);
    document.execCommand("copy");
    document.body.removeChild(textarea);
  
    button.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-5 w-5"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 6h2a1 1 0 011 1v10a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h2V4a2 2 0 012-2h4a2 2 0 012 2v1zm-7 0h6v1h-6V6zm6 2H6v8h6V8zm-4 2H8v4h4v-4z" /></svg>';
    setTimeout(() => {
      button.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-5 w-5"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>';
    }, 2000);
  }
  
  document.querySelectorAll(".highlight").forEach((highlightDiv) => {
    createCopyButton(highlightDiv);
  });
  