<style lang="scss" scoped>
.user {
  padding-top: 4.5vh;
}
.user .left-div {
  float: left;
  width: 64%;
  height: 70vh;
}
.table-container {
  padding: 4%;
  overflow: auto;
}
.user .right-div {
  width: 36%;
}
.user .title {
}
.user .table-container {
  width: 90%;
  height: 73vh;
  margin: 0 auto;
  border-radius: 8px;
  background: white;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
}
.user .right-div {
  float: left;
  width: 34%;
  height: 82vh;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  background: white;
  font-size: 20px;
  overflow: auto;
}
.user .fields {
  text-align: left;
  width: 90%;
  margin: 0 auto;
  padding: 20px 40px;
  cursor: pointer;
}
.user .name-word {
}
.key-word {
  font-size: 20px;
  padding: 6px 0;
}
.key-name {
  font-size: 15px;
  padding: 0;
  margin: 0;
}
.user .expression-word {
  margin-top: 10px;
  font-size: 14px;
}
.user .fields:hover {
  color: #1492e6;
  background-color: #dcf6ff;
}

// 右键菜单
a {
  color: #333;
}
.right-menu {
  position: fixed;
  background: #fff;
  border: solid 1px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  z-index: 999;
  display: none;
}
.right-menu a {
  width: 75px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  display: block;
  color: #1a1a1a;
}
.right-menu a:hover {
  background: #eee;
  color: #fff;
}
.right-menu {
  border: 1px solid #eee;
  box-shadow: 0 0.5em 1em 0 rgba(0, 0, 0, 0.1);
  border-radius: 1px;
}
a {
  text-decoration: none;
}
.right-menu a {
  padding: 2px;
}
.right-menu a:hover {
  background: #be5858;
}
path {
  fill: black;
}
</style>

<template>
  <div class="user" @click="close">
    <div class="left-div">
      <div class="table-container">
        <div class="table-display" @click="editTable" @contextmenu.prevent="deleteTd"></div>
        <el-button type="primary" @click="sendTable" style="float:right;">提交表格</el-button>
      </div>
    </div>
    <context-menu
      class="right-menu"
      :target="contextMenuTarget"
      :show="contextMenuVisible"
      @update:show="(show) => contextMenuVisible = show"
    >
      <a href="javascript:;" @click="delformconstraint">删除</a>
    </context-menu>
    <div class="right-div">
      <div class="field-list">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick" :stretch="true">
          <el-tab-pane label="未标注" name="first">
            <div
              class="fields"
              v-for="(data, index) in unlabeledList"
              :key="index"
              @click="currentIndex = index;addKey()"
            >
              <div class="name-word">
                <p class="key-word">{{data.nameCh}}</p>
                <p class="key-name">{{data.nameEn}}</p>
              </div>
              <div class="expression-word">{{data.des}}</div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="已标注" name="second">
            <div
              class="fields"
              v-for="(data, index) in labeledList"
              :key="index"
              @mouseover="keyIndex = index;keyLocation()"
              @mouseleave="keyIndex = index;cancelSelect()"
            >
              <div class="name-word">
                <p class="key-word">{{data.nameCh}}</p>
                <p class="key-name">{{data.nameEn}}</p>
              </div>
              <div class="expression-word">{{data.des}}</div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import $ from "jquery";
export default {
  data() {
    return {
      List: [{}, {}, {}, {}],
      labeledList: [],
      unlabeledList: [],
      requestUrl: "https://qgailab.com:12410/intelligent-form",
      activeName: "first",
      contextMenuVisible: false,
      contextMenuTarget: document.body,
      currentIndex: 0,
      keyIndex: -1,
      editable: false,
      dom: null,
      domLast: null,
      deletingTd: null,
      mode: "view",
      correspondList: [],
      tdAll: [],
      spanAll: []
    };
  },
  methods: {
    close() {
      this.contextMenuVisible = false;
    },
    deleteTd(e) {
      this.deletingTd = e.target;
    },
    getTable() {
      let data = {
        form: {
          id: "ae8a7da6-d7ed-4aac-bc45-1e6dd528fa95" // 参看表单中获取
        }
      };
      let that = this;

      $.ajax({
        url: that.requestUrl + "/form/gethtml2",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify(data),
        dataType: "json",
        success: function(data) {
          console.log(data);
        },
        complete: function(res) {
          console.log(res);
          setTimeout(() => {
            let tdAll = document.getElementsByTagName("td");
            let spanAll = document.getElementsByTagName("span");
            that.tdAll = tdAll;
            that.spanAll = spanAll;
            // 复原
            let hasKey = document.getElementsByClassName("editable");
            for (let i = 0; i < hasKey.length; i++) {
              
              for (let j = 0; j < that.List.length; j++) {
                
                if (hasKey[i].getAttribute("key") == that.List[j].nameEn) {
                                    if (hasKey[i].nodeName == "TD") {
                    hasKey[i].innerHTML = that.List[j].nameCh;
                  }
                  if (hasKey[i].nodeName == "SPAN") {
                    hasKey[i].innerHTML += "  [" + that.List[j].nameCh + "]";
                  }
                  that.labeledList.push(that.List[j]);
                  that.correspondList.push(hasKey[i]);
                }
              }
            }
            for(let i = 0; i < that.labeledList.length; i++){
              if(that.unlabeledList.indexOf(that.labeledList[i])!=-1){
                          let index = that.unlabeledList.length - 1;
          while (that.unlabeledList[index] != that.labeledList[i]) {
            index--;
          }
                that.unlabeledList.splice(index, 1);
              }
            }
            

            for (let i = 0; i < tdAll.length; i++) {
              if (tdAll[i].getAttribute("writable")) {
                tdAll[i].style.border = "1px solid #01A527";
                tdAll[i].style.color = "#01A527";
              }
              if (!tdAll[i].innerText || tdAll[i].innerText == "　") {
                tdAll[i].innerHTML = "";
                tdAll[i].classList.add("editable");
              }
            }
            for (let i = 0; i < spanAll.length; i++) {
              if (spanAll[i].getAttribute("writable")) {
                spanAll[i].style.color = "#01A527";
              }

              if (
                spanAll[i].innerText.indexOf("□") != -1 &&
                spanAll[i].innerText.indexOf("（ □ ）") == -1
              ) {
                spanAll[i].classList.add("editable");
              }
            }
          }, 100);
          document.getElementsByClassName("table-display")[0].innerHTML =
            res.responseText;
        }
      });
    },
    getKey() {
      let that = this;
      let data = {
        form: {
          id: "ae8a7da6-d7ed-4aac-bc45-1e6dd528fa95" // 参看表单中获取
        }
      };
      $.ajax({
        url: that.requestUrl + "/form/getconstraint",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify(data),
        dataType: "json",
        success: function(data) {
          console.log(data, "约束");
          that.List = data.data.constraintList;
          that.unlabeledList = data.data.constraintList;
        },
        complete: function(res) {
          console.log(res);
        }
      });
    },
    sendTable() {
      let edited = document.getElementsByClassName("editable");
      console.log(edited);
      for (let i = 0; i < edited.length; i++) {
        edited[i].removeAttribute("style");
        edited[i].removeAttribute("index");
        edited[i].classList.remove("Multinomial");
        if (edited[i].innerText.indexOf("□") == -1) {
          edited[i].innerHTML = "";
        }
      }
      let str = document.getElementsByClassName("table-display")[0].innerHTML;
      console.log(str);
      let formData = new FormData();
      formData.append("html", str);
      formData.append("id", "ae8a7da6-d7ed-4aac-bc45-1e6dd528fa95");
      let that = this;

      $.ajax({
        url: that.requestUrl + "/form/uploadhtml",
        method: "POST",
        data: formData,
        async: true,
        cache: false,
        contentType: false,
        processData: false,
        success: function(data) {
          console.log(data);
          alert("提交成功！");
          that.getTable();
        },
        complete: function(res) {
          console.log(res);
        }
      });
    },
    editTable(e) {
      // 填空
      let dom = e.target.nodeName == "TD" ? e.target : e.target.parentNode;
      if (this.dom) {
        if (!this.dom.innerText || this.dom.innerText == "　") {
          this.dom.style.border = "1px solid black";
        }
      }
      // for(let i = 0; i < this.correspondList.length; i++) {
      //   if(this.correspondList[i] == dom) {
      //     alert("该选项已添加约束！");
      //     return false;
      //   }
      // }
      this.dom = dom;
      if (
        !dom.innerText ||
        dom.innerText == "　" ||
        this.correspondList.indexOf(dom) != -1
      ) {
        dom.style.border = "1px solid #1492E6";
      }
      // 单选
      if (
        e.target.nodeName == "SPAN" &&
        e.target.innerText.indexOf("□") != -1 &&
        e.target.innerText.indexOf("（ □ ）") == -1
      ) {
        dom = e.target;
        this.dom = dom;
        dom.style.color = "#1492E6";
      }

      this.editable = true;
    },
    addKey() {
      let that = this;
      if (!this.dom) {
        this.unlabeledList.push(this.labeledList[this.labeledList.length - 1]);
        this.labeledList.splice(this.labeledList.length - 1, 1);
        this.correspondList.splice(this.correspondList.length - 1, 1);
        if (this.domLast.nodeName == "TD") {
          this.domLast.innerHTML = "";
        }
        if (this.domLast.nodeName == "SPAN") {
          let str = this.domLast.innerHTML.split("  [")[0];
          this.domLast.innerHTML = str;
        }
        this.domLast.removeAttribute("key");
        this.domLast.removeAttribute("index");
      }
      if (this.correspondList.indexOf(this.dom) != -1) {
        this.unlabeledList.push(
          this.labeledList[
            this.correspondList.findIndex(item => item === this.dom)
          ]
        );
        this.labeledList.splice(
          this.unlabeledList.findIndex(item => item === this.dom),
          1
        );
        this.correspondList.splice(
          this.correspondList.findIndex(item => item === this.dom),
          1
        );
        if (this.dom.nodeName == "TD") {
          this.dom.innerHTML = "";
        }
        if (this.dom.nodeName == "SPAN") {
          let str = this.dom.innerHTML.split("  [")[0];
          this.dom.innerHTML = str;
        }
        this.dom.removeAttribute("key");
        this.dom.removeAttribute("index");
      }
      if (this.editable) {
        this.labeledList.push(this.unlabeledList[this.currentIndex]);
        if (this.dom) {
          this.correspondList.push(this.dom);
          if (this.dom.nodeName == "TD") {
            this.dom.style.border = "1px solid #01A527";
            this.dom.innerHTML += this.unlabeledList[this.currentIndex].nameCh;
          } else {
            this.dom.style.color = "#01A527";
            this.dom.innerHTML +=
              "  [" + this.unlabeledList[this.currentIndex].nameCh + "]";
          }
          // 多项
          let Multinomial = document.getElementsByClassName(
            this.dom.parentNode.classList[0].toString()
          );
          let MultinomialList = this.dom.parentNode.getElementsByClassName(
            this.dom.classList[0].toString()
          );
          let index = MultinomialList.length - 1;
          while (MultinomialList[index] != this.dom) {
            index--;
          }
          console.log(index);
          console.log(this.dom.nodeName);
          if (Multinomial.length > 1 && this.dom.nodeName == "TD") {
            if (
              this.dom.parentNode.getElementsByClassName(this.dom.classList[0])
                .length > 0
            ) {
              for (let i = 0; i < Multinomial.length; i++) {
                if (
                  Multinomial[i].getElementsByClassName(this.dom.classList[0])
                    .length > 0
                ) {
                  Multinomial[i].getElementsByClassName(this.dom.classList[0])[
                    index
                  ].style.border = "1px solid #01A527";
                  Multinomial[i].getElementsByClassName(this.dom.classList[0])[
                    index
                  ].innerHTML = this.unlabeledList[this.currentIndex].nameCh;
                  Multinomial[i]
                    .getElementsByClassName(this.dom.classList[0])
                    [index].setAttribute("writable", "true");
                  Multinomial[i]
                    .getElementsByClassName(this.dom.classList[0])
                    [index].setAttribute(
                      "key",
                      this.unlabeledList[this.currentIndex].nameEn
                    );
                  Multinomial[i]
                    .getElementsByClassName(this.dom.classList[0])
                    [index].setAttribute("index", this.currentIndex);
                  Multinomial[i]
                    .getElementsByClassName(this.dom.classList[0])
                    [index].classList.add("Multinomial");
                }
              }
            }
          } else {
            this.dom.setAttribute("writable", "true");
            this.dom.setAttribute(
              "key",
              this.unlabeledList[this.currentIndex].nameEn
            );
            this.dom.setAttribute("index", this.currentIndex);
          }
        } else {
          this.correspondList.push(this.domLast);
          if (this.domLast.nodeName == "TD") {
            this.domLast.style.border = "1px solid #01A527";
            this.domLast.innerHTML += this.unlabeledList[
              this.currentIndex
            ].nameCh;
          } else {
            this.domLast.style.color = "#01A527";
            this.domLast.innerHTML += this.unlabeledList[
              this.currentIndex
            ].nameCh;
          }
          this.dom.setAttribute("writable", "true");
          this.domLast.setAttribute(
            "key",
            this.unlabeledList[this.currentIndex].nameEn
          );
          this.domLast.setAttribute("index", this.currentIndex);
        }

        this.unlabeledList.splice(this.currentIndex, 1);
        if (this.dom) {
          this.domLast = this.dom;
        }
        this.dom = null;
      }
      // this.editable = false;
    },
    handleClick() {},
    delformconstraint() {
      console.log(this.deletingTd.getAttribute("index"));
      this.unlabeledList.push(
        this.labeledList[
          this.correspondList.findIndex(item => item === this.deletingTd)
        ]
      );
      this.labeledList.splice(this.correspondList.indexOf(this.deletingTd), 1);

      // 多项
      let Multinomial = document.getElementsByClassName("Multinomial");
      let that = this;
      let flag = false;
      console.log(Multinomial);
      for (let i = 0; i < Multinomial.length; i++) {
        console.log(that.deletingTd);
        console.log(Multinomial[i].getAttribute("key"));
        if (
          that.deletingTd.getAttribute("key") ==
          Multinomial[i].getAttribute("key")
        ) {
          flag = true;
          Multinomial[i].style.border = "1px solid black";

          Multinomial[i].removeAttribute("key");
          Multinomial[i].removeAttribute("index");
          Multinomial[i].removeAttribute("writable");
        }
        if (flag) {
          Multinomial[i].innerHTML = "";
        }
      }

      if (this.deletingTd.nodeName == "TD") {
        this.deletingTd.style.border = "1px solid black";
        this.deletingTd.innerHTML = "";
      }
      if (this.deletingTd.nodeName == "SPAN") {
        this.deletingTd.style.color = "#2c3e50";
        this.deletingTd.innerHTML = this.deletingTd.innerHTML.split("  [")[0];
      }
      this.deletingTd.removeAttribute("key");
      this.deletingTd.removeAttribute("index");
      this.deletingTd.removeAttribute("writable");
      this.contextMenuVisible = false;

      //       let data = {
      //   form: {
      //     file: "file", // 上传的word文件
      //     id: "ae8a7da6-d7ed-4aac-bc45-1e6dd528fa95" // 参看表单中获取
      //   }
      // };
      // let that = this;
      // $.ajax({
      //   url: that.requestUrl + "/form/gethtml2",
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   data: JSON.stringify(data),
      //   dataType: "json",
      //   success: function(data) {
      //     console.log(data);
      //   },
      //   complete: function(res) {
      //     console.log(res);
      //   }
      // });
    },
    keyLocation() {
      if (this.correspondList[this.keyIndex]) {
        this.correspondList[this.keyIndex].style.backgroundColor = "#dcf6ff";
      }
    },
    cancelSelect() {
      if (this.correspondList[this.keyIndex]) {
        this.correspondList[this.keyIndex].style.backgroundColor = "";
      }
    }
  },
  mounted() {
    this.getKey();
    this.getTable();
  }
};
</script>
