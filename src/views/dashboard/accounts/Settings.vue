<template>
  <div>
    <section class="accounts__title">
      <h3>Settings</h3>
    </section>

    <section class="accounts-settings__uploads">
      <Uploads
        name="Profile Picture"
        description="Set Profile Picture"
        image="https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
      />
      <Uploads
        name="Passport Photo"
        image=""
        description="Upload a Passport Photo or White Background Selfie"
      />
      <Uploads
        name="Passport/National ID"
        description="Upload your National ID, Voter's Card or International Passport"
        image="https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
      />
      <Uploads
        name="Address Proof"
        description="Upload your Utility bill or Bank Statement"
        image="https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
      />
    </section>

    <form class="accounts-settings__form">
      <section class="accounts-settings__hero">
        <div class="accounts-settings__group">
          <label class="form__label"
            >Name
            <form-input
              type="text"
              name="name"
              v-model="itemData.name"
              placeholder="First and Last Name"
          /></label>
        </div>
        <div class="accounts-settings__group">
          <label class="form__label"
            >Email
            <form-input
              type="email"
              name="email"
              v-model="itemData.email"
              placeholder="Email Address"
          /></label>
        </div>
      </section>
    </form>

    <form class="accounts-settings__form">
      <div class="accounts-settings__title">
        <h5>BVN Verification</h5>
        <a class="accounts-settings__edit">edit</a>
      </div>
      <section class="accounts-settings__hero">
        <div class="accounts-settings__group">
          <label class="form__label"
            >BVN <form-input type="number" name="bvn" v-model="itemData.bvn" placeholder="BVN"
          /></label>
        </div>
        <div class="accounts-settings__group">
          <label class="form__label"
            >Bank Name
            <select class="form__input form__select">
              <option value="1">All</option>
              <option value="2">Local</option>
              <option value="3">Global</option>
            </select></label
          >
        </div>
        <div class="accounts-settings__group">
          <label class="form__label"
            >Bank Number<form-input
              type="number"
              name="bank number"
              v-model="itemData.bankAcctNo"
              placeholder="Bank Account Number"
          /></label>
        </div>
      </section>
    </form>

    <form class="accounts-settings__form">
      <div class="accounts-settings__title">
        <h5>Verify Phone Number</h5>
        <a class="accounts-settings__edit">edit</a>
      </div>
      <section class="accounts-settings__hero">
        <div class="accounts-settings__group">
          <label class="form__label"
            >Phone Number
            <form-input
              type="number"
              name="phone"
              v-model="itemData.phone"
              placeholder="Phone Number"
          /></label>
        </div>
      </section>
    </form>

    <form class="accounts-settings__form">
      <div class="accounts-settings__title">
        <h5>Confirm Postal Address</h5>
        <a class="accounts-settings__edit">edit</a>
      </div>
      <section class="accounts-settings__hero">
        <div class="accounts-settings__group">
          <label class="form__label"
            >Gender
            <select class="form__input form__select">
              <option value="1">Male</option>
              <option value="2">Female</option>
            </select></label
          >
        </div>
        <div class="accounts-settings__group">
          <label class="form__label"
            >Address<form-input
              type="text"
              name="address"
              v-model="itemData.address"
              placeholder="Address"
          /></label>
        </div>
        <div class="accounts-settings__group">
          <label class="form__label"
            >LGA
            <select class="form__input form__select">
              <option value="1">Oshodi</option>
              <option value="2">Ikeja</option>
              <option value="3">Ikorodu</option>
            </select></label
          >
        </div>
      </section>
    </form>

    <form class="accounts-settings__form">
      <div class="accounts-settings__title">
        <h5>Confirm Employment Details</h5>
        <a class="accounts-settings__edit">edit</a>
      </div>
      <section class="accounts-settings__hero">
        <div class="accounts-settings__group">
          <label class="form__label"
            >Status
            <select class="form__input form__select" v-model="employmentStatus">
              <option value="1">Employed</option>
              <option value="2">Self-Employed</option>
              <option value="3">Unemployed</option>
            </select></label
          >
        </div>
        <template v-if="employmentStatus !== '3'">
          <div class="accounts-settings__group">
            <label class="form__label"
              >Company Name<form-input
                type="text"
                name="employment company"
                v-model="itemData.employCompany"
                placeholder="Company Name"
            /></label>
          </div>
          <div class="accounts-settings__group">
            <label class="form__label"
              >Employment Type<form-input
                type="text"
                name="employment company"
                v-model="itemData.employCompany"
                placeholder="Employment Type"
            /></label>
          </div>
        </template>
      </section>
    </form>

    <form class="accounts-settings__form">
      <div class="accounts-settings__title">
        <h5>Confirm Investment Profile</h5>
        <a class="accounts-settings__edit">edit</a>
      </div>
      <section class="accounts-settings__hero">
        <div class="accounts-settings__group">
          <label class="form__label"
            >Investment Objectives
            <select class="form__input form__select">
              <option value="1">All</option>
              <option value="2">Local</option>
              <option value="3">Global</option>
            </select></label
          >
        </div>
        <div class="accounts-settings__group">
          <label class="form__label"
            >Investment Experience
            <select class="form__input form__select">
              <option value="1">All</option>
              <option value="2">Local</option>
              <option value="3">Global</option>
            </select></label
          >
        </div>
        <div class="accounts-settings__group">
          <label class="form__label"
            >Annual Income
            <select class="form__input form__select">
              <option value="1">All</option>
              <option value="2">Local</option>
              <option value="3">Global</option>
            </select></label
          >
        </div>
        <div class="accounts-settings__group">
          <label class="form__label"
            >Net Worth Liquid
            <select class="form__input form__select">
              <option value="1">All</option>
              <option value="2">Local</option>
              <option value="3">Global</option>
            </select></label
          >
        </div>
        <div class="accounts-settings__group">
          <label class="form__label"
            >Net Worth Total
            <select class="form__input form__select">
              <option value="1">All</option>
              <option value="2">Local</option>
              <option value="3">Global</option>
            </select></label
          >
        </div>
        <div class="accounts-settings__group">
          <label class="form__label"
            >Risk Tolerance
            <select class="form__input form__select">
              <option value="1">All</option>
              <option value="2">Local</option>
              <option value="3">Global</option>
            </select></label
          >
        </div>
      </section>
    </form>

    <form class="accounts-settings__form">
      <div class="accounts-settings__title">
        <h5>Confirm Compliance Status</h5>
        <a class="accounts-settings__edit">edit</a>
      </div>
      <section class="accounts-settings__hero">
        <div class="accounts-settings__group">
          <label class="form__label"
            >Mother's Maiden Name
            <form-input
              type="text"
              name="maiden"
              v-model="itemData.maidenName"
              placeholder="Mother's Maiden Name"
          /></label>
        </div>
        <div class="accounts-settings__group">
          <label class="form__label"
            >Next of Kin Phone
            <form-input
              type="text"
              name="nok phone"
              v-model="itemData.nextOfKinPhone"
              placeholder="Next of Kin Phone"
          /></label>
        </div>
        <div class="accounts-settings__group">
          <label class="form__label"
            >Are you politically exposed?
            <select class="form__input form__select">
              <option value="1">Yes</option>
              <option value="2">No</option>
            </select></label
          >
        </div>
      </section>
    </form>
  </div>
</template>

<script>
import Uploads from '../../../components/FileUpload';

export default {
    name: 'accounts-settings',
    components: {
        Uploads
    },
    data() {
        return {
            itemData: {},
            activeButton: 1,
            employmentStatus: 1,
            statementButtons: [
                {
                    name: 'Statement',
                    value: 1
                },
                {
                    name: 'Confirmations',
                    value: 2
                },
                {
                    name: 'Tax',
                    value: 3
                }
            ],
            settings: [
                {
                    description: 'Description',
                    detail: '2018 Tax Year 1099-B',
                    link: ''
                },
                {
                    description: 'Description',
                    detail: '2018 Tax Year 1099-B',
                    link: ''
                },
                {
                    description: 'Description',
                    detail: '2018 Tax Year 1099-B',
                    link: ''
                },
                {
                    description: 'Description',
                    detail: '2018 Tax Year 1099-B',
                    link: ''
                },
                {
                    description: 'Description',
                    detail: '2018 Tax Year 1099-B',
                    link: ''
                },
                {
                    description: 'Description',
                    detail: '2018 Tax Year 1099-B',
                    link: ''
                },
                {
                    description: 'Description',
                    detail: '2018 Tax Year 1099-B',
                    link: ''
                }
            ]
        };
    }
};
</script>
