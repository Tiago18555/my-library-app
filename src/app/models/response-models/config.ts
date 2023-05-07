/**
 * @interface ConfigResponse
 * @description Interface que representa a resposta para obtenção da configuração atual
 */

interface ConfigResponseModel {
	httpstatus: string;
	data: ConfigResponseDataModel;
	token?: string;
}

interface ConfigResponseModelHistory {
	httpstatus: string;
	data: ConfigResponseDataModel[];
	token?: string;
}

interface ConfigResponseDataModel {
  startedAt: string,
	assessment?: number,
	borrowingLimit?: number,
	tolerance?: number
}

export {
	ConfigResponseModel,
  ConfigResponseModelHistory
};
