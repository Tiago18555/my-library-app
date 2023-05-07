import { BookResponseDataModel } from "./book";
import { BorrowingResponseDataModel } from "./borrowing";

interface ProfessorResponseModel {
	httpstatus: string;
	data: ProfessorResponseDataModel[];
	token?: string;
}

interface ProfessorResponseModelSingle {
	httpstatus: string;
	data: ProfessorResponseDataModel;
	token?: string;
}

interface ProfessorResponseDataModel {
	id: string;
	name: string;
	cpf?: string;
	loan?: number;
	books?: BookResponseDataModel[];
	borrowings?: BorrowingResponseDataModel[];
}

interface Professor {
	name: string;
	cpf: string;
}

export {
	Professor,
	ProfessorResponseModel,
	ProfessorResponseDataModel,
	ProfessorResponseModelSingle
}
