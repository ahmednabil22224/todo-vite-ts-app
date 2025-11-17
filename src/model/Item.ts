interface ItemType {
  id: string;
  item: string;
  checked: boolean;
  isImportant: boolean; 
  date: string;
}

export default class Item implements ItemType {
  constructor(
    private _id: string = "",
    private _item: string = "",
    private _checked: boolean = false,
    private _isImportant = false,
    private _date: string = new Date().toLocaleString()
  ) {}

  get id(): string {
    return this._id;
  }
  set id(id: string) {
    this._id = id;
  }

  get item(): string {
    return this._item;
  }
  set item(item: string) {
    this._item = item;
  }

  get checked(): boolean {
    return this._checked;
  }
  set checked(checked: boolean) {
    this._checked = checked;
  }

  get isImportant(): boolean {
    return this._isImportant;
  }
  set isImportant(isImportant: boolean) {
    this._isImportant = isImportant;
  }

  get date(): string {
    return this._date;
  }
  set date(date: string) {
    this._date = date;
  }
}
