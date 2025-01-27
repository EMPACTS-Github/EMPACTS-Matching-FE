'use client'

import axiosInstance from "."

export const startup_list = async (limit: number, page: number) => {
    const response = await axiosInstance.get(`/startups/public/all?limit=${limit}&page=${page}`)
    return response.data
}

export const startup_private_list = async (limit: number, page: number) => {
    const response = await axiosInstance.get(`/startups/private/all?limit=${limit}&page=${page}`)
    return response.data
}

// reponse.data
// {
//     "code": "STARTUPS_FOUND",
//     "data": {
//         "startups": [
//             {
//                 "id": 1,
//                 "name": "MicroLoan Hub",
//                 "description": "Provides microloans to impoverished communities for starting small businesses.",
//                 "category": "No Poverty"
//             },
//             {
//                 "id": 2,
//                 "name": "EduBridge",
//                 "description": "Offers free online educational resources and skills training for low-income individuals.",
//                 "category": "No Poverty"
//             },
//             {
//                 "id": 3,
//                 "name": "FarmFresh Network",
//                 "description": "Connects local farmers with consumers, reducing food waste and promoting sustainable agriculture.",
//                 "category": "Zero Hunger"
//             },
//             {
//                 "id": 4,
//                 "name": "NutriGrow",
//                 "description": "Develops nutrient-rich crops and vertical farming solutions for food-insecure regions.",
//                 "category": "Zero Hunger"
//             }
//         ],
//         "hasMore": true
//     }
// }
