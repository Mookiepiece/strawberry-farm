<script setup lang="ts"></script>

<template>
  <img src="./pic256.jpg" alt="256" />
  <img src="./pic256.jpg" alt="256" />
  <img src="./pic256.jpg" alt="256" />
  <div>
    <table>
      <tbody>
        <tr>
          <th>1.1</th>
          <th>1.2</th>
          <th style="width: 100px">1.3</th>
          <th>1.4</th>
        </tr>
        <tr>
          <td>2.1</td>
          <td>2.2</td>
          <td style="overflow: hidden;">
            <div class="...">
              2.3 Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Eligendi quibusdam sint, veritatis voluptatum vel quasi, et,
              assumenda ratione earum mollitia reiciendis magnam repellat
              doloremque deleniti tempore quaerat ullam nihil similique.
            </div>
          </td>
          <td>2.4</td>
        </tr>
      </tbody>
    </table>
  </div>
  <input size="500" />
  <div class="flexmain">
    <div class="flexdemo">
      <div class="d1">
        <div>
          <!-- <img src="./pic1920.jpg" style="max-width: 100%" /> -->
          <!-- <div class="d2 ...">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque,
            praesentium nisi similique saepe autem quaerat doloribus eius sit
            distinctio optio incidunt eum! Suscipit repellendus laboriosam odit
            commodi, a eius temporibus.
          </div> -->
        </div>
      </div>
      <div class="...">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque,
        praesentium nisi similique saepe autem quaerat doloribus eius sit
        distinctio optio incidunt eum! Suscipit repellendus laboriosam odit
        commodi, a eius temporibus.
      </div>
      <div class="...">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque,
        praesentium nisi similique saepe autem quaerat doloribus eius sit
        distinctio optio incidunt eum! Suscipit repellendus laboriosam odit
        commodi, a eius temporibus.
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.d2 {
}
</style>
<style lang="scss" scoped>
table {
  width: 100%;
}

td {
  border: 1px solid tan;
}
.grid {
  // width: 100%;
  // display: grid;
  // grid-template-columns: 1fr 1fr 3fr 1fr;
  // padding: 1px;
  // gap: 1px;
  // background-color: #8883;

  // > div {
  //   padding: 4px;
  //   background-color: #fff;
  // }
  // > div:nth-child(4n - 3) {
  //   color: chocolate;
  //   // padding-left: 8px;
  // }
}
.flexdemo {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  display: flex;
  justify-content: end;

  > div {
    border: 5px solid tan;
    padding: 5px;
  }

  .d1 {
    flex: 1 1 0%;
    // min-width: 0;
    // overflow: hidden;
    // overflow: scroll;
    // max-width: 200px;
  }
}

.flexmain {
  // max-width: 100%;
  // overflow: hidden;
}
</style>
