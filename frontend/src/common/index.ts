
const backendDomain = import.meta.env.VITE_BACKEND_URL//"http://localhost:8080"

const SummaryApi = {
    signUP : {
        url : `${backendDomain}/api/signup`,
        method : "post"
    },
    signIN: {
        url : `${backendDomain}/api/signin`,
        method : "post"
    },
    current_user : {
        url : `${backendDomain}/api/auth/user-details`,
        method : "get"
    },
    logout_user : {
        url : `${backendDomain}/api/userLogout`,
        method : 'get'
    },
    allUser : {
        url : `${backendDomain}/api/auth/all-user`,
        method : 'get'
    },
    updateUser : {
        url : `${backendDomain}/api/auth/update-user`,
        method : "post"
    },
    uploadProduct : {
        url : `${backendDomain}/api/auth/upload-product`,
        method : 'post'
    },
    allProduct : {
        url : `${backendDomain}/api/get-product`,
        method : 'get'
    },
    updateProduct : {
        url : `${backendDomain}/api/auth/update-product`,
        method  : 'post'
    },
    categoryProduct : {
        url : `${backendDomain}/api/get-categoryProduct`,
        method : 'get'
    },
    categoryWiseProduct : {
        url : `${backendDomain}/api/category-product`,
        method : 'post'
    },
    productDetails : {
        url : `${backendDomain}/api/product-details`,
        method : 'post'
    },
    addToCartProduct : {
        url : `${backendDomain}/api/auth/addtocart`,
        method : 'post'
    },
    addToCartProductCount : {
        url : `${backendDomain}/api/auth/countAddToCartProduct`,
        method : 'get'
    },
    addToCartProductView : {
        url : `${backendDomain}/api/auth/view-card-product`,
        method : 'get'
    },
    updateCartProduct : {
        url : `${backendDomain}/api/auth/update-cart-product`,
        method : 'post'
    },
    deleteCartProduct : {
        url : `${backendDomain}/api/auth/delete-cart-product`,
        method : 'post'
    },
    searchProduct : {
        url : `${backendDomain}/api/search`,
        method : 'get'
    },
    filterProduct: {
        url : `${backendDomain}/api/filter-product`,
        method : 'post'
    },
    payment : {
        url : `${backendDomain}/api/auth/checkout`,
        method  : 'post'
    },
    getOrder : {
        url : `${backendDomain}/api/auth/order-list`,
        method : 'get'
    },
    allOrder : {
        url : `${backendDomain}/api/auth/all-order`,
        method : 'get'
    }
    
}


export default SummaryApi