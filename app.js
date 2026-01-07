const state = {
  language: "en",
  logo: "",
  socials: [],
};

const elements = {
  name: document.getElementById("nameInput"),
  title: document.getElementById("titleInput"),
  company: document.getElementById("companyInput"),
  email: document.getElementById("emailInput"),
  phone: document.getElementById("phoneInput"),
  website: document.getElementById("websiteInput"),
  address: document.getElementById("addressInput"),
  nameSize: document.getElementById("nameSize"),
  titleSize: document.getElementById("titleSize"),
  contactSize: document.getElementById("contactSize"),
  socialSize: document.getElementById("socialSize"),
  socialIconSize: document.getElementById("socialIconSize"),
  logoUpload: document.getElementById("logoUpload"),
  socialList: document.getElementById("socialList"),
  addSocial: document.getElementById("addSocial"),
  copyHtml: document.getElementById("copyHtml"),
  reset: document.getElementById("reset"),
  signaturePreview: document.getElementById("signaturePreview"),
  tabs: document.querySelectorAll(".tab"),
  directionBadge: document.getElementById("directionBadge"),
};

const placeholders = {
  en: {
    name: "Sarah Malik",
    title: "Product Designer",
    company: "Signiture Studio",
    email: "sarah@signiture.io",
    phone: "+98 21 0000 0000",
    website: "www.signiture.io",
    address: "Tehran, Iran",
  },
  fa: {
    name: "سارا ملک",
    title: "طراح محصول",
    company: "استودیو سیگنچر",
    email: "sara@signiture.io",
    phone: "+98 21 ۰۰۰۰ ۰۰۰۰",
    website: "www.signiture.io",
    address: "تهران، ایران",
  },
};

function fileToDataUrl(file, callback) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => callback(reader.result);
  reader.readAsDataURL(file);
}

function fileToCanvasDataUrl(file, width, height, callback) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, width, height);
      const scale = Math.min(width / image.width, height / image.height);
      const drawWidth = image.width * scale;
      const drawHeight = image.height * scale;
      const offsetX = (width - drawWidth) / 2;
      const offsetY = (height - drawHeight) / 2;
      ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
      callback(canvas.toDataURL("image/png"));
    };
    image.src = reader.result;
  };
  reader.readAsDataURL(file);
}

function renderSignature() {
  const data = {
    name: elements.name.value || placeholders[state.language].name,
    title: elements.title.value || placeholders[state.language].title,
    company: elements.company.value || placeholders[state.language].company,
    email: elements.email.value || placeholders[state.language].email,
    phone: elements.phone.value || placeholders[state.language].phone,
    website: elements.website.value || placeholders[state.language].website,
    address: elements.address.value || placeholders[state.language].address,
  };

  const fontSizes = {
    name: elements.nameSize.value || 18,
    title: elements.titleSize.value || 14,
    contact: elements.contactSize.value || 13,
    social: elements.socialSize.value || 12,
    socialIcon: elements.socialIconSize.value || 18,
  };

  const socialsHtml = state.socials
    .filter((item) => item.icon && item.link)
    .map(
      (item) => `
        <a href="${item.link}" target="_blank" rel="noopener">
          <img src="${item.icon}" alt="social icon" />
        </a>
      `
    )
    .join("");

  const signatureHtml = `
    <div class="signature ${state.language === "fa" ? "rtl" : ""}">
      <img class="logo" src="${state.logo || "https://dummyimage.com/285x70/e2e8f0/64748b&text=Logo"}" alt="Logo" />
      <div class="details" style="--name-size:${fontSizes.name}px; --title-size:${fontSizes.title}px; --contact-size:${fontSizes.contact}px; --social-size:${fontSizes.social}px; --social-icon-size:${fontSizes.socialIcon}px;">
        <div class="name">${data.name}</div>
        <div class="title">${data.title} • ${data.company}</div>
        <div class="meta frame">
          <div class="meta-row">
            <span class="icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M4 6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6zm2 0v12h3V6H6zM14 7a2 2 0 0 1 2-2h2.5A1.5 1.5 0 0 1 20 6.5v11a1.5 1.5 0 0 1-1.5 1.5H16a2 2 0 0 1-2-2V7zm2 0v10h2V7h-2z"/>
              </svg>
            </span>
            <span>${data.phone}</span>
          </div>
          <div class="meta-row">
            <span class="icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M6.6 2.5a2 2 0 0 1 2.9.4l2.2 3a2 2 0 0 1-.3 2.7l-1.5 1.2a12.5 12.5 0 0 0 5.3 5.3l1.2-1.5a2 2 0 0 1 2.7-.3l3 2.2a2 2 0 0 1 .4 2.9l-1.3 1.7a3 3 0 0 1-3.2 1.1c-3.2-.8-6.7-2.8-9.7-5.8-3-3-5-6.5-5.8-9.7a3 3 0 0 1 1.1-3.2l1.7-1.3z"/>
              </svg>
            </span>
            <span>${data.email}</span>
          </div>
          <div class="meta-row">
            <span class="icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm7.9 9h-3.3a14.7 14.7 0 0 0-2.1-6 8 8 0 0 1 5.4 6zM12 4.1c1.2 1.6 2.2 3.8 2.6 6.9H9.4c.4-3.1 1.4-5.3 2.6-6.9zM4.7 11H4.1a8 8 0 0 1 5.4-6 14.7 14.7 0 0 0-2.1 6zm0 2a14.7 14.7 0 0 0 2.1 6 8 8 0 0 1-2.7-2.1A8 8 0 0 1 4.1 13h.6zm4.7 6.9a14.6 14.6 0 0 1-2.6-6.9h5.2c-.4 3.1-1.4 5.3-2.6 6.9zm1.9 0c1.2-1.6 2.2-3.8 2.6-6.9h5.2a14.6 14.6 0 0 1-2.6 6.9 8 8 0 0 1-5.2 0zM16.5 13h3.3a8 8 0 0 1-5.4 6 14.7 14.7 0 0 0 2.1-6z"/>
              </svg>
            </span>
            <span>${data.website}</span>
          </div>
          <div class="meta-row">
            <span class="icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M12 2a7 7 0 0 1 7 7c0 4.2-4.4 9.4-6.2 11.4a1 1 0 0 1-1.6 0C9.4 18.4 5 13.2 5 9a7 7 0 0 1 7-7zm0 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/>
              </svg>
            </span>
            <span>${data.address}</span>
          </div>
        </div>
        <div class="socials">${socialsHtml}</div>
      </div>
    </div>
  `;

  elements.signaturePreview.innerHTML = signatureHtml;
  elements.signaturePreview.dataset.signature = signatureHtml.trim();
}

function addSocialRow() {
  const template = document.getElementById("socialTemplate");
  const node = template.content.cloneNode(true);
  const row = node.querySelector(".social-row");
  const iconInput = row.querySelector(".social-icon");
  const linkInput = row.querySelector(".social-link");
  const removeButton = row.querySelector(".remove");

  const entry = { icon: "", link: "" };
  state.socials.push(entry);

  iconInput.addEventListener("change", (event) => {
    fileToDataUrl(event.target.files[0], (dataUrl) => {
      entry.icon = dataUrl;
      renderSignature();
    });
  });

  linkInput.addEventListener("input", (event) => {
    entry.link = event.target.value;
    renderSignature();
  });

  removeButton.addEventListener("click", () => {
    const index = state.socials.indexOf(entry);
    if (index > -1) {
      state.socials.splice(index, 1);
    }
    row.remove();
    renderSignature();
  });

  elements.socialList.appendChild(node);
}

function setLanguage(language) {
  state.language = language;
  elements.tabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.language === language);
  });
  const isRtl = language === "fa";
  elements.directionBadge.textContent = isRtl ? "RTL" : "LTR";
  elements.signaturePreview.style.direction = isRtl ? "rtl" : "ltr";
  renderSignature();
}

function resetForm() {
  elements.name.value = "";
  elements.title.value = "";
  elements.company.value = "";
  elements.email.value = "";
  elements.phone.value = "";
  elements.website.value = "";
  elements.address.value = "";
  elements.nameSize.value = 18;
  elements.titleSize.value = 14;
  elements.contactSize.value = 13;
  elements.socialSize.value = 12;
  elements.socialIconSize.value = 18;
  elements.logoUpload.value = "";
  state.logo = "";
  state.socials = [];
  elements.socialList.innerHTML = "";
  addSocialRow();
  renderSignature();
}

function copySignature() {
  const signature = elements.signaturePreview.dataset.signature;
  if (!signature) return;
  navigator.clipboard.writeText(signature).then(() => {
    elements.copyHtml.textContent = "Copied!";
    setTimeout(() => {
      elements.copyHtml.textContent = "Copy HTML signature";
    }, 1500);
  });
}

["input", "change"].forEach((eventName) => {
  elements.name.addEventListener(eventName, renderSignature);
  elements.title.addEventListener(eventName, renderSignature);
  elements.company.addEventListener(eventName, renderSignature);
  elements.email.addEventListener(eventName, renderSignature);
  elements.phone.addEventListener(eventName, renderSignature);
  elements.website.addEventListener(eventName, renderSignature);
  elements.address.addEventListener(eventName, renderSignature);
  elements.nameSize.addEventListener(eventName, renderSignature);
  elements.titleSize.addEventListener(eventName, renderSignature);
  elements.contactSize.addEventListener(eventName, renderSignature);
  elements.socialSize.addEventListener(eventName, renderSignature);
  elements.socialIconSize.addEventListener(eventName, renderSignature);
});

if (elements.logoUpload) {
  elements.logoUpload.addEventListener("change", (event) => {
    fileToCanvasDataUrl(event.target.files[0], 285, 70, (dataUrl) => {
      state.logo = dataUrl;
      renderSignature();
    });
  });
}

elements.addSocial.addEventListener("click", addSocialRow);

elements.copyHtml.addEventListener("click", copySignature);

elements.reset.addEventListener("click", resetForm);

elements.tabs.forEach((tab) =>
  tab.addEventListener("click", () => setLanguage(tab.dataset.language))
);

addSocialRow();
setLanguage("en");
renderSignature();
