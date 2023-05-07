/**
 * @interface ConfigRequest
 * @description Interface que representa a requisição para obtenção da configuração atual
 */
interface ConfigPostModel {
	assessment?: number,
	borrowingLimit?: number,
	tolerance?: number
}

export {
	ConfigPostModel
};
