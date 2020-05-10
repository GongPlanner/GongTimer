import Vue from "vue";
import Vuex from "vuex";
import { vuexfireMutations, firestoreAction, firestoreOptions } from "vuexfire";
import firebase from "./firebase";
import dayjs from "dayjs";

Vue.use(Vuex);

firestoreOptions.wait = true;
const db = firebase.firestore();

export default new Vuex.Store({
  state: {
    data: {},
    time: 0
  },
  mutations: {
    setTime(state, time) {
      if (time <= 3600 && time >= 0) state.time = time;
    },
    decreaseTime(state) {
      if (state.time > 0) --state.time;
    },
    ...vuexfireMutations
  },
  actions: {
    setTime: context => context.commit("setTime"),
    decreaseTime: context => context.commit("decreaseTime"),
    bindRef: firestoreAction((context, payload) => {
      context.bindFirestoreRef(payload.name, payload.ref, payload.options);
    }),
    init: firestoreAction(context => {
      context.bindFirestoreRef(
        "data",
        db.collection("testSubject").doc(dayjs().format("YY.MM.DD"))
      );
    })
  },
  modules: {}
});
