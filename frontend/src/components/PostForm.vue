<template>

  <!--- \\\\\\\Post Form-->
  <div class="card gedf-card">

    <div class="card-header">
      <ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
        <li class="nav-item">
          <a class="nav-link active" id="posts-tab" data-toggle="tab" href="#posts" role="tab" aria-controls="posts"
            aria-selected="true">Créer une publication</a>
        </li>
      </ul>
    </div>

    <div class="card-body">
      <div class="tab-content" id="myTabContent">

        <form method="POST" @submit.prevent="submitForm" enctype="multipart/form-data">

          <div class="tab-pane fade show active" id="posts" role="tabpanel" aria-labelledby="posts-tab">

            <div class="form-group" method="POST" @submit.prevent="submitForm" enctype="multipart/form-data">

              <label class="sr-only" for="message">post</label>
              <textarea class="form-control" id="message" rows="3" placeholder="A quoi pensez-vous?" v-model="post.text" required></textarea>

              <div>
                <b-form-file v-model="post.imageUrl" accept="image/*" class="mt-3" id="file-input" plain required></b-form-file>
              </div>

            </div>


            <div class="btn-toolbar justify-content-between">
              <div class="btn-group">
                <button type="submit" class="btn btn-primary">Partager</button>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  </div>
    <!-- Post Form /////-->

</template>

<script>
  import PostService from "../services/post";

  export default {
    name: "createPost",
    data: function () {
      return {
        post: {
          text: "",
          imageUrl: null,
        }
      }
    },
    methods: {

      submitForm: function () {
        const newPost = new FormData();
        newPost.append("text", this.post.text);
        newPost.append("image", this.post.imageUrl, this.post.imageUrl.filename);

        PostService.createPost(newPost).then(() => {
          this.$router.go();
        });
        return true;

      },
    }
  }
</script>

<style lang="scss" scoped>

  .h7 {
    font-size: 0.8rem;
  }

  .gedf-wrapper {
    margin-top: 0.97rem;
  }

  @media (min-width: 992px) {
    .gedf-main {
      padding-left: 4rem;
      padding-right: 4rem;
    }

    .gedf-card {
      margin-top: 2.77rem;
      margin-bottom: 2.77rem;
    }
  }

  /**Reset Bootstrap*/
  .dropdown-toggle::after {
    content: none;
    display: none;
  }
</style>