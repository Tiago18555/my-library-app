interface PublisherResponseModel {
	httpstatus: string;
	data: PublisherResponseDataModel[];
	token?: string;
}

interface PublisherResponseDataModel {
	id: string;
	name: string;
	cnpj?: string;
}

export {
	PublisherResponseModel,
	PublisherResponseDataModel
}