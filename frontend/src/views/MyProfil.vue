<template>
    <div class="profil">
        <div class="user">
            <img id="user-photo" v-bind:src="user.photo">
        </div>
        <div class="fields c-12">
            <input type="text" class="input-l" id="firstName" placeholder="First-name"
                aria-label="Prénom de l'utilisateur" v-model="user.firstName" />
            <input type="text" class="input-l" id="surname" placeholder="Last-name"
                aria-label="Nom de famille de l'utilisateur" v-model="user.surname" />
            <input type="email" class="input-l" id="email" aria-label="Email de l'utilisateur"
                placeholder="name@example.com" v-model="user.email" />

            <label class="file-select c-12">
                <div class="select-button" role="button" aria-label="Téléchargement d'un fichier">
                    <span v-if="newUserData.photo">Fichier séléctionné : {{newUserData.photo.name}}</span>
                    <span v-else class="add-file"><span class="mdi mdi-image"></span>Ajouter un fichier</span>
                </div>
                <input type="file" id="photo" class="upload-input" ref="photo" v-on:change="handleFileUpload()" />
            </label>

            <div class="buttons">
                <div class="c-12">
                    <button type="submit" class="btn btn-primary mb-2 btn-update"
                        aria-label="Modifier les informations utilisateur"
                        @click.prevent="updateUserInformations">Mettre à jour les informations</button>
                </div>
                <div class="c-12">
                    <button type="submit" class="btn btn-primary mb-2 btn-delete" aria-label="Supprimer l'utilisateur"
                        @click.prevent="deleteUser">Supprimer le compte</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import axios from "axios";
    export default {
        name: 'Profil',
        data() {
            return {

                user: {
                    firstName: '',
                    surname: '',
                    email: '',
                    photo: ''
                },
                newUserData: {
                    photo: null
                }
            };
        },
        created() {
            axios
                .get("http://localhost:3000/api/user", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("jwt")
                    }
                })
                .then(response => {
                    console.log(response.data);
                    this.user = response.data.user;
                })
        },
        methods: {
            updateUserInformations() {
                console.log(this.newUserData.photo);
                if (this.newUserData.photo !== null) {
                    console.log('non null');
                    let formData = new FormData();
                    formData.append('email', this.user.email);
                    formData.append('firstName', this.user.firstName);
                    formData.append('lastName', this.user.surname);
                    formData.append('imageUrl', this.newUserData.photo, this.newUserData.photo.name);
                    axios
                        .put('http://localhost:3000/api/user',
                            formData, {
                                headers: {
                                    'Content-Type': 'multipart/form-data',
                                    Authorization: "Bearer " + localStorage.getItem("jwt")
                                },
                            }
                        ).then(() => {
                            console.log('Image téléchargée !');
                            this.$router.go();
                        })
                        .catch(error =>
                            console.log(error)
                        );
                } else {
                    console.log('null');
                    let formData = new FormData();
                    formData.append('email', this.user.email);
                    formData.append('firstName', this.user.firstName);
                    formData.append('surname', this.user.surname);
                    formData.append('photo', this.user.photo);
                    axios
                        .put('http://localhost:3000/api/user',
                            formData, {
                                headers: {
                                    'Content-Type': 'multipart/form-data',
                                    Authorization: "Bearer " + localStorage.getItem("jwt")
                                },
                            }
                        ).then(() => {
                            console.log('Image téléchargée !');
                            this.$router.go();
                        })
                        .catch(error =>
                            console.log(error)
                        );
                }
            },
            loadUser() {
                axios
                    .get("http://localhost:3000/api/user" + this.userId, {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("jwt")
                        }
                    })
                    .then(response => {
                        console.log(response.data);
                        this.user = response.data.user;
                    })
            },
            handleFileUpload() {
                this.newUserData.photo = this.$refs.photo.files[0];
            },
        },
    };
</script>

<style scoped lang="scss">

    .profil {
        margin-top: 100px;
    }

    .user {
        display: flex;
        justify-content: center;
        padding: 100px 0;
        background-color: white;

    }

    #photo {
        border: none;
    }

    .buttons {
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 50px 0;
        flex-wrap: wrap;

        .c-12 {
            display: flex;
            justify-content: center;
        }
    }

    #user-photo {
        width: 100px;
        height: 100px;
    }

    .fields {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        background-color: white;

        input {
            border: 1px solid black;
            margin-bottom: 20px;
        }

        padding: 0px 25% 10px;

    }

    button {
        .mdi {
            padding-right: 10px;
        }
    }

    .file-select>.select-button {
        padding: 1rem;
        color: black;
        background-color: white;
        border-radius: .3rem;
        text-align: center;
        font-weight: 500;
        border: 1px solid black;
        width: calc(100% - 5px);
        cursor: pointer;
    }

    .file-select>input[type="file"] {
        display: none;
    }

    .select-button {
        .add-file {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 20px;
        }

        .mdi {
            border: none;
            padding-right: 15px;
        }
    }
</style>