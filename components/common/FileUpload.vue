<template>
<div>
    <input type="file" ref="image" class="d-none" @change="uploadFile($event)">

    <v-btn depressed block color="primary" @click="$refs.image.click()" :loading="loading">
        Upload Image
    </v-btn>

    <v-img v-if="image" :src="image" aspect-ratio="1" class="mt-3"/>
</div>
</template>

<script>
export default {
    name: "FileUpload",
    props:{
        image: {
            type: String
        }
    },
    data(){
        return{
            tmp: null,
            loading: false,
        }
    },
    methods:{
        uploadFile(e) {
            try {
                this.loading = true;
                const file = e.target.files[0]
                if (file) {

                    const metadata = {
                        contentType: 'image/jpeg'
                    };

                    const uploadTask = this.$fire.storage.ref('images/' + file.name).put(file, metadata);

                    uploadTask.on("state_changed", (snapshot) => {

                            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            console.log('Upload is ' + progress + '% done')

                            switch (snapshot.state) {
                                case 'paused':
                                    console.log('Upload is paused');
                                    break;
                                case "running":
                                    console.log('Upload is running');
                                    break;
                            }

                        },
                        (error) => {
                            switch (error.code) {
                                case 'storage/unauthorized':
                                    break;
                                case 'storage/canceled':
                                    break;
                                case 'storage/unknown':
                                    break;
                            }
                        }, () => {
                            this.$fire.storage.ref('images').child(file.name).getDownloadURL().then((url) => {
                                this.$emit('image', url)
                                this.loading = false;
                            });
                        }
                    );
                }
            } catch (e) {
                console.log(e)
            }
        }
    }
}
</script>
