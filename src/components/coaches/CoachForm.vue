<template>
  <form @submit.prevent="submitorm">
    <div class="form-control" :class="{invalid: !firstName.isValid }">
      <label for="firstname">First Name</label>
      <input type="text" id="firstname" v-model.trim="firstName.val" @blur="validateForm" />
      <p v-if="!firstName.isValid">Firstname is empty</p>
    </div>
    <div class="form-control" :class="{invalid: !lastName.isValid }">
      <label for="lastname">Last Name</label>
      <input type="text" id="lastname" v-model.trim="lastName.val" @blur="validateForm" />
        <p v-if="!lastName.isValid">Lastname is empty</p>
    </div>
    <div class="form-control">
      <label for="description">Description</label>
      <textarea
        type="text"
        rows="5"
        id="description"
        v-model.trim="description"
      ></textarea>
    </div>
    <div class="form-control">
      <label for="rate">Rate</label>
      <input type="number" id="rate" v-model.number="rate" />
    </div>
    <div class="form-control">
      <h3>Areas</h3>
      <div>
        <input type="checkbox" id="frontend" value="frontend" v-model="areas" />
        <label for="frontend">Frontend</label>
      </div>
      <div>
        <input type="checkbox" id="backend" value="backend" v-model="areas" />
        <label for="backend">Backend</label>
      </div>
      <div>
        <input type="checkbox" id="career" value="career" v-model="areas" />
        <label for="career">Career</label>
      </div>
    </div>
    <p v-if="!formValid">You have errors!</p>
    <base-button>Register</base-button>
  </form>
</template>

<script>
export default {
  emits: ['coach-form-sumitted'],
  data() {
    return {
      firstName: {
        val: '',
        isValid: true,
      },
      lastName: {
        val: '',
        isValid: true,
      },
      description: '',
      rate: null,
      areas: [],
      formValid: true,
    };
  },
  methods: {
    submitorm() {
      
      this.validateForm();

      const form = {
        firstName: this.firstName.val,
        lastName: this.lastName.val,
        areas: this.areas,
        description: this.description,
        hourlyRate: this.rate,
      };
      
      if(!this.formValid){
        return;
      }

      this.$emit('coach-form-sumitted', form);
    },
    validateForm() {
      this.formValid = true;
      this.firstName.isValid = true;
      this.lastName.isValid = true;

      if (this.firstName.val === '') {
        this.firstName.isValid = false;
        this.formValid = false;
      }
      if (this.lastName.val === '') {
        this.lastName.isValid = false;
        this.formValid = false;
      }
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>