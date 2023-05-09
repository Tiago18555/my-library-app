/**
 * @interface StudentPostModel
 * @description Interface que representa a requisição para a API de cadastro de alunos
 */

interface StudentPostModel {
  cpf: string,
	name: string
}

/**
 * @interface StudentUpdateModel
 * @description Interface que representa a requisição para a API de atualização de dados cadastrais de alunos
 */

interface StudentUpdateModel {
  cpf: string,
  name: string
}

export {
	StudentPostModel,
	StudentUpdateModel
};

