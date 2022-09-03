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

export {
	StudentResponseModel,
	StudentResponseDataModel
}