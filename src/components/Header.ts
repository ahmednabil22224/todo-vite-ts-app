function header() {
  function searchForm() {
    return `
                    <div class="search-form">
                        <h1>My Tasks</h1>
                        <input 
                            class="search" 
                            type="text" 
                            placeholder="Search Task"
                        />
                        <button 
                            id="mode" 
                            class= "mode" 
                            title= "Toggle Mode"
                            aria-label="Dark Light Mode"
                        >
                            <i class="fa-solid fa-moon"></i>
                        </button>
                    </div>
                `;
  }

  function addForm() {
    return `
                    <form onsubmit= "event.preventDefault()">
                        <input 
                            class="add-task" 
                            type="text" 
                            placeholder="Add New Task"
                        />
                        <button 
                            id="add" 
                            type="submit" 
                            title="Add TasK"
                            aria-label='Add New Task'
                        >
                            <i class="fa-sharp fa-regular fa-plus"></i>
                        </button>
                    </form>
                `;
  }

  function navbarButtons() {
    return `
                    <nav>
                        <button class='all-tasks choosed-bttn' title="All Tasks">
                            All Tasks
                        </button>
                        <button class='completed-tasks' title="Complete Tasks">
                            Completed
                        </button>
                        <button class='not-completed-tasks' title="Not Complete Tasks">
                            Not Completed
                        </button>
                        <button class='important-tasks' title="Important Tasks">
                            Important
                        </button>
                    </nav>
                `;
  }

  return `
                <header>
                    ${searchForm()}

                    ${addForm()}

                    ${navbarButtons()}
                </header>
            `;
}

export { header };
