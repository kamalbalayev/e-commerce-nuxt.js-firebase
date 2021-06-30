<template>
    <product-form/>
</template>

<script>
export default {
    name: "index",
    components:{
        ProductForm: ()=> import('~/components/pages/products/Form')
    }
}
</script>
