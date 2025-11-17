// ------------------Create overLay--------------------
const overLay = (title: string, method: string) => {
  
  const overLayBox = document.createElement("div") as HTMLDivElement;
  overLayBox.classList.add("over-lay-box");

  const message = document.createElement("div") as HTMLDivElement;
  message.classList.add("over-lay-message");

  const h3 = document.createElement("h3") as HTMLHeadElement;
  h3.innerHTML = `Are you sure to ${
    method === "update" ? "update" : "delete"
  } <span class="title-span"}>${title}</span>?`;

  const updateInput = document.createElement("input") as HTMLInputElement;
  updateInput.classList.add("update-input");
  updateInput.value = title;

  const confirmDiv = document.createElement("div") as HTMLDivElement;
  confirmDiv.innerHTML = `<button class="yes ${method}">Yes</button><button class="no">No</button>`;

  message.appendChild(h3);
  if (method === "update") message.appendChild(updateInput);
  message.appendChild(confirmDiv);

  overLayBox.appendChild(message);

  document.getElementById("app")?.appendChild(overLayBox);
};

// ------------------Small Toast Message---------------------
function showToast(message: string, type: string = "info") {
  const toast = document.getElementById("toast") as HTMLDivElement;

  toast.textContent = message;
  toast.className = "toast";
  toast.classList.add(type);
  toast.classList.add("show");
  toast.role = "alert";

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

export { overLay, showToast };
