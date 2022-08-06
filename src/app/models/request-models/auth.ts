interface AuthRequestModel {
	username: string;
	password: string;
}

interface ValidateRequestModel {
	token: string;
}

export {
	AuthRequestModel,
	ValidateRequestModel
};