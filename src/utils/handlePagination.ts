import { Model, Document } from "mongoose";

type ResultDetail = {
    pageNumber: number;
    limit: number;
};

type Result = {
    animeCount: number;
    previous: ResultDetail | null;
    next: ResultDetail | null;
    data: {};
    rowsPerPage: number;
};

export async function handlePagination(
    collection: Model<{[x: string]: unknown;}>, 
    page: number, 
    pageLimit: number, 
    filter?: Array<string> | []
): Promise<Result | undefined> {

    console.log("this is the filter", filter)
    const resultData: Result = {
        animeCount: 0,
        previous: null,
        next: null,
        data: [],
        rowsPerPage: pageLimit
    };

    try {
        let query = {};
        if (filter?.length !== 0) {
            query = { genre: { $in: Array.isArray(filter) ? filter : [filter] } };
        }

        const animeCount = await collection.countDocuments(query).exec();
        resultData.animeCount = animeCount;

        const startIndex = page * pageLimit;
        const endIndex = (page + 1) * pageLimit;

        if (startIndex > 0) {
            resultData.previous = {
                pageNumber: page - 1,
                limit: pageLimit
            };
        }

        if (endIndex < animeCount) {
            resultData.next = {
                pageNumber: page + 1,
                limit: pageLimit
            };
        }

        resultData.data = await collection.find(query)
            .sort("_id")
            .skip(startIndex)
            .limit(pageLimit)
            .exec();

        return resultData;

    } catch (error) {
        console.error('Error fetching paginated and filtered results:', error);
    }
}
