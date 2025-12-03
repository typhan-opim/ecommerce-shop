
import SummaryApi from "@/common";
import type { ModalConfig } from "@/context/ModalContext";
import { toast } from "react-toastify";



const addToCart = async (
    e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement> | undefined,
    id: string,
    showModal?: (modal: Omit<ModalConfig, "id">) => string
) => {
    e?.stopPropagation();
    e?.preventDefault();

    const response = await fetch(SummaryApi.addToCartProduct.url,{
        method : SummaryApi.addToCartProduct.method,
        credentials : 'include',
        headers : {
            "content-type" : 'application/json'
        },
        body : JSON.stringify(
            { productId : id }
        )
    })

    const responseData = await response.json()

    if(responseData.success){
        toast.success(responseData.message, { autoClose: 500 })
    }

    if(responseData.error && showModal){
        showModal({ type: 'alert', message: responseData.message, redirect: responseData.redirect });
    }

    return responseData
}


export default addToCart