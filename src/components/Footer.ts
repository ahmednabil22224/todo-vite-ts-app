const renderFooter = () => {
  const storedTasks: string | null = localStorage.getItem("myList");
  if (typeof storedTasks !== "string") return;
  interface parsedType {
    _id: string;
    _item: string;
    _checked: boolean;
    _isImportant: boolean;
    _date: string;
  }
  const allTasks: parsedType[] = JSON.parse(storedTasks);
  const completedTasks: parsedType[] = allTasks.filter((task) => task._checked);
  const notCompletedTasks: parsedType[] = allTasks.filter(
    (task) => !task._checked
  );
  const importantTasks: parsedType[] = allTasks.filter(
    (task) => task._isImportant
  );

  let allTasksSpan = document.querySelectorAll(
    ".all-tasks-count"
  ) as NodeListOf<Element>;
  allTasksSpan.forEach((spn) => (spn.textContent = allTasks.length.toString()));

  let allCompletedTasksSpan = document.querySelectorAll(
    ".complete-tasks-count"
  ) as NodeListOf<Element>;
  allCompletedTasksSpan.forEach(
    (spn) => (spn.textContent = completedTasks.length.toString())
  );

  let allNotCompletedTasksSpan = document.querySelector(
    ".notcomplete-tasks-count"
  ) as HTMLSpanElement;
  allNotCompletedTasksSpan.textContent = notCompletedTasks.length.toString();

  let importantTasksSpan = document.querySelector(
    ".important-tasks-count"
  ) as HTMLSpanElement;
  importantTasksSpan.textContent = importantTasks.length.toString();

  const progressBarWidth = completedTasks.length / allTasks.length || 0;
  const progressBar = document.querySelector(
    ".progress .bar"
  ) as HTMLDivElement;
  progressBar.style.setProperty("width", `${progressBarWidth * 100}%`);
};

export { renderFooter };
