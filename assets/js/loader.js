// content.js
console.log("Loader.js");

// Create a loader div element
const loaderElement = document.createElement('div');
loaderElement.className = 'linkedin_helper_loader';
loaderElement.innerHTML = "<div class='linkedin_helper_lds_roller'><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>";
// loaderElement.textContent = 'Loading...';

// Add CSS styles for the loader
const loaderStyle = document.createElement('style');
loaderStyle.textContent = `
.linkedin_helper_loader {
    display:none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.7);
    text-align: center;
    line-height: 100vh;
    z-index: 9999;
}
.linkedin_helper_lds_roller {
    display:block;
    position: absolute;
    width: 80px;
    height: 80px;
    top:45%;
    left:45%;
}

.linkedin_helper_lds_roller div {
    animation: linkedin_helper_lds_roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    transform-origin: 40px 40px;
}

.linkedin_helper_lds_roller div:after {
    content: " ";
    display: block;
    position: absolute;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #0b66c2;
    margin: -4px 0 0 -4px;
}

.linkedin_helper_lds_roller div:nth-child(1) {
    animation-delay: -0.036s;
}

.linkedin_helper_lds_roller div:nth-child(1):after {
    top: 63px;
    left: 63px;
}

.linkedin_helper_lds_roller div:nth-child(2) {
    animation-delay: -0.072s;
}

.linkedin_helper_lds_roller div:nth-child(2):after {
    top: 68px;
    left: 56px;
}

.linkedin_helper_lds_roller div:nth-child(3) {
    animation-delay: -0.108s;
}

.linkedin_helper_lds_roller div:nth-child(3):after {
    top: 71px;
    left: 48px;
}

.linkedin_helper_lds_roller div:nth-child(4) {
    animation-delay: -0.144s;
}

.linkedin_helper_lds_roller div:nth-child(4):after {
    top: 72px;
    left: 40px;
}

.linkedin_helper_lds_roller div:nth-child(5) {
    animation-delay: -0.18s;
}

.linkedin_helper_lds_roller div:nth-child(5):after {
    top: 71px;
    left: 32px;
}

.linkedin_helper_lds_roller div:nth-child(6) {
    animation-delay: -0.216s;
}

.linkedin_helper_lds_roller div:nth-child(6):after {
    top: 68px;
    left: 24px;
}

.linkedin_helper_lds_roller div:nth-child(7) {
    animation-delay: -0.252s;
}

.linkedin_helper_lds_roller div:nth-child(7):after {
    top: 63px;
    left: 17px;
}

.linkedin_helper_lds_roller div:nth-child(8) {
    animation-delay: -0.288s;
}

.linkedin_helper_lds_roller div:nth-child(8):after {
    top: 56px;
    left: 12px;
}

@keyframes linkedin_helper_lds_roller {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
`;
// loaderStyle.textContent = `
//   .loader {
//     display: none;
    // position: fixed;
    // top: 0;
    // left: 0;
    // width: 100%;
    // height: 100%;
    // background-color: rgba(255, 255, 255, 0.7);
    // text-align: center;
    // line-height: 100vh;
    // z-index: 9999;
//   }
// `;

// Append the loader and styles to the document
document.body.appendChild(loaderStyle);
document.body.appendChild(loaderElement);
