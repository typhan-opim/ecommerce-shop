import SummaryApi from "@/common";
import { postData } from '@/services/apiService';

const fetchCategoryWiseProduct = async (category: string) => {
    const dataResponse = await postData<any>(
        SummaryApi.categoryWiseProduct.url,
        { category }
    );
    return dataResponse;
}

export default fetchCategoryWiseProduct