<template>
  <li>
    <h3>{{ fullName }}</h3>
    <h4>${{ coach.hourlyRate }}/hr</h4>
    <div>
      <base-badge v-for="area in coach.areas" :key="area" :type="area" :title="area"></base-badge>
    </div>
    <div class="actions">
      <base-button :to="'/coach/' + coach.id" link mode="outline">View Details</base-button>
      <base-button :to="'/coach/' + coach.id + '/contact'" link>Contact</base-button>
    </div>
  </li>
</template>

<script>
export default {
  props: ['coach'],
  computed: {
    fullName() {
      return this.coach.firstName + ' ' + this.coach.lastName;
    },
  },
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>