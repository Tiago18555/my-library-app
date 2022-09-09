import { BookResponseDataModel } from "./book";
import { BorrowingResponseDataModel } from "./borrowing";

interface StudentResponseModel {
	httpstatus: string;
	data: StudentResponseDataModel[];
	token?: string;
}

interface StudentResponseModelSingle {
	httpstatus: string;
	data: StudentResponseDataModel;
	token?: string;
}

interface StudentResponseDataModel {
	id: string;
	name: string;
	cpf?: string;
	loan?: number;
	books?: BookResponseDataModel[];
	borrowings?: BorrowingResponseDataModel[];
}

interface Student {
	name: string;
	cpf: string;
}

export {
	Student,
	StudentResponseModel,
	StudentResponseDataModel,
	StudentResponseModelSingle
}