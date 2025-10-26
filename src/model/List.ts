import Item from "./Item"

interface ListType{
    listItems: Item[];
    searchedListItems: Item[];
    searchedItemsValue: string;
    load():void;
    save():void;
    add(itemObg:Item):void;
    update(itemObj: Item):void;
    removeItem(id:string):void;
    clear():void;
}

export default class List implements ListType{
    static instance:List = new List;
    private _searchedItemsValue: string

    private constructor(private _list:Item[]= []){
        this._searchedItemsValue= "";
    }

    get listItems(): Item[]{
        return this._list
    }

    get searchedListItems(): Item[]{
        return this.listItems.filter(item => {
                    return item.item.toLowerCase().includes(this._searchedItemsValue.toLowerCase());
                })
    }

    get searchedItemsValue() : string{
        return this._searchedItemsValue;
    }
    set searchedItemsValue(item: string){
        this._searchedItemsValue= item;
    }
    
    load(): void {
        const storedList: string | null= localStorage.getItem("myList");
        if(typeof storedList !== "string") return 

        const parsedList: {_id:string, _item:string, _checked:boolean, _isImportant:boolean}[]= JSON.parse(storedList)
        parsedList.forEach(item => {
            const newItem: Item= new Item(item._id, item._item, item._checked, item._isImportant)
            this.add(newItem)
        });
    }

    save(): void {
        localStorage.setItem("myList", JSON.stringify(this._list))
    }

    add(itemObg: Item): void {
        this._list.push(itemObg)
        this.save()
    }

    update(itemObj: Item): void {
        this._list= this._list.map(item => {
            return item.id === itemObj.id ?  itemObj : item;
        })
        this.save();
    }

    removeItem(id: string): void {
        this._list= this._list.filter(item => item.id !== id)
        this.save()
    }

    clear(): void {
        this._list= []
        this.save();
    }
}