import List from "./List";
import '@fortawesome/fontawesome-free/css/all.min.css';
import OverLay from "./Overlay";

interface DOMList{
    ul: HTMLUListElement,
    render(fullList: List):void, 
}

export default class ListTemplate implements DOMList{
    static instance:ListTemplate= new ListTemplate
    ul:HTMLUListElement
    constructor(){
        this.ul= document.getElementById("list-items") as HTMLUListElement
    }

    render(fullList: List): void {
        this.ul.innerHTML= "";
        if (!fullList.searchedListItems.length) 
        {
            const p= document.createElement("p") as HTMLParagraphElement
            p.style.cssText= "text-align:center; margin:2rem; color:red; font-size:1.5rem"
            if(!fullList.listItems.length) {
                p.textContent= "The List Is Empty";
            }else{
                p.textContent= "The Item Not Found";
            }
            
            this.ul.append(p)
        } 
        else 
        {
            fullList.searchedListItems.forEach(item => {
                const li= document.createElement("li") as HTMLLIElement

                // ----------------create check box element----------------------
                const check= document.createElement("input") as HTMLInputElement
                check.type= "checkbox"
                check.id= item.id
                check.tabIndex= 0
                check.checked= item.checked
                li.append(check)

                check.addEventListener("change", ():void => {
                    item.checked = !item.checked
                    fullList.save()
                })
                
                // ----------------create label element----------------------
                const label= document.createElement("label") as HTMLLabelElement
                label.htmlFor= item.id
                label.textContent= item.item
                li.appendChild(label)

                // ----------------create div buttons----------------------
                const buttonsDiv= document.createElement('div') as HTMLDivElement;
                buttonsDiv.className= 'buttons-div';

                // -----------------create important button------------------
                const importantButton= document.createElement("button") as HTMLButtonElement
                importantButton.className= item.isImportant ? "important-button important" : "important-button";
                importantButton.innerHTML= '<i class="fa-solid fa-star"></i>'
                importantButton.ariaLabel= "Important Mark Button"

                importantButton.addEventListener("click", ():void => {
                    item.isImportant= !item.isImportant;
                    importantButton.classList.toggle('important');
                    fullList.save();
                })
                buttonsDiv.appendChild(importantButton)

                // -----------------create update button------------------
                const updateButton= document.createElement("button") as HTMLButtonElement
                updateButton.id= item.id;
                updateButton.className= "update-button"
                updateButton.innerHTML= '<i class="fa-solid fa-pen"></i>'
                updateButton.ariaLabel= "Update Button"

                updateButton.addEventListener('click', ():void => {
                    // -----------------Calling OverLay----------------
                    OverLay();
                    // -----------------Update Items-------------------
                    const updateInput= document.querySelector('.update-input') as HTMLInputElement;
                    updateInput.focus();
                    updateInput.value= item.item ;
                    
                    document.querySelector('.message')!.addEventListener('click', (e:Event) => {
                        const buttonTarget= e.target as HTMLButtonElement;
                    
                        if(buttonTarget.classList.contains('yes') && (updateInput.value!==item.item) && updateInput.value){
                            console.log("ahmed")
                            item.item= updateInput.value;
                            label.textContent= updateInput.value;
                            fullList.save();
                            document.querySelector('.overlay')?.remove();
                        }else if(buttonTarget.classList.contains('no') || (updateInput.value===item.item)){
                            document.querySelector('.overlay')?.remove();
                        }
                    })
                })
                buttonsDiv.appendChild(updateButton)

                // -----------------create delete button------------------
                const deleteButton= document.createElement("button") as HTMLButtonElement
                deleteButton.className= "delete-button"
                deleteButton.innerHTML= '<i class="fa-solid fa-trash"></i>'
                deleteButton.ariaLabel= "Delete Button"

                deleteButton.addEventListener("click", ():void => {
                    fullList.removeItem(item.id)
                    this.render(fullList)
                })
                buttonsDiv.appendChild(deleteButton)

                li.appendChild(buttonsDiv);

                this.ul.appendChild(li)
            })
        }
    }
}