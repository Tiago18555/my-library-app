interface AuthResponseModel {
	httpstatus: string;
	data: string;
	token: string;
}

interface ValidateResponseModel {
	httpstatus: string;
	data: string;
}

export { 
	ValidateResponseModel,
	AuthResponseModel
};