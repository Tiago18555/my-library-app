interface BorrowingResponseModel {
	httpstatus: string;
	data: BorrowingResponseDataModel[];
	token?: string;
}

interface BorrowingResponseDataModel {
	id: string;
	startsAt: string;
	endsAt?: string;
	deadLine: string;
	unit: UnitModel;
	client: ClientModel;
	configuration: ConfigurationModel;
}

interface ConfigurationModel {
	startedAt: string;
	tolerance: number;
	assessment: number;
}

interface ClientModel {
	id: string;
	name: string;
	loan: number;
}

interface UnitModel {
	ibsn: number;
	book: BookModel;
}

interface BookModel {
	id: string;
	title: string;
}

interface NextWeekBorrowingsDisplayModel {
	name: string;
	book: string;
	deadline: string;
}

export {
	BorrowingResponseModel,
	BorrowingResponseDataModel,
	NextWeekBorrowingsDisplayModel
}