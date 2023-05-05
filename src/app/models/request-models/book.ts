/**
 * @interface BookResponseModel
 * @description Interface que representa a requisição para a API de cadastro de livros
 */
interface BookPostModel {
	author: string,
	availableAmount?: number,
	description?: string,
	publisher: string,
	title: string
}

/**
 * @interface BookUpdateModel
 * @description Interface que representa a requisição para a API de atualização de livros
 */
interface BookUpdateModel {
	id: string,
	author?: string,
	availableAmount?: number,
	description?: string,
	publisher?: string,
	title?: string
}

export {
	BookPostModel,
	BookUpdateModel
};
