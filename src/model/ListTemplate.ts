import List from "./List";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { overLay, showToast } from "../components/Overlay";
import { renderFooter } from "../components/Footer";

interface DOMList {
  ul: HTMLUListElement;
  render(fullList: List): void;
}

export default class ListTemplate implements DOMList {
  static instance: ListTemplate = new ListTemplate();
  ul: HTMLUListElement;
  constructor() {
    this.ul = document.getElementById("list-items") as HTMLUListElement;
  }

  render(fullList: List): void {
    this.ul.innerHTML = "";
    this.ul.className = "tasks-container";
    if (!fullList.listItems.length) {
      const p = document.createElement("p") as HTMLParagraphElement;
      p.style.cssText =
        "text-align:center; margin:2rem; color:red; font-size:1.5rem";
      if (!fullList.listItems.length) {
        p.textContent = "The List Is Empty";
      } else {
        p.textContent = "The Item Not Found";
      }

      this.ul.append(p);
    } else {
      fullList.searchedListItems.forEach((item) => {
        const li = document.createElement("li") as HTMLLIElement;
        li.className = `task ${item.checked ? "done-task" : ""} ${
          item.isImportant ? "important-task" : ""
        }`;
        li.id = item.id;

        // ------------------Create Div Info-----------------------------
        const infoDiv = document.createElement("div") as HTMLDivElement;
        infoDiv.className = "info";

        // ----------------create check box element----------------------
        const check = document.createElement("input") as HTMLInputElement;
        check.type = "checkbox";
        check.id = item.id;
        check.tabIndex = 0;
        check.checked = item.checked;

        check.addEventListener("change", (): void => {
          const targetTask = document
            .getElementById(item.id)
            ?.closest(".task") as HTMLLIElement;
          targetTask?.classList.toggle("done-task");

          item.checked = !item.checked;
          fullList.save();
          renderFooter();
        });

        // ----------------create label element----------------------
        const label = document.createElement("label") as HTMLLabelElement;
        label.htmlFor = item.id;
        label.textContent = item.item;

        // ------------------Create P date----------------------------
        const dateP = document.createElement("p") as HTMLParagraphElement;
        dateP.className = "date";
        dateP.textContent = item.date;

        infoDiv.append(check);
        infoDiv.append(label);
        infoDiv.append(dateP);
        li.appendChild(infoDiv);

        // ----------------create div buttons----------------------
        const buttonsDiv = document.createElement("div") as HTMLDivElement;
        buttonsDiv.className = "control";

        // -----------------create important button------------------
        const importantButton = document.createElement(
          "button"
        ) as HTMLButtonElement;
        importantButton.className = item.isImportant
          ? "important-bttn important"
          : "important-bttn";
        importantButton.innerHTML = '<i class="fa-solid fa-star"></i>';
        importantButton.ariaLabel = "Important Mark Button";
        importantButton.addEventListener("click", (): void => {
          importantButton.classList.toggle("important");
          const targetTask = importantButton?.closest(".task") as HTMLButtonElement;
          targetTask?.classList.toggle("important-task");
          item.isImportant = !item.isImportant;
          fullList.save();
          renderFooter();
        });
        buttonsDiv.appendChild(importantButton);

        // -----------------create update button------------------
        const updateButton = document.createElement(
          "button"
        ) as HTMLButtonElement;
        updateButton.id = item.id;
        updateButton.className = "update-bttn";
        updateButton.innerHTML = '<i class="fa-solid fa-pen"></i>';
        updateButton.ariaLabel = "Update Button";

        updateButton.addEventListener("click", (): void => {
          // -----------------Calling OverLay----------------
          overLay(item.item, "update");

          // -----------------Update Items-------------------
          const updateInput = document.querySelector(
            ".update-input"
          ) as HTMLInputElement;
          updateInput.focus();
          updateInput.value = item.item;

          document
            .querySelectorAll(".over-lay-message button")!
            .forEach((bttn) =>
              bttn.addEventListener("click", (e: Event) => {
                const buttonTarget = e.target as HTMLButtonElement;

                if (!updateInput.value) return;
                if (buttonTarget.classList.contains("yes")) {
                  item.item = updateInput.value;
                  item.date = new Date().toLocaleString();
                  dateP.textContent = new Date().toLocaleString();
                  label.textContent = updateInput.value;
                  fullList.save();
                }
                document.querySelector(".over-lay-box")?.remove();
              })
            );
        });
        buttonsDiv.appendChild(updateButton);

        // -----------------create delete button------------------
        const deleteButton = document.createElement(
          "button"
        ) as HTMLButtonElement;
        deleteButton.className = "delete-bttn";
        deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
        deleteButton.ariaLabel = "Delete Button";

        deleteButton.addEventListener("click", (): void => {
          // -----------------Calling OverLay----------------
          overLay(item.item, "delete");

          document
            .querySelectorAll(".over-lay-message button")!
            .forEach((bttn) =>
              bttn.addEventListener("click", (e: Event) => {
                const buttonTarget = e.target as HTMLButtonElement;

                if (buttonTarget.classList.contains("yes")) {
                  fullList.removeItem(item.id);
                  this.render(fullList);
                  fullList.save();
                  renderFooter();
                }
                document.querySelector(".over-lay-box")?.remove();
              })
            );
        });

        buttonsDiv.appendChild(deleteButton);

        li.appendChild(buttonsDiv);

        this.ul.appendChild(li);
      });
    }
  }
}
