<template>
    <div class="uploads">
        <p class="uploads__name">{{ name }}</p>
        <img class="uploads__image" :src="image" alt="" v-if="image" />
        <div v-else class="uploads__empty">
            <input
                class="uploads__input"
                accept="image/jpeg,image/png,application/pdf"
                type="file"
                :name="formName"
                @input="handleInput"
            />
            <template v-if="uploadedImage">
                <img
                    class="uploads__image--local"
                    :src="uploadedImage"
                    alt=""
                    v-if="fileExtension !== 'pdf'"
                />
                <img
                    class="uploads__image--local"
                    :src="require('../assets/img/pdf.svg')"
                    alt="PDF"
                    v-else
                />
            </template>
            <div class="uploads__overlay">
                <img src="../assets/img/uploads-add.svg" alt="Upload" />
            </div>
        </div>
        <p class="uploads__meta">{{ description }}</p>
    </div>
</template>

<script>
export default {
    name: "uploads",
    props: {
        name: {
            type: String,
            required: true
        },
        image: {
            type: String
        },
        description: {
            type: String,
            required: true
        },
        formName: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            uploadedImage: null,
            fileExtension: null,
            content: this.value
        };
    },
    methods: {
        async handleInput(e) {
            const file = e.target.files[0];
            let formData = new FormData();
            formData.append(this.formName, file);
            const extensions = e.target.value.split(".");
            this.fileExtension = extensions[extensions.length - 1].toLowerCase();
            await this.toBase64(file);
            this.$emit("input", formData);
        },
        toBase64(file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.uploadedImage = reader.result;
            };
            reader.onerror = error => {
                console.log("Error: ", error);
            };
        }
    }
};
</script>
