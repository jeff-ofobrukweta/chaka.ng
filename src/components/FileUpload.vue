<template>
    <form class="uploads" @submit.prevent="uploadImage" enctype="multipart/form-data">
        <p class="uploads__name">{{ formDetails.name }}</p>
        <div class="uploads__empty">
            <input class="uploads__input" accept="image/jpeg,image/png,application/pdf" type="file" :name="formName" @input="handleInput" @focus="handleReset" />
            <template v-if="uploadedImage">
                <img class="uploads__image--local" :src="uploadedImage" alt="" v-if="fileExtension !== 'pdf'" />
                <img class="uploads__image--local" :src="require('../assets/img/pdf.svg')" alt="PDF" v-else />
            </template>
            <img class="uploads__image--local" :src="require('../assets/img/pdf.svg')" alt="" v-else-if="isImagePDF" />
            <img class="uploads__image--local" :src="image" alt="" v-else-if="image" />
            <div class="uploads__overlay">
                <img src="../assets/img/uploads-add.svg" class="uploads__image--plus" alt="Upload" />
            </div>
        </div>
        <p class="uploads__meta">{{ formDetails.description }}</p>
        <action-button v-if="uploadedImage" type="submit" icon :pending="loading" :classes="['btn__primary', 'btn-block']">Upload </action-button>
    </form>
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: "uploads",
    props: {
        image: {
            type: String
        },
        formName: {
            type: String,
            required: true
        },
        selectedName: {
            type: String
        },
        idType: {
            type: String
        }
    },
    data() {
        return {
            uploadedImage: null,
            fileExtension: null,
            file: null,
            errorMessage: null,
            loading: false
        };
    },
    computed: {
        formDetails() {
            if (this.selectedName) {
                return {
                    name: this.selectedName,
                    description: `Upload your ${this.selectedName}`
                };
            }
            if (this.formName === "passportUrl") return { name: "Profile Picture", description: "Set Profile Picture" };
            if (this.formName === "idPhotoUrl") {
                return {
                    name: "Passport/National ID",
                    description: "Upload your National ID, Voter's Card or International Passport"
                };
            }
            return {
                name: "Address Proof",
                description: "Upload your Utility bill or Bank Statement"
            };
        },
        isImagePDF() {
            if (this.image) {
                const stripped = this.image.substr(this.image.length - 3);
                return stripped.toLowerCase() === "pdf";
            }
        }
    },
    methods: {
        ...mapActions(["UPLOAD_KYC_FILE", "UPDATE_KYC"]),
        async handleInput(e) {
            this.handleReset();
            this.file = e.target.files[0];
            const extensions = e.target.value.split(".");
            this.fileExtension = extensions[extensions.length - 1].toLowerCase();
            if (this.file.size > 10 * 1024 * 1024 && this.fileExtension !== "pdf") {
                this.errorMessage = `Current size is ${parseFloat(this.file.size / 1024 / 1024).toFixed(2)}MB. Image should not exceed 10MB`;
                this.handleError();
                return false;
            }
            if (this.file.size > 3 * 1024 * 1024 && this.fileExtension === "pdf") {
                this.errorMessage = `Current size is ${parseFloat(this.file.size / 1024 / 1024).toFixed(2)}MB. File should not exceed 3MB`;
                this.handleError();
                return false;
            }
            await this.toBase64();
        },
        toBase64() {
            const reader = new FileReader();
            reader.readAsDataURL(this.file);
            reader.onload = () => {
                this.uploadedImage = reader.result;
            };
        },
        handleError() {
            this.$emit("error", this.errorMessage);
        },
        handleReset() {
            this.$emit("reset");
        },
        handleSuccess() {
            this.$emit("success");
        },
        async uploadImage() {
            const formData = new FormData();
            formData.append(this.formName, this.file);
            this.loading = true;
            if (this.idType) {
                await this.UPDATE_KYC({ idType: this.idType });
            }
            this.UPLOAD_KYC_FILE(formData).then(resp => {
                this.loading = false;
                if (resp) {
                    this.$toasted.show(`${this.formDetails.name} uploaded successful`, {
                        type: "success"
                    });
                    this.uploadedImage = null;
                    this.fileExtension = null;
                    this.file = null;
                    this.errorMessage = null;
                    this.handleSuccess();
                    return true;
                }
                this.handleError();
            });
        }
    },
    watch: {
        idType() {
            this.uploadedImage = null;
        }
    }
};
</script>
