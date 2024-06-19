import { Model } from "mongoose";


type resultDetail = {
    pageNumber: number ,
    limit: number
}

type result = {
    animeCount: number,
    previous: resultDetail,
    next: resultDetail,
    data: {},
    rowsPerPage: number
}

export async function handlePagination(collection: Model<{[x: string]: unknown;}>, page: number, pageLimit: number): Promise<result |undefined> {
    const resultData = {
        animeCount: NaN,
        previous: {
            pageNumber: NaN,
            limit: NaN,
        },
        next: {
            pageNumber: NaN,
            limit: NaN
        },
        data: {},
        rowsPerPage: NaN
    }
    try {
        const animeCount = await collection.countDocuments().exec()
        const result:result  = resultData
        let startIndex = page * pageLimit
        const endIndex = (page + 1) * pageLimit
        result.animeCount = animeCount
        if(startIndex > 0) {
            result.previous = {
                pageNumber: page - 1,
                limit: pageLimit
            }
        }
        if(endIndex < (await collection.countDocuments().exec())) {
            result.next = {
                pageNumber: page + 1,
                limit: pageLimit
            }
        }
        result.data = await collection.find().sort("_id")
            .skip(startIndex)
            .limit(pageLimit)
            .exec()

        result.rowsPerPage = pageLimit

        return result

    } catch (error) {
        console.error(error)
    }
}