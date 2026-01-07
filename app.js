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

  const socialsHtml = state.socials
    .filter((item) => item.icon && item.link)
    .map(
      (item) => `
        <a href="${item.link}" target="_blank" rel="noopener">
          <img src="${item.icon}" alt="${item.label || "social"}" />
          <span>${item.label || "Social"}</span>
        </a>
      `
    )
    .join("");

  const signatureHtml = `
    <div class="signature ${state.language === "fa" ? "rtl" : ""}">
      <img class="logo" src="${state.logo || "https://dummyimage.com/320x120/e2e8f0/64748b&text=Logo"}" alt="Logo" />
      <div class="details">
        <div class="name">${data.name}</div>
        <div class="title">${data.title} • ${data.company}</div>
        <div class="meta">
          <span>${data.email}</span>
          <span>${data.phone}</span>
          <span>${data.website}</span>
          <span>${data.address}</span>
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
  const labelInput = row.querySelector(".social-label");
  const linkInput = row.querySelector(".social-link");
  const removeButton = row.querySelector(".remove");

  const entry = { icon: "", label: "", link: "" };
  state.socials.push(entry);

  iconInput.addEventListener("change", (event) => {
    fileToDataUrl(event.target.files[0], (dataUrl) => {
      entry.icon = dataUrl;
      renderSignature();
    });
  });

  labelInput.addEventListener("input", (event) => {
    entry.label = event.target.value;
    renderSignature();
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
});

if (elements.logoUpload) {
  elements.logoUpload.addEventListener("change", (event) => {
    fileToDataUrl(event.target.files[0], (dataUrl) => {
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
