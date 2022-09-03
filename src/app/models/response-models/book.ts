/**
 * @group Interfaces da resposta da API
 * @interface BookResponseModel
 * @interface BookResponseDataModel
 * @interface PublisherModel
 * @interface UnitResponseDataModel
 * @interface UnitResponseModel
 * @description Interface que representa a resposta da API para a listagem de livros
 */
interface BookResponseModel {
	httpstatus: string;
	data: BookResponseDataModel[];
	token?: string;
}

interface UnitResponseModel {
	httpstatus: string;
	data: UnitResponseDataModel[];
	token?: string;
}

interface BookResponseDataModelSingle {
	httpstatus: string;
	data: BookResponseDataModel;
	token?: string;
}

interface BookResponseDataModel {
	title: string;
	authorName: string,
	publisher: PublisherModel,
	description: string,
	availableAmount: number
}

interface UnitResponseDataModel {
	ibsn: number;
}

interface PublisherModel {
	publisherName: string;
	publisherCnpj: string;
}


/**
 * @interface BookModel
 * @description Modelo utilizado para exibição de dados na tabela de livros.
 */
interface BookModel {
	titulo: string;
	autor: string;
	editora: string;
	quantidade: number;
	descricao: string;
}

export { 
	BookResponseModel,
	BookResponseDataModel,
	BookModel,
	BookResponseDataModelSingle,
	UnitResponseModel,
	UnitResponseDataModel
};