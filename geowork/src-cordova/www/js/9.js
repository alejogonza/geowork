(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[9],{de12:function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:" flex-center"},[s("h5",{staticStyle:{"text-align":"center"},attrs:{color:"red"}},[e._v("🔥 Hello "+e._s(e.admin)+" 👑")]),s("div",{staticClass:"items-start q-gutter-md flex flex-center"},[s("q-card",{staticClass:"my-card"},[s("q-card-section",{staticClass:"q-pa-xs-md"},[s("div",{staticStyle:{"text-align":"center"}},[s("h3",[e._v("Actives jobs: "),s("br"),e._v(" "+e._s(e.jobs))]),s("h3",[e._v("Register users: "),s("br"),e._v(e._s(e.users))])])])],1),s("q-card",{staticClass:"my-card",staticStyle:{"min-height":"376px","max-width":"348.81px"}},[s("q-card-section",{staticClass:"q-pa-xs-md"},[s("div",{staticStyle:{"text-align":"center"}},[s("h4",[e._v("Create new jobs")]),s("p",[e._v("enter the number of jobs you want to create, these will be created randomly")]),s("q-input",{attrs:{label:"New jobs","reactive-rules":"",type:"number","stack-label":""},model:{value:e.createJobs,callback:function(t){e.createJobs=e._n(t)},expression:"createJobs"}}),s("br"),s("div",{staticClass:"flex flex-center"},[s("q-btn",{directives:[{name:"show",rawName:"v-show",value:null!=e.createJobs&&0!=e.createJobs.length,expression:"createJobs != null && createJobs.length != 0"}],staticClass:"flex flex-center",attrs:{color:"primary",label:"create jobs"},on:{click:e.onSubmit}})],1),s("div",{staticClass:"flex flex-center"},[s("q-btn",{directives:[{name:"show",rawName:"v-show",value:null==e.createJobs||0==e.createJobs.length,expression:"createJobs == null || createJobs.length == 0"}],staticClass:"flex flex-center",attrs:{color:"primary",label:"create jobs",disabled:""}})],1)],1)])],1)],1)])},o=[],i=(s("e6cf"),s("bc3a"),{data(){return{admin:null,jobs:null,users:null,createJobs:null}},async mounted(){try{this.$q.loading.show();const e=await this.$axios.get("info",{headers:{token:window.localStorage.getItem("token")}});this.admin=e.data.admin,this.jobs=e.data.jobs,this.users=e.data.users,this.$q.loading.hide()}catch(e){this.$q.loading.hide(),0==e.response.data.auth&&this.$router.push("/jobs")}},methods:{async pushNotification(){try{const e=await this.$axios.get("send-notifications",{headers:{token:window.localStorage.getItem("token")}});"No users with notifications available"==e.data.message?this.$q.notify({message:e.data.message,color:"yellow-9",position:"top"}):this.$q.notify({message:e.data.message,color:"green",position:"top"})}catch(e){0==e.response.data.auth&&this.$router.push("/jobs")}},async onSubmit(){try{await this.$axios.post("create-job",{jobs:this.createJobs},{headers:{token:window.localStorage.getItem("token")}});this.$q.notify({message:`${this.createJobs} jobs have been created successfully`,color:"green",position:"top"}),await this.pushNotification()}catch(e){0==e.response.data.auth&&this.$router.push("/jobs")}}}}),n=i,r=s("2877"),c=s("f09f"),l=s("a370"),d=s("27f9"),h=s("9c40"),b=s("eebe"),u=s.n(b),m=Object(r["a"])(n,a,o,!1,null,null,null);t["default"]=m.exports;u()(m,"components",{QCard:c["a"],QCardSection:l["a"],QInput:d["a"],QBtn:h["a"]})}}]);