import { CrudField } from "./crud-field";

export interface CrudOptions {
    gridEditing: false;
    boardView: false;
    fields: CrudField[]
}
