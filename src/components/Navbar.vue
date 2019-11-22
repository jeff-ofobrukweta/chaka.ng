<template>
  <nav class="side__nav" id="nav">
    <ul class="side-nav container">
      <li class="side-nav__item">
        <router-link class="side-nav__link" :to="{ name: 'portfolio' }">
          <span class="side-nav__text">
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.5 11.3333H9.16667V3H2.5V11.3333ZM2.5 18H9.16667V13H2.5V18ZM10.8333 18H17.5V9.66667H10.8333V18ZM10.8333 3V8H17.5V3H10.8333Z"
                fill="#485964"
              />
            </svg>
            Portfolio
          </span>
          <div class="side-nav__dot"></div>
        </router-link>
      </li>
      <li class="side-nav__item">
        <router-link class="side-nav__link" :to="{ name: 'explore' }">
          <span class="side-nav__text">
            <svg
              width="20"
              height="21"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.99984 8.08341C8.4915 8.08341 8.08317 8.49175 8.08317 9.00008C8.08317 9.50842 8.4915 9.91675 8.99984 9.91675C9.50817 9.91675 9.9165 9.50842 9.9165 9.00008C9.9165 8.49175 9.50817 8.08341 8.99984 8.08341ZM8.99984 0.666748C4.39984 0.666748 0.666504 4.40008 0.666504 9.00008C0.666504 13.6001 4.39984 17.3334 8.99984 17.3334C13.5998 17.3334 17.3332 13.6001 17.3332 9.00008C17.3332 4.40008 13.5998 0.666748 8.99984 0.666748ZM10.8248 10.8251L3.99984 14.0001L7.17484 7.17508L13.9998 4.00008L10.8248 10.8251Z"
                fill="#293D4A"
              />
            </svg>
            Explore
          </span>
          <div class="side-nav__dot"></div>
        </router-link>
      </li>
      <li class="side-nav__item">
        <router-link class="side-nav__link" :to="{ name: 'categories' }">
          <span class="side-nav__text">
            <svg
              width="20"
              height="21"
              viewBox="0 0 17 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.1238 0.929688H6.94368C6.6956 0.929688 6.49466 1.13063 6.49466 1.37871V5.56128C6.49466 5.80936 6.6956 6.0103 6.94368 6.0103H8.59091L8.61323 8.86815H6.22177V7.22836C6.22177 6.98029 6.02083 6.77934 5.77275 6.77934H1.59017C1.3421 6.77934 1.14115 6.98029 1.14115 7.22836V11.4085C1.14115 11.6565 1.3421 11.8575 1.59017 11.8575H5.77275C6.02083 11.8575 6.22177 11.6565 6.22177 11.4085V9.76867H8.62068L8.66285 15.075H5.08062V13.4303C5.08062 13.1822 4.87967 12.9813 4.6316 12.9813H0.449019C0.200942 12.9813 0 13.1822 0 13.4303V17.6129C0 17.8609 0.200942 18.0619 0.449019 18.0619H4.6316C4.87967 18.0619 5.08062 17.8609 5.08062 17.6129V15.9681H9.11683C9.36491 15.9681 9.56337 15.7647 9.56089 15.5191L9.51623 12.0485H11.6596V13.6908C11.6596 13.9388 11.8606 14.1398 12.1086 14.1398H16.2912C16.5368 14.1398 16.7402 13.9388 16.7402 13.6908V9.51067C16.7402 9.26259 16.5368 9.05917 16.2912 9.05917H12.1086C11.8606 9.05917 11.6596 9.26259 11.6596 9.51067V11.1505H9.50879L9.48646 6.0103H11.1238C11.3718 6.0103 11.5728 5.80936 11.5728 5.56128V1.37871C11.5728 1.13063 11.3718 0.929688 11.1238 0.929688Z"
                fill="#485964"
              />
            </svg>
            Categories
          </span>
          <div class="side-nav__dot"></div>
        </router-link>
      </li>
      <li class="side-nav__item">
        <router-link class="side-nav__link" :to="{ name: 'accounts-overview' }">
          <span class="side-nav__text side-nav__inline">
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.99935 2.16699C5.39935 2.16699 1.66602 5.90033 1.66602 10.5003C1.66602 15.1003 5.39935 18.8337 9.99935 18.8337C14.5993 18.8337 18.3327 15.1003 18.3327 10.5003C18.3327 5.90033 14.5993 2.16699 9.99935 2.16699ZM9.99935 4.66699C11.3827 4.66699 12.4993 5.78366 12.4993 7.16699C12.4993 8.55033 11.3827 9.66699 9.99935 9.66699C8.61602 9.66699 7.49935 8.55033 7.49935 7.16699C7.49935 5.78366 8.61602 4.66699 9.99935 4.66699ZM9.99935 16.5003C7.91602 16.5003 6.07435 15.4337 4.99935 13.817C5.02435 12.1587 8.33268 11.2503 9.99935 11.2503C11.6577 11.2503 14.9743 12.1587 14.9993 13.817C13.9243 15.4337 12.0827 16.5003 9.99935 16.5003Z"
                fill="#485964"
              /></svg
            >Accounts
            <!-- <div class="dropdown">
              <button class="dropbtn">Accounts</button>
              <div class="dropdown-content">
                <router-link
                  class="side-nav__link--inner"
                  v-for="(link, i) in routes"
                  :key="i"
                  :to="{ name: link.link }"
                  >{{ link.name }}</router-link
                >
              </div>
            </div> -->
          </span>
          <div class="side-nav__dot"></div>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import dropdown from "./Dropdown";
export default {
  name: "navbar",
  components: {
    dropdown
  },
  data() {
    return {
      routes: [
        {
          name: "Wallet",
          link: "accounts-wallet"
        },
        {
          name: "History",
          link: "accounts-history"
        },
        {
          name: "Statements",
          link: "accounts-statements"
        },
        {
          name: "Stamps",
          link: "accounts-stamps"
        },
        {
          name: "Settings",
          link: "accounts-settings"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
/* Dropdown Button */
// .dropbtn {
//   background-color: #4caf50;
//   color: white;
//   padding: 16px;
//   font-size: 16px;
//   border: none;
// }

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  // display: none;
  position: absolute;
  min-width: 200px;
  z-index: -200;
  opacity: 0;
  top: 45px;
  left: -100px;
  background-color: $white;
  box-shadow: 0px 7px 64px rgba($color: $black, $alpha: 0.07);
  transition: all 200ms;
  border: 1px solid $primary;
  border-radius: 3px;
}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  // display: block;
  opacity: 1;
  z-index: 1;
}
</style>
