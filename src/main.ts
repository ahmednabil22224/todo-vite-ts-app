import Item from "./model/Item";
import List from "./model/List";
import ListTemplate from "./model/ListTemplate";
import { renderFooter } from "./components/Footer";
import { overLay, showToast } from "./components/Overlay";

const init = () => {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (!localStorage.getItem("mode")) {
    localStorage.setItem("mode", prefersDark ? "dark" : "light");
  }
  document.body.classList.add(localStorage.getItem("mode") ?? "");

  const lst = List.instance;
  const template = ListTemplate.instance;

  lst.load();
  template.render(lst);

  // --------------------- Add Item -----------------------
  const entryAddTask = document.getElementById(
    "add-entry-task"
  ) as HTMLInputElement;
  let addTask = document.querySelector(".add-task") as HTMLButtonElement;

  entryAddTask.addEventListener("input", (): void => {
    addTask.disabled = !entryAddTask.value.trim();
  });

  const addEntryForm = document.getElementById(
    "taskEntryForm"
  ) as HTMLFormElement;
  addEntryForm.addEventListener("submit", (e: SubmitEvent): void => {
    e.preventDefault();

    const id = lst.listItems.length
      ? Number(lst.listItems[lst.listItems.length - 1].id) + 1
      : 1;
    let taskTitle: string = entryAddTask.value;
    const newItem = new Item(id.toString(), taskTitle.slice(0, 25));
    entryAddTask.value = "";
    entryAddTask.focus();
    addTask.disabled = true;
    lst.add(newItem);
    template.render(lst);
    showToast(`Task ${taskTitle} added successfully ✅`, "success");
  });

  // --------------------- Search Item -----------------------
  const entrySearchedTasks = document.getElementById(
    "search-tasks"
  ) as HTMLInputElement;
  entrySearchedTasks.addEventListener("input", (e: Event): void => {
    const searchedValue = e.target as HTMLInputElement;

    lst.searchedItemsValue = searchedValue.value;

    template.render(lst);
  });

  // --------------------- Clear All Items -----------------------
  document.querySelector(".clear-lst")?.addEventListener("click", (): void => {
    // -----------------Calling OverLay----------------
    overLay("All Tasks", "delete");

    document.querySelectorAll(".over-lay-message button")!.forEach((bttn) =>
      bttn.addEventListener("click", (e: Event) => {
        const buttonTarget = e.target as HTMLButtonElement;

        if (buttonTarget.classList.contains("yes")) {
          lst.clear();
          template.render(lst);
          renderFooter();
          showToast(
            `The list is cleared successfully ❌`,
            "error"
          );
        }
        document.querySelector(".over-lay-box")?.remove();
      })
    );
  });

  // -----------------------Render Footer--------------------------
  renderFooter();

  //----------------------Convert Light Mode Listener---------------------
  document.querySelector(".mode")?.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (localStorage.getItem("mode") === "light") {
      localStorage.setItem("mode", "dark");
    } else {
      localStorage.setItem("mode", "light");
    }
  });
};

document.addEventListener("DOMContentLoaded", init);
