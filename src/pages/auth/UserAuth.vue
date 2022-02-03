<template>
  <div>
    <base-dialog :show="!!error" title="Error" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" fixed title="Processing">
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">Email</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="password" />
        </div>
        <p v-if="!isValid">You have errors!</p>
        <base-button>{{ submitButtonCap }}</base-button>
        <base-button type="button" mode="flat" @click="switchAuth">{{
          switchModeCap
        }}</base-button>
      </form>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      isValid: true,
      mode: 'login',
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitButtonCap() {
      return this.mode === 'login' ? 'Login' : 'Signup';
    },
    switchModeCap() {
      return this.mode !== 'login' ? 'Login instead' : 'Signup instead';
    },
  },
  methods: {
    async submitForm() {
      this.isValid = true;
      if (this.email === '') {
        this.isValid = false;
        return;
      }
      if (this.password.length < 6) {
        this.isValid = false;
        return;
      }

      this.isLoading = true;
      try {
        if (this.mode === 'login') {
          await this.$store.dispatch('login', {
            email: this.email,
            password: this.password,
          });
        } else {
          await this.$store.dispatch('signup', {
            email: this.email,
            password: this.password,
          });
        }
        const redirect = '/' + (this.$route.query.redirect || '/')
        this.$router.replace(redirect);
      } catch (error) {
        this.isLoading = false;
        this.error = error.message;
      }
      this.isLoading = false;
    },
    switchAuth() {
      if (this.mode === 'login') {
        this.mode = 'signup';
      } else {
        this.mode = 'login';
      }
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>