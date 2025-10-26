// import './css/style.css'
import Item from './model/Item'
import List from './model/List'
import ListTemplate from './model/ListTemplate'
// import OverLay from './model/Overlay'

const init= () => {
    const lst= List.instance;
    const template= ListTemplate.instance;
    

    lst.load()
    template.render(lst)
// --------------------- Add Item -----------------------
    const entryAddItem= document.getElementById("add-entry-item") as HTMLInputElement
    let addBttn= document.querySelector('.add-item') as HTMLButtonElement;

    entryAddItem.addEventListener('input', () : void => {
        addBttn.disabled = !entryAddItem.value.trim(); 
    })

    const addEntryForm= document.getElementById("itemEntryForm") as HTMLFormElement
    addEntryForm.addEventListener("submit", (e: SubmitEvent):void => {
        e.preventDefault()
        
        const id= lst.listItems.length ? Number(lst.listItems[lst.listItems.length-1].id)+1 : 1;
        const newItem= new Item(id.toString(), entryAddItem.value.slice(0, 25))
        console.log(entryAddItem.value.slice(0, 25))
        entryAddItem.value= "";
        entryAddItem.focus();  
        addBttn.disabled = true; 
        lst.add(newItem)
        template.render(lst)
    })
// ----------------------Calling Overlay And Update Item-----------------------
    // document.addEventListener('click', (e:Event) :void => {
    //     const targetButton= e.target as HTMLButtonElement;
        
    //     const bttn: HTMLButtonElement | null = targetButton.closest(".update-button");
    //     if(!bttn) return;

    //     // ---------------------Call overlay------------------------------
    //     OverLay();
    //     // -----------------------Update Item------------------------------
    //     const updatedItem: Item|undefined = lst.listItems.find(item => item.id === bttn.id);

    //     const updateInput= document.querySelector('.update-input') as HTMLInputElement;
    //     updateInput.focus();
    //     if(updatedItem) updateInput.value= updatedItem.item ;

    //     document.querySelector('.message')!.addEventListener('click', (e:Event) => {
    //         const buttonTarget= e.target as HTMLButtonElement;
        
    //         if(buttonTarget.classList.contains('yes') && (updateInput.value!==updatedItem?.item && updateInput.value)){
    //             const itemObj:Item= new Item(bttn.id ,updateInput.value, false, false); 
    //             lst.update(itemObj);
    //             template.render(lst);
    //             document.querySelector('.overlay')?.remove();
    //         }else if(buttonTarget.classList.contains('no')  || (updateInput.value===updatedItem?.item)){
    //             document.querySelector('.overlay')?.remove();
    //         }
    //     })
    // })
// --------------------- Search Item -----------------------
    const entrySearchedItem= document.getElementById("search-item") as HTMLInputElement
    entrySearchedItem.addEventListener("input", (e:Event):void => {
        const entrySearchedItem= e.target as HTMLInputElement;
        
        lst.searchedItemsValue= entrySearchedItem.value;
       
        template.render(lst)
    })
// --------------------- Clear All Items -----------------------
    document.getElementById("clear")?.addEventListener("click", ():void => {
        lst.clear();
        template.render(lst)
    })
}


document.addEventListener("DOMContentLoaded", init)