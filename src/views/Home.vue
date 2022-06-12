<template>
  <div class="home container">
    <!-- Header -->
    <div class="header flex">
      <div class="left flex flex-column">
        <h1>Invoice</h1>
        <span>There are total {{ filteredData.length }} total invoices</span>
      </div>
      <div class="right flex">
        <div @click="toggleFilterMenu" class="filter flex" ref="filter">
          <span
            >Filter by status
            <span v-if="filteredInvoice">
              : <span class="filter-text"> {{ filteredInvoice }}</span>
            </span>
          </span>
          <img src="@/assets/icon-arrow-down.svg" alt="arrow-down" />
          <ul v-show="filterMenu" class="filter-menu">
            <li @click="filterInvoices">Draft</li>
            <li @click="filterInvoices">Pending</li>
            <li @click="filterInvoices">Paid</li>
            <li @click="filterInvoices">Clear Filter</li>
          </ul>
        </div>
        <div @click="newInvoice" class="button flex">
          <div class="inner-button flex">
            <img src="@/assets/icon-plus.svg" alt="icon-plus" />
          </div>
          <span>New Invoice</span>
        </div>
      </div>
    </div>

    <!-- Invoices -->
    <template v-if="invoiceData.length > 0">
      <Invoice
        v-for="(invoice, index) in filteredData"
        :key="index"
        :invoice="invoice"
      />
    </template>
    <template v-else>
      <div class="empty flex flex-column">
        <img src="@/assets/illustration-empty.svg" alt="empty-invoice-data" />
        <h3>There are nothing here</h3>
        <p>
          Create a new invoice by clicking the New Invoice button and get
          started
        </p>
      </div>
    </template>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import Invoice from "../components/Invoice.vue";
export default {
  name: "HomeC",
  components: {
    Invoice,
  },
  data() {
    return {
      filterMenu: null,
      filteredInvoice: null,
    };
  },
  methods: {
    ...mapMutations(["TOGGLE_INVOICE"]),
    toggleFilterMenu() {
      this.filterMenu = !this.filterMenu;
    },
    newInvoice() {
      this.TOGGLE_INVOICE();
    },
    filterInvoices(e) {
      const textValue = e.target.innerText;

      if (textValue === "Clear Filter") {
        this.filteredInvoice = null;
        return;
      }

      this.filteredInvoice = textValue;
    },
  },
  computed: {
    ...mapState(["invoiceData"]),

    filteredData() {
      return this.invoiceData.filter((invoice) => {
        if (this.filteredInvoice === "Draft") {
          return invoice.invoiceDraft === true;
        }
        if (this.filteredInvoice === "Pending") {
          return invoice.invoicePending === true;
        }
        if (this.filteredInvoice === "Paid") {
          return invoice.invoicePaid === true;
        }
        return invoice;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  color: #fff;
  .header {
    margin-bottom: 65px;
    .left,
    .right {
      flex: 1;
    }
    .right {
      justify-content: flex-end;
      align-items: center;
      .button,
      .filter {
        align-items: center;
        span {
          font-size: 12px;
        }
      }
      .filter {
        position: relative;
        margin-right: 40px;
        cursor: pointer;
        img {
          margin-left: 12px;
          width: 9px;
          height: 5px;
        }

        .filter-text {
          font-weight: 700;
          color: #c2510f;
        }

        .filter-menu {
          width: 120px;
          position: absolute;
          top: 25px;
          list-style: none;
          background-color: #1e2139;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
          // transition: display 0.4s ease;
          li {
            cursor: pointer;
            font-size: 12px;
            padding: 10px 20px;
            &:hover {
              color: #1e2139;
              background-color: #fff;
            }
          }
        }
      }
      .button {
        padding: 8px 10px;
        background-color: #7c5dfa;
        border-radius: 40px;
        .inner-button {
          margin-right: 8px;
          border-radius: 50%;
          padding: 8px;
          align-items: center;
          justify-content: center;
          background-color: #fff;
          img {
            width: 10px;
            height: 10px;
          }
        }
      }
    }
  }
  .empty {
    margin-top: 160px;
    align-items: center;
    img {
      width: 214px;
      height: 200px;
    }
    h3 {
      font-size: 20px;
      margin-top: 40px;
    }
    p {
      text-align: center;
      max-width: 224px;
      font-size: 12px;
      font-weight: 300;
      margin-top: 16px;
    }
  }
}
</style>
