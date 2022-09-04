interface StudentResponseModel {
	httpstatus: string;
	data: StudentResponseDataModel[];
	token?: string;
}

interface StudentResponseDataModel {
	id: string;
	name: string;
	cnpj?: string;
}

interface Student {
	name: string;
	cpf: string;
}

export {
	Student,
	StudentResponseModel,
	StudentResponseDataModel
}