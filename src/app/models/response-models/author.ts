interface AuthorResponseModel {
	httpstatus: string;
	data: AuthorResponseDataModel[];
	token?: string;
}

interface AuthorResponseDataModel {
	id: string;
	name: string;
}

export {
	AuthorResponseModel,
	AuthorResponseDataModel
}