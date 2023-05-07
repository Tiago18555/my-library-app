/**
 * @interface ProfessorPostModel
 * @description Interface que representa a requisição para a API de cadastro de professores
 */

interface ProfessorPostModel {
  cpf: string,
	name: string
}

/**
 * @interface ProfessorUpdateModel
 * @description Interface que representa a requisição para a API de atualização de dados cadastrais de professores
 */

interface ProfessorUpdateModel {

}

export {
	ProfessorPostModel,
	ProfessorUpdateModel
};

