
import SummaryApi from "@/common";
import type { ModalConfig } from "@/context/ModalContext";
import { toast } from "react-toastify";

import { postData } from '@/services/apiService';



const addToCart = async (
    e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement> | undefined,
    id: string,
    showModal?: (modal: Omit<ModalConfig, "id">) => string
) => {
    e?.stopPropagation();
    e?.preventDefault();


    const responseData = await postData<any>(
        SummaryApi.addToCartProduct.url,
        { productId: id }
    );

    if(responseData.success){
        toast.success(responseData.message, { autoClose: 500 })
    }

    if(responseData.error && showModal){
        showModal({ type: 'alert', message: responseData.message, redirect: responseData.redirect });
    }

    return responseData
}


export default addToCart