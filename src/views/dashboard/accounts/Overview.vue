<template>
  <div>
    <section class="accounts__title">
      <h2>Overview</h2>
    </section>
    <section class="accounts-overview">
      <div class="accounts-overview__text">
        <img src="../../../assets/img/dp.png" alt="Avatar" class="avatar avatar-lg" />
      </div>
      <div class="accounts-overview__text">
        <p>Name</p>
        <h4>Jane Doe</h4>
      </div>
      <div class="accounts-overview__text">
        <p>User ID</p>
        <h4>137489739</h4>
      </div>
      <div class="accounts-overview__text">
        <p>Portfolio Value</p>
        <h4>2,454,622.33</h4>
      </div>
      <div class="accounts-overview__text">
        <p>CSCS No.</p>
        <h4>NIW9420FN249</h4>
      </div>
    </section>

    <section class="accounts-overview__cards">
      <Card title="Trading Status" class="accounts-overview__card"> Content</Card>
      <Card
        title="Stamps Earned"
        :action="{ text: 'See All', link: 'accounts-stamps' }"
        class="accounts-overview__card"
      >
      </Card>
      <Card
        title="More Information"
        :action="{ text: 'Edit Profile', link: 'accounts-settings' }"
        class="accounts-overview__card"
      >
      </Card>
    </section>
  </div>
</template>

<script>
import Card from "../../../layouts/AccountsCard";
export default {
  name: "accounts-overview",
  components: {
    Card
  }
};
</script>
